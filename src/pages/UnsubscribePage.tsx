import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function UnsubscribePage() {
  const { profileId } = useParams<{ profileId: string }>();
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    if (!profileId) {
      setStatus("error");
      return;
    }

    supabase
      .from("quiz_submissions")
      .update({
        nurture_unsubscribed: true,
        nurture_unsubscribed_at: new Date().toISOString(),
      } as any)
      .eq("id", profileId)
      .then(({ error }) => {
        setStatus(error ? "error" : "done");
      });
  }, [profileId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark px-6">
      <div className="max-w-[480px] text-center">
        <div className="mx-auto mb-8 h-[2px] w-[60px] bg-gold" />

        {status === "loading" && (
          <p className="text-cream-soft">Unsubscribing…</p>
        )}

        {status === "done" && (
          <>
            <h1 className="mb-6 font-display text-[1.6rem] leading-tight text-cream-soft">
              You've been unsubscribed.
            </h1>
            <p className="mb-4 text-[0.95rem] leading-[1.7] text-cream-mid">
              You won't receive any more emails from the Pepper Sauce Profile
              sequence. If you change your mind, take the Profile again and
              we'll reconnect.
            </p>
            <p className="mb-8 text-[0.95rem] leading-[1.7] text-cream-mid">
              Your Profile results are still available anytime.
            </p>
            <Link
              to="/"
              className="inline-block rounded-md bg-gold px-8 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light"
            >
              Back to The Pepper Sauce Principle →
            </Link>
            <p className="mt-10 font-accent text-[0.95rem] italic text-cream-mid">
              Pain is real. Joy is possible.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="mb-6 font-display text-[1.6rem] leading-tight text-cream-soft">
              Something went wrong.
            </h1>
            <p className="mb-8 text-[0.95rem] leading-[1.7] text-cream-mid">
              We couldn't process your unsubscribe request. Please try again or
              contact us at michael@ifwall.com.
            </p>
            <Link
              to="/"
              className="inline-block rounded-md bg-gold px-8 py-3.5 font-body text-[0.95rem] font-semibold text-dark transition-all hover:bg-gold-light"
            >
              Back to The Pepper Sauce Principle →
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
