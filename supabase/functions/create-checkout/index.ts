import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INTRO_PRICE_ID = "price_1T612lITXsdAwaMVvOGXnP5j";
const REGULAR_PRICE_ID = "price_1T613LITXsdAwaMVDsacKyBf";
const EXTENDED_REPORT_PRICE_ID = "price_1T89zxIAXzQ93zV8QPX7VtCA";
const INTRO_LIMIT = 50;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Parse request body for email, name, and optional profileId
    const { email, name, profileId } = await req.json();
    if (!email) throw new Error("Email is required");

    // Determine if this is an extended report checkout or legacy flow
    const isExtendedReport = !!profileId;

    let priceId: string;
    let priceType: string;

    if (isExtendedReport) {
      priceId = EXTENDED_REPORT_PRICE_ID;
      priceType = "extended_report";
    } else {
      // Legacy tiered pricing for old flow
      const { count, error: countError } = await supabase
        .from("extended_profile_purchases")
        .select("*", { count: "exact", head: true });

      if (countError) throw new Error(`Count error: ${countError.message}`);

      const purchaseCount = count ?? 0;
      const isIntro = purchaseCount < INTRO_LIMIT;
      priceId = isIntro ? INTRO_PRICE_ID : REGULAR_PRICE_ID;
      priceType = isIntro ? "introductory" : "regular";
    }

    // Check for existing Stripe customer
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const origin = req.headers.get("origin") || "https://peppersauceprinciple.com";

    const successUrl = isExtendedReport
      ? `${origin}/conversation/${profileId}?session_id={CHECKOUT_SESSION_ID}`
      : `${origin}/results/${profileId || ""}?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = isExtendedReport
      ? `${origin}/results/${profileId}`
      : `${origin}/#quiz`;

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        buyer_name: name || "",
        buyer_email: email,
        price_type: priceType,
        ...(profileId ? { profile_id: profileId } : {}),
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("create-checkout error:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
