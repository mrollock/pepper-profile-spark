
-- Create extended_profile_purchases table (safer than updating quiz_submissions)
CREATE TABLE public.extended_profile_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.extended_profile_purchases ENABLE ROW LEVEL SECURITY;

-- Insert-only anonymous policy
CREATE POLICY "Allow anonymous insert on extended_profile_purchases"
  ON public.extended_profile_purchases
  FOR INSERT
  WITH CHECK (true);

-- Add email format + length constraints
ALTER TABLE public.extended_profile_purchases
  ADD CONSTRAINT email_format CHECK (email ~* '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'),
  ADD CONSTRAINT email_length CHECK (char_length(email) <= 255);

-- Rate limit: one purchase per email per day
CREATE UNIQUE INDEX extended_profile_purchases_email_date_idx
  ON public.extended_profile_purchases (email, public.extract_date(purchased_at));
