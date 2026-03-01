import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// TODO: Change to michael@peppersauceprinciple.com once domain is verified in Resend
const FROM_EMAIL = "Michael Rollock <michael@peppersauceprinciple.com>";
const REPLY_TO = "michael@peppersauceprinciple.com";

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
<p>Thank you for signing up. The book is being written.</p>

<p>The Pepper Sauce Principle started as a keynote and a framework. The book gives it a permanent home — the science behind the five conditions, the cultural wisdom that got there first, and a way to read your own recipe for living alongside pain.</p>

<p>You'll be among the first to know when it's ready.</p>

<p style="margin-top:32px;">
Michael Rollock, PhD<br>
<em>The Pepper Sauce Principle</em>
</p>
</body></html>`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record || payload;
    const email = record.email;

    if (!email) {
      return new Response(JSON.stringify({ error: "No email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        reply_to: REPLY_TO,
        subject: "You're at the table early",
        html,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      throw new Error(`Resend error: ${JSON.stringify(resendData)}`);
    }

    console.log("Book email sent to:", email, "id:", resendData.id);

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-book-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
