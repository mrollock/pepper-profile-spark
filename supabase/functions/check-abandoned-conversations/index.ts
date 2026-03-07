import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const FROM_EMAIL = "Michael Rollock <michael@ifwall.com>";
const REPLY_TO = "michael@ifwall.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!RESEND_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required secrets");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const now = new Date();

    // ── 1. Find conversations needing 24h abandonment email ──
    // In-progress, updated > 24h ago, no abandonment email sent yet
    const cutoff24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    const { data: needsEmail, error: emailQueryErr } = await supabase
      .from("extended_report_conversations")
      .select("id, profile_id, user_email, user_first_name, messages, updated_at")
      .eq("conversation_status", "in_progress")
      .eq("abandonment_email_sent", false)
      .lt("updated_at", cutoff24h);

    if (emailQueryErr) {
      console.error("Query error (24h):", emailQueryErr);
    }

    let emailsSent = 0;
    if (needsEmail && needsEmail.length > 0) {
      for (const conv of needsEmail) {
        const firstName = conv.user_first_name || "there";
        const email = conv.user_email;
        const profileId = conv.profile_id;

        const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Georgia,serif;font-size:16px;line-height:1.7;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;background:#ffffff;">
<p>${firstName},</p>

<p>You started a conversation with the Pepper Sauce Principle yesterday, and your chair is still at the table. No rush and no pressure. Just letting you know it's there when you're ready.</p>

<p>The conversation picks up right where you left off. Nothing you shared has been lost.</p>

<p><a href="https://peppersauceprinciple.com/conversation/${profileId}" style="color:#C8962E;font-weight:bold;">Return to your conversation</a></p>

<p>If you'd rather skip the conversation and just receive a standard Extended Report based on your Profile scores alone, reply to this email and let me know. Either way, what you paid for is yours.</p>

<p style="margin-top:32px;">
Michael Rollock, PhD<br>
<em>The Pepper Sauce Principle</em>
</p>

<hr style="margin-top:40px;border:none;border-top:1px solid #ddd;">
<p style="font-size:12px;color:#888;margin-top:16px;">
This is an educational tool, not a clinical assessment.
</p>
</body></html>`;

        try {
          const emailRes = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: FROM_EMAIL,
              to: [email],
              reply_to: REPLY_TO,
              subject: "Your chair is still at the table",
              html,
            }),
          });

          if (emailRes.ok) {
            await supabase
              .from("extended_report_conversations")
              .update({ abandonment_email_sent: true, updated_at: now.toISOString() })
              .eq("id", conv.id);
            emailsSent++;
            console.log("Abandonment email sent to:", email);

            // Also notify admin
            const msgCount = Array.isArray(conv.messages) ? conv.messages.length : 0;
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: FROM_EMAIL,
                to: [REPLY_TO],
                subject: `⏳ Abandoned conversation: ${firstName} (${email})`,
                html: `<p><strong>${conv.user_first_name || "User"}</strong> (${email}) has not returned to their Extended Report conversation in 24+ hours.</p>
<p>Messages so far: ${msgCount}</p>
<p><a href="https://peppersauceprinciple.com/results/${profileId}">View profile</a></p>`,
              }),
            });
          } else {
            console.error("Failed to send abandonment email to:", email);
          }
        } catch (sendErr) {
          console.error("Abandonment email error for", email, sendErr);
        }
      }
    }

    // ── 2. Auto-abandon conversations older than 7 days ──
    const cutoff7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: stale, error: staleErr } = await supabase
      .from("extended_report_conversations")
      .select("id, profile_id, user_email, user_first_name, messages")
      .eq("conversation_status", "in_progress")
      .lt("updated_at", cutoff7d);

    if (staleErr) {
      console.error("Query error (7d):", staleErr);
    }

    let abandoned = 0;
    if (stale && stale.length > 0) {
      for (const conv of stale) {
        await supabase
          .from("extended_report_conversations")
          .update({
            conversation_status: "abandoned",
            completed_at: now.toISOString(),
            updated_at: now.toISOString(),
          })
          .eq("id", conv.id);

        // Notify admin with whatever transcript exists
        const msgCount = Array.isArray(conv.messages) ? conv.messages.length : 0;
        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: FROM_EMAIL,
              to: [REPLY_TO],
              subject: `🛑 Auto-abandoned: ${conv.user_first_name || conv.user_email} (7 days)`,
              html: `<p><strong>${conv.user_first_name || "User"}</strong> (${conv.user_email}) conversation auto-abandoned after 7 days of inactivity.</p>
<p>Messages: ${msgCount}</p>
<p>Consider generating a standard report from Profile scores alone and sending it to the user.</p>
<p><a href="https://peppersauceprinciple.com/results/${conv.profile_id}">View profile</a></p>`,
            }),
          });
        } catch (notifErr) {
          console.error("Auto-abandon admin notification error:", notifErr);
        }

        abandoned++;
        console.log("Auto-abandoned conversation:", conv.id, conv.user_email);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        abandonment_emails_sent: emailsSent,
        conversations_auto_abandoned: abandoned,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("check-abandoned-conversations error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
