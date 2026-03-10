import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

const FROM_EMAIL = "The Pepper Sauce Principle <hello@peppersauceprinciple.com>";
const REPLY_TO = "michael@ifwall.com";
const MAILING_ADDRESS = "Imaginative Feedback Coaching & Consulting, LLC · 246 Robert C Daniel Jr Pkwy #1383, Augusta, GA 30909";

const CONDITION_NAMES: Record<string, { name: string; pspName: string }> = {
  validation: { name: "Validation", pspName: "The Pepper Is Real" },
  agency: { name: "Agency", pspName: "Choose Your Recipe" },
  community: { name: "Community", pspName: "Come to the Table" },
  capacity: { name: "Capacity", pspName: "Build Your Heat Tolerance" },
  generativity: { name: "Generativity", pspName: "Pass the Sauce" },
};

const CONDITION_INSIGHTS: Record<string, string> = {
  validation: "You already know how to name what hurts. That might sound simple, but most people carrying chronic pain have spent years being told their pepper isn't real, isn't that bad, or is all in their head. The fact that you can look at your pain clearly, without minimizing it and without being consumed by it, is the foundation everything else builds on. Validation isn't just the first condition. It's the one that makes every other condition possible.",
  agency: "You've built your own way of holding what hurts. Not someone else's prescription, not the way you were taught, but a recipe that fits your actual life. Agency doesn't mean you chose the pepper. Nobody chooses the pepper. It means you chose what to do with it. That distinction is everything, and you've already made it.",
  community: "You have people. Not just people around you, but people who actually see you. People you don't have to perform for. That table you've built is doing more for your pain than most interventions could, because neuroscience shows that social connection activates the same opioid pathways as analgesic medication. Your people aren't just comfort. They're medicine.",
  capacity: "You've gotten better at this. Not tougher. Not more numb. Actually better at living alongside the heat without it running your life. That's what capacity is: not the absence of pain but the ability to hold more of life alongside it. Five years ago, you might not have been able to carry what you carry now. The fact that you can is earned.",
  generativity: "Something you've been through has become something you can offer. The recipe you built for your own pain has become a recipe someone else can use. That's the highest condition in the framework, not because the others are lesser, but because generativity is what turns private survival into communal wisdom. You're not just holding your pepper. You're making sauce for the table.",
};

function footer(profileId: string): string {
  return `
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid #ddd;">
      <p style="font-size:12px;color:#888;line-height:1.6;margin:0;">
        The Pepper Sauce Principle™ by Dr. Michael J.D. Rollock<br>
        ${MAILING_ADDRESS}<br>
        <a href="https://peppersauceprinciple.com/unsubscribe/${profileId}" style="color:#888;">Unsubscribe from these emails</a>
      </p>
    </div>
  `;
}

function wrapEmail(content: string, profileId: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
${content}
${footer(profileId)}
</body></html>`;
}

function buildEmail(emailNumber: number, profile: any): { subject: string; html: string } {
  const name = profile.name || "there";
  const profileId = profile.id;
  const resultsUrl = `https://peppersauceprinciple.com/results/${profileId}`;

  // Determine highest condition
  const scores: Record<string, number> = {
    validation: profile.score_validation ?? 0,
    agency: profile.score_agency ?? 0,
    community: profile.score_community ?? 0,
    capacity: profile.score_capacity ?? 0,
    generativity: profile.score_generativity ?? 0,
  };
  const highestCondition = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  switch (emailNumber) {
    case 1:
      return {
        subject: `${name}, your Pepper Sauce Profile is ready`,
        html: wrapEmail(`
          <p>${name},</p>
          <p>You just did something most people never do. You looked at your pain honestly, without flinching, and let it be mapped.</p>
          <p>Your Pepper Sauce Profile results are ready. They show your five conditions, your fire type, and where your recipe is strongest. They also show where the sauce is thinnest. Both matter.</p>
          <p style="margin:28px 0;"><a href="${resultsUrl}" style="display:inline-block;background:#C8962E;color:#0E0C07;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:bold;font-size:15px;">View Your Results</a></p>
          <p>Pain is real. Joy is possible. You just took the first step toward knowing which ingredients are already in your jar.</p>
          <p style="margin-top:32px;">Michael Rollock, PhD<br><em>The Pepper Sauce Principle</em></p>
        `, profileId),
      };

    case 2: {
      const insight = CONDITION_INSIGHTS[highestCondition] || CONDITION_INSIGHTS.validation;
      const condInfo = CONDITION_NAMES[highestCondition] || CONDITION_NAMES.validation;
      const extendedUrl = `${resultsUrl}#extended`;

      return {
        subject: `Your strongest ingredient: ${condInfo.pspName}`,
        html: wrapEmail(`
          <p>${name},</p>
          <p style="font-size:13px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Your Pepper Sauce Profile</p>
          <p><strong>Strongest condition: ${condInfo.pspName}</strong></p>
          <p>${insight}</p>
          <div style="margin:28px 0;padding:20px;border-left:3px solid #C8962E;background:#fdf6f0;">
            <p style="margin:0;font-size:15px;">Your Profile mapped your five conditions. But it can only show you where you are. It can't tell you what to do next. That's what the Extended Report does. A personalized conversation about your recipe, your fire, and the specific conditions that need attention — written for you and nobody else.</p>
          </div>
          <p style="margin:28px 0;"><a href="${extendedUrl}" style="display:inline-block;background:#C8962E;color:#0E0C07;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:bold;font-size:15px;">Go Deeper With Your Report</a></p>
          <p style="font-size:14px;color:#666;">$14.50 for the first 50 reports. A conversation built around your recipe, not someone else's.</p>
          <p style="margin-top:32px;">Michael Rollock, PhD<br><em>The Pepper Sauce Principle</em></p>
        `, profileId),
      };
    }

    case 3:
      return {
        subject: "This was never meant to be practiced alone",
        html: wrapEmail(`
          <p>${name},</p>
          <p>Five days ago, you took the Pepper Sauce Profile. You know your five conditions and your fire type. You know where your recipe is strongest and where it's thinnest. That matters. But knowing your recipe and actually cooking with it are two different things.</p>
          <p>So here's what I want to invite you to do.</p>
          <p style="font-size:20px;font-weight:bold;margin:24px 0 4px;">The Pepper Sauce Challenge</p>
          <p style="font-size:17px;font-style:italic;color:#C8962E;margin:0 0 20px;">7 Days of Joy While in Pain</p>
          <p><strong>The rules:</strong></p>
          <p style="margin:8px 0;"><strong>1.</strong> One act of genuine joy per day for seven days. Not joy instead of pain. Joy alongside it.</p>
          <p style="margin:8px 0;"><strong>2.</strong> It has to involve your body. Taste something. Move to something. Listen to something. Touch something. Your body has been the site of your pain long enough. Let it be the site of your pleasure too.</p>
          <p style="margin:8px 0;"><strong>3.</strong> It has to be true to who you are now. Not who you were before the pain. Not who you think you should be. Who you actually are today, with everything you're carrying.</p>
          <p style="margin:8px 0;"><strong>4.</strong> Share it if you can. Joy by yourself is real. Joy with someone else changes the recipe.</p>
          <p>That's it. No app. No tracker. No performance. Just seven days of refusing to let pain have the last word on what your body gets to feel.</p>
          <p>Here's the part nobody warns you about: the hardest thing won't be finding the joy. It will be believing you're allowed to have it. If you've been carrying pain for a long time, you've probably been trained, quietly and thoroughly, to believe that feeling good means your pain must not be that bad. That visible joy costs you credibility. So you learned to shrink. The Pepper Sauce Challenge is where you stop shrinking.</p>
          <p>When you've done it, tell us what happened. Not what the pain felt like. What the joy felt like while the pain was still there. Post it anywhere. Tag it <strong>#PepperSauceChallenge</strong> and <strong>#PassTheSauce</strong> so other people carrying the same kind of heat can find your recipe. Because what you made this week might be the exact ingredient someone else has been missing.</p>
          <p style="margin:28px 0;"><a href="https://peppersauceprinciple.com/#quiz" style="display:inline-block;background:#C8962E;color:#0E0C07;text-decoration:none;padding:14px 32px;border-radius:6px;font-weight:bold;font-size:15px;">Start the Challenge</a></p>
          <p style="font-style:italic;">Pain is real. Joy is possible. Make life delicious.</p>
          <p style="margin-top:32px;">Michael Rollock, PhD<br><em>The Pepper Sauce Principle</em></p>
        `, profileId),
      };

    default:
      return { subject: "", html: "" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { profile_id, email_number } = await req.json();

    // 1. Get the nurture email record
    const { data: emailRecord, error: emailError } = await supabase
      .from("nurture_emails")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("email_number", email_number)
      .single();

    if (emailError || !emailRecord) {
      console.error("Email record not found:", emailError);
      return new Response(JSON.stringify({ error: "Email record not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Already sent?
    if (emailRecord.sent_at) {
      return new Response(JSON.stringify({ status: "already_sent" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Already skipped?
    if (emailRecord.skipped_at) {
      return new Response(JSON.stringify({ status: "already_skipped" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 2. Get profile data
    const { data: profile, error: profileError } = await supabase
      .from("quiz_submissions")
      .select("*")
      .eq("id", profile_id)
      .single();

    if (profileError || !profile) {
      console.error("Profile not found:", profileError);
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // 3. Check skip conditions
    if (profile.nurture_unsubscribed) {
      await supabase.from("nurture_emails").update({
        skipped_at: new Date().toISOString(),
        skip_reason: "unsubscribed",
      }).eq("id", emailRecord.id);
      console.log("Skipped nurture email (unsubscribed):", emailRecord.recipient_email);
      return new Response(JSON.stringify({ status: "skipped_unsubscribed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Skip emails 2 and 3 if user already purchased Extended Report
    if (email_number >= 2 && profile.extended_report_paid) {
      await supabase.from("nurture_emails").update({
        skipped_at: new Date().toISOString(),
        skip_reason: "already_purchased",
      }).eq("id", emailRecord.id);
      console.log("Skipped nurture email (already purchased):", emailRecord.recipient_email);
      return new Response(JSON.stringify({ status: "skipped_purchased" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 4. Build email content
    const emailContent = buildEmail(email_number, profile);

    if (!emailContent.subject) {
      return new Response(JSON.stringify({ error: "Invalid email number" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // 5. Send via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        reply_to: REPLY_TO,
        to: [emailRecord.recipient_email],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      throw new Error(`Resend error: ${JSON.stringify(resendData)}`);
    }

    // 6. Mark as sent
    await supabase.from("nurture_emails").update({
      sent_at: new Date().toISOString(),
    }).eq("id", emailRecord.id);

    console.log(`Nurture email ${email_number} sent to:`, emailRecord.recipient_email, "resend_id:", resendData.id);

    return new Response(JSON.stringify({ status: "sent", id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-nurture-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
