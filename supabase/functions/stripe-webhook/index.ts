import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// TODO: Change to michael@peppersauceprinciple.com once domain is verified in Resend
const FROM_EMAIL = "Michael Rollock <onboarding@resend.dev>";
const REPLY_TO = "michael@peppersauceprinciple.com";

function buildPurchaseEmailHtml(data: {
  name: string;
  scovilleTriggered: boolean;
  profileUrl: string;
}): string {
  const greeting = data.name ? `${data.name},\n\n` : "";

  const scovilleBlock = data.scovilleTriggered
    ? `<p style="margin-top:28px;padding:20px;border-left:3px solid #B8451A;background:#fdf6f0;">
<strong>One more thing.</strong> Some of what you shared suggests the heat you're carrying right now is serious. That's not a judgment. It's a reason to make sure you're not facing it alone.<br><br>
A therapist, counselor, physician, or crisis specialist can help. Not instead of your people, your faith, or your own ways of coping. Alongside them.<br><br>
<strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text 988 (24/7)<br>
<strong>Crisis Text Line:</strong> Text HOME to 741741<br>
<strong>SAMHSA National Helpline:</strong> 1-800-662-4357 (free, confidential, 24/7)
</p>`
    : "";

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
<p>${greeting}Thank you. Your Extended Pepper Sauce Profile is ready.</p>

<p><a href="${data.profileUrl}" style="color:#C8962E;font-weight:bold;">View your Extended Pepper Sauce Profile →</a></p>

<p>Inside you'll find:</p>
<ul style="margin:16px 0;padding-left:20px;">
<li>Full interpretation of all five conditions in your sauce</li>
<li>How your conditions interact and what patterns they reveal</li>
<li>Personalized recommendations for what to tend to first</li>
<li>Your complete recipe — a narrative pulling all five scores together</li>
<li>How your profile compares to others who've taken the assessment</li>
<li>Guidance for tracking how your sauce changes over time</li>
</ul>

<p>This is your profile. Come back to it. The pepper doesn't disappear, but what surrounds it can change. That's the whole principle.</p>

<p>If you have questions about your profile, reply to this email.</p>

${scovilleBlock}

<p style="margin-top:32px;">
Michael Rollock, PhD<br>
<em>The Pepper Sauce Principle</em>
</p>

<hr style="margin-top:40px;border:none;border-top:1px solid #ddd;">
<p style="font-size:12px;color:#888;margin-top:16px;">
This is an educational tool, not a clinical assessment. Your Pepper Sauce Profile does not diagnose any condition and is not a substitute for professional medical or mental health care. If you are struggling or in crisis, please reach out to a licensed professional or call/text 988.
</p>
</body></html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;

    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      const buyerEmail = session.metadata?.buyer_email || session.customer_email || "";
      const buyerName = session.metadata?.buyer_name || "";

      // Insert purchase record
      const { error } = await supabase.from("extended_profile_purchases").insert({
        email: buyerEmail,
        name: buyerName,
        amount: session.amount_total,
        price_type: session.metadata?.price_type || "regular",
        stripe_session_id: session.id,
        stripe_payment_intent: typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id || null,
      });

      if (error) {
        console.error("Insert error:", error.message);
        throw new Error(`DB insert failed: ${error.message}`);
      }

      console.log("Purchase recorded for:", buyerEmail);

      // Look up quiz submission for Scoville Gate status
      let scovilleTriggered = false;
      if (buyerEmail) {
        const { data: quizData } = await supabase
          .from("quiz_submissions")
          .select("scoville_gate_triggered")
          .eq("email", buyerEmail)
          .order("created_at", { ascending: false })
          .limit(1);

        if (quizData && quizData.length > 0) {
          scovilleTriggered = !!quizData[0].scoville_gate_triggered;
        }
      }

      // Send purchase confirmation email
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      if (resendApiKey && buyerEmail) {
        const html = buildPurchaseEmailHtml({
          name: buyerName,
          scovilleTriggered,
          profileUrl: "https://pepper-profile-spark.lovable.app/#quiz",
        });

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [buyerEmail],
            reply_to: REPLY_TO,
            subject: "Your Extended Pepper Sauce Profile is ready",
            html,
          }),
        });

        const resendData = await resendRes.json();
        if (!resendRes.ok) {
          console.error("Resend error:", resendData);
          // Don't throw — purchase is already recorded, email failure is non-fatal
        } else {
          console.log("Purchase email sent to:", buyerEmail, "id:", resendData.id);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("stripe-webhook error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
