import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const FROM_EMAIL = "The Pepper Sauce Principle <hello@peppersauceprinciple.com>";
const ADMIN_EMAIL = "michael@ifwall.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const record = payload.record || payload;
    const { name, email, message } = record;

    if (!email) {
      return new Response(JSON.stringify({ error: "No email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Send admin notification
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [ADMIN_EMAIL],
        reply_to: email,
        subject: `🪑 New Contact: ${name || email}`,
        html: `<p><strong>New contact form submission</strong></p>
<p><strong>Name:</strong> ${name || "Not provided"}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong> ${message || "No message provided"}</p>
<p style="margin-top:20px;font-size:13px;color:#888;">Reply directly to this email to respond to ${name || "the visitor"}.</p>`,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      throw new Error(`Resend error: ${JSON.stringify(resendData)}`);
    }

    console.log("Contact admin notification sent for:", email, "id:", resendData.id);

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-contact-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
