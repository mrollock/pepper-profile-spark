
-- Add Stripe columns to extended_profile_purchases
ALTER TABLE public.extended_profile_purchases
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS amount integer,
  ADD COLUMN IF NOT EXISTS price_type text DEFAULT 'introductory',
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent text;

-- Add SELECT policy so frontend can count total purchases for pricing logic
CREATE POLICY "Allow anonymous select count on extended_profile_purchases"
  ON public.extended_profile_purchases
  FOR SELECT
  USING (true);
