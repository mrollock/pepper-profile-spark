import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM_EMAIL = "Michael Rollock <michael@ifwall.com>";
const REPLY_TO = "michael@ifwall.com";

function getBand(score: number): string {
  if (score <= 12) return "Scarce";
  if (score <= 20) return "Inconsistent";
  if (score <= 26) return "Solid";
  return "Abundant";
}

function formatTranscript(messages: Array<{ role: string; content: string; timestamp?: string }>): string {
  return messages
    .map((m) => {
      const time = m.timestamp ? new Date(m.timestamp).toLocaleString("en-US", { timeZone: "America/New_York" }) : "";
      const label = m.role === "assistant" ? "FRAMEWORK" : "USER";
      return `[${label}${time ? " | " + time : ""}]\n${m.content}`;
    })
    .join("\n\n---\n\n");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const { profile, messages, conversationId } = await req.json();

    if (!profile || !messages) {
      throw new Error("profile and messages are required");
    }

    const firstName = (profile.name || "").split(" ")[0] || "there";
    const email = profile.email;

    if (!email) throw new Error("No email address");

    // ── 1. User confirmation email ──
    const userHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
<p>${firstName},</p>

<p>Thank you for sitting at the table. The conversation you just had with the framework is exactly the kind of material that makes an Extended Report worth reading.</p>

<p>Dr. Rollock is now reviewing your full Pepper Sauce Profile alongside everything you shared in the conversation. Your report will be written specifically for your recipe, your fire, and where you are right now.</p>

<p>You'll receive your Extended Report at this email address within 48 hours.</p>

<p>In the meantime, your original profile results are always available here:<br>
<a href="https://peppersauceprinciple.com/results/${profile.id}" style="color:#C8962E;font-weight:bold;">View your Pepper Sauce Profile</a></p>

<p>If you have questions about your purchase or your report, reply directly to this email.</p>

<p style="margin-top:32px;">
Michael Rollock, PhD<br>
<em>The Pepper Sauce Principle</em>
</p>

<hr style="margin-top:40px;border:none;border-top:1px solid #ddd;">
<p style="font-size:12px;color:#888;margin-top:16px;">
This is an educational tool, not a clinical assessment. Your Pepper Sauce Profile does not diagnose any condition and is not a substitute for professional medical or mental health care.
</p>
</body></html>`;

    const userEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        reply_to: REPLY_TO,
        subject: "Your Extended Report is being prepared",
        html: userHtml,
      }),
    });

    const userEmailData = await userEmailRes.json();
    if (!userEmailRes.ok) {
      console.error("User email error:", userEmailData);
    } else {
      console.log("User confirmation sent to:", email);
    }

    // ── 2. Admin notification with full transcript ──
    const scores = {
      Validation: profile.score_validation ?? 0,
      Agency: profile.score_agency ?? 0,
      Community: profile.score_community ?? 0,
      Capacity: profile.score_capacity ?? 0,
      Generativity: profile.score_generativity ?? 0,
    };

    const scovilleItems: string[] = [];
    if (profile.gate_overwhelm) scovilleItems.push("Item 6 (overwhelm)");
    if (profile.gate_safety) scovilleItems.push("Item 17 (safety)");
    if (profile.gate_burdensomeness) scovilleItems.push("Item 24 (burdensomeness)");
    if (profile.gate_numbing) scovilleItems.push("Item 29 (numbing)");

    const scovilleBlock = profile.scoville_gate_triggered
      ? `<div style="padding:16px;border:2px solid #cc0000;background:#fff0f0;margin:16px 0;">
<strong>⚠️ SCOVILLE GATE TRIGGERED</strong><br>
Items: ${scovilleItems.join(", ")}<br>
<em>Review transcript for clinical safety context. Consider priority handling.</em>
</div>`
      : `<p><strong>Scoville Gate:</strong> Not triggered</p>`;

    const transcript = formatTranscript(messages);
    const messageCount = messages.length;
    const userMsgCount = messages.filter((m: { role: string }) => m.role === "user").length;

    const adminHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#1a1a1a;max-width:800px;margin:0 auto;padding:24px;background:#ffffff;">
<h2 style="color:#B8451A;">🌶️ Extended Report Conversation Complete</h2>

<table style="width:100%;border-collapse:collapse;margin:16px 0;">
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Name</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${profile.name || "Not provided"}</td></tr>
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Email</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${email}</td></tr>
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Profile ID</td><td style="padding:6px 12px;border-bottom:1px solid #eee;"><a href="https://peppersauceprinciple.com/results/${profile.id}">${profile.id}</a></td></tr>
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Primary Fire</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${profile.primary_fire_type || "Unknown"}</td></tr>
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Chronic Fire</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${profile.chronic_fire_type || "Unknown"}</td></tr>
<tr><td style="padding:6px 12px;font-weight:bold;border-bottom:1px solid #eee;">Messages</td><td style="padding:6px 12px;border-bottom:1px solid #eee;">${messageCount} total (${userMsgCount} user)</td></tr>
</table>

<h3>Condition Scores</h3>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
${Object.entries(scores)
  .map(
    ([name, score]) =>
      `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;">${name}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-weight:bold;">${score} (${getBand(score as number)})</td></tr>`
  )
  .join("")}
</table>

${scovilleBlock}

<h3>Full Conversation Transcript</h3>
<div style="background:#f9f9f9;padding:20px;border-radius:8px;margin:16px 0;white-space:pre-wrap;font-family:Georgia,serif;font-size:14px;line-height:1.7;">
${transcript.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</div>

<p style="font-size:12px;color:#888;margin-top:24px;">Conversation ID: ${conversationId || "unknown"}</p>
</body></html>`;

    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [REPLY_TO],
        subject: `🌶️ Extended Report Ready: ${profile.name || email}${profile.scoville_gate_triggered ? " ⚠️ SCOVILLE" : ""}`,
        html: adminHtml,
      }),
    });

    const adminEmailData = await adminEmailRes.json();
    if (!adminEmailRes.ok) {
      console.error("Admin email error:", adminEmailData);
    } else {
      console.log("Admin notification sent for:", email);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-conversation-complete error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
