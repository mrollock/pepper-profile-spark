import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory rate limiting (resets on cold start, but sufficient for brute-force protection)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (record && record.resetAt > now) {
    if (record.count >= MAX_ATTEMPTS) return true;
    record.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  }
  return false;
}

/** Constant-time string comparison to prevent timing attacks */
function timingSafeEqual(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);

  if (bufA.length !== bufB.length) {
    // Compare against self to keep constant time, then return false
    let result = 0;
    for (let i = 0; i < bufA.length; i++) {
      result |= bufA[i] ^ bufA[i];
    }
    return false;
  }

  let result = 0;
  for (let i = 0; i < bufA.length; i++) {
    result |= bufA[i] ^ bufB[i];
  }
  return result === 0;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many attempts. Try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { password } = await req.json();
    const adminPassword = Deno.env.get("ANALYTICS_ADMIN_PASSWORD");

    if (
      !password ||
      !adminPassword ||
      !timingSafeEqual(password, adminPassword)
    ) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Fetch all analytics events
    const { data: events, error: eventsError } = await supabase
      .from("quiz_analytics")
      .select("session_id, event_type, event_data, created_at")
      .order("created_at", { ascending: true })
      .limit(10000);

    if (eventsError) {
      console.error("Error fetching quiz analytics:", eventsError);
      throw eventsError;
    }

    // Fetch pre-profile chat conversations
    const { data: chatConversations, error: chatError } = await supabase
      .from("pre_profile_conversations")
      .select("started_at, completed_at, converted_to_profile, message_count")
      .order("started_at", { ascending: true })
      .limit(10000);

    if (chatError) {
      console.error("Error fetching chat conversations:", chatError);
      throw chatError;
    }

    return new Response(JSON.stringify({ events, chatConversations }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
