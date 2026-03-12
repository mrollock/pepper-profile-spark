import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const body = await req.json();
    const { name, email, what_you_did, what_joy_felt_like, day_number, permission_granted, age_confirmed } = body;

    // Validate required fields
    if (!what_you_did || !what_joy_felt_like) {
      return new Response(JSON.stringify({ error: "Required fields missing." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!permission_granted || !age_confirmed) {
      return new Response(JSON.stringify({ error: "Permission and age confirmation are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get IP address
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") ||
               "unknown";

    // Rate limiting: 3 submissions per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("challenge_submissions")
      .select("id", { count: "exact", head: true })
      .eq("ip_address", ip)
      .gte("created_at", oneHourAgo);

    if (count !== null && count >= 3) {
      return new Response(JSON.stringify({ error: "rate_limit", message: "You've submitted recently. Please wait a bit before submitting again." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Insert submission
    const { error: insertError } = await supabase
      .from("challenge_submissions")
      .insert({
        name: name || null,
        email: email || null,
        what_you_did,
        what_joy_felt_like,
        day_number: day_number || null,
        permission_granted,
        age_confirmed,
        ip_address: ip,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save submission." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send notification email to Michael
    if (RESEND_API_KEY) {
      const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "The Pepper Sauce Principle <hello@peppersauceprinciple.com>",
            to: ["michael@ifwall.com"],
            subject: "[PASS THE SAUCE] New Challenge submission",
            text: `=== NEW CHALLENGE SUBMISSION ===

Name: ${name || "Anonymous"}
Email: ${email || "Not provided"}
Day: ${day_number || "Not specified"}
Permission to share: ${permission_granted ? "Yes" : "No"}
Submitted: ${timestamp}

--- WHAT THEY DID ---
${what_you_did}

--- WHAT THE JOY FELT LIKE ---
${what_joy_felt_like}

=== END SUBMISSION ===`,
          }),
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
        // Don't fail the submission if email fails
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
