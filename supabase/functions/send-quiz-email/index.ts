import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// TODO: Change to michael@peppersauceprinciple.com once domain is verified in Resend
const FROM_EMAIL = "Michael Rollock <michael@peppersauceprinciple.com>";
const REPLY_TO = "michael@peppersauceprinciple.com";

const CONDITION_NAMES: Record<number, string> = {
  1: "The Pepper Is Real (Validation)",
  2: "Choose Your Recipe (Agency)",
  3: "Come to the Table (Community)",
  4: "Build Your Heat Tolerance (Capacity)",
  5: "Pass the Sauce (Generativity)",
};

const FIRE_NAMES: Record<string, string> = {
  A: "Personal Fire",
  B: "Relational Fire",
  C: "Communal Fire",
  D: "Ancestral Fire",
  E: "Growth Fire",
};

function buildQuizEmailHtml(data: {
  name: string;
  primaryFireType: string;
  topCondition: string;
  topScore: number;
  lowestCondition: string;
  lowestScore: number;
  scovilleTriggered: boolean;
  resultsUrl: string;
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
<p>${greeting}You just spent real time looking honestly at your pain, your people, and what you've been making with both. That takes something.</p>

<p>Here's what your Pepper Sauce Profile found:</p>

<p style="margin:20px 0;">
<strong>Your Fire Type:</strong> ${data.primaryFireType}<br>
<strong>Your strongest condition:</strong> ${data.topCondition} (${data.topScore})<br>
<strong>The condition to tend to:</strong> ${data.lowestCondition} (${data.lowestScore})
</p>

<p><a href="${data.resultsUrl}" style="color:#C8962E;font-weight:bold;">View your full Pepper Sauce Profile results →</a></p>

<p>Your profile is a snapshot of where you are right now. Not a grade, not a verdict. Sauces change. Peppers change. What you're working with today is not what you'll be working with a year from now.</p>

<p>Thank you for taking the time to look at what's in your bottle.</p>

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
    const payload = await req.json();

    // Support both direct call and database webhook trigger format
    const record = payload.record || payload;

    const {
      email,
      name,
      primary_fire_type,
      score_validation,
      score_agency,
      score_community,
      score_capacity,
      score_generativity,
      scoville_gate_triggered,
    } = record;

    if (!email) {
      return new Response(JSON.stringify({ error: "No email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Determine top and lowest conditions
    const scores: Record<number, number> = {
      1: score_validation ?? 0,
      2: score_agency ?? 0,
      3: score_community ?? 0,
      4: score_capacity ?? 0,
      5: score_generativity ?? 0,
    };

    let topCond = 1, lowestCond = 1;
    let topScore = scores[1], lowestScore = scores[1];
    for (const [k, v] of Object.entries(scores)) {
      const cond = Number(k);
      if (v > topScore) { topScore = v; topCond = cond; }
      if (v < lowestScore) { lowestScore = v; lowestCond = cond; }
    }

    // Parse fire type
    const fireTypes = primary_fire_type
      ? (primary_fire_type as string).split(",").map((f: string) => FIRE_NAMES[f.trim()] || f.trim())
      : ["Unknown"];

    const html = buildQuizEmailHtml({
      name: name || "",
      primaryFireType: fireTypes.join(" & "),
      topCondition: CONDITION_NAMES[topCond] || "",
      topScore,
      lowestCondition: CONDITION_NAMES[lowestCond] || "",
      lowestScore,
      scovilleTriggered: !!scoville_gate_triggered,
      resultsUrl: "https://pepper-profile-spark.lovable.app/#quiz",
    });

    // Send via Resend
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
        subject: "Your Pepper Sauce Profile",
        html,
      }),
    });

    const resendData = await resendRes.json();
    if (!resendRes.ok) {
      console.error("Resend error:", resendData);
      throw new Error(`Resend error: ${JSON.stringify(resendData)}`);
    }

    console.log("Quiz email sent to:", email, "id:", resendData.id);

    return new Response(JSON.stringify({ success: true, id: resendData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("send-quiz-email error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
