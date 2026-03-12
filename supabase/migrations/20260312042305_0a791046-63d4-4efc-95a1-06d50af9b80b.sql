CREATE TABLE public.challenge_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT,
  what_you_did TEXT NOT NULL,
  what_joy_felt_like TEXT NOT NULL,
  day_number TEXT,
  permission_granted BOOLEAN DEFAULT TRUE,
  age_confirmed BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.challenge_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON public.challenge_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admin read only" ON public.challenge_submissions
  FOR SELECT TO authenticated USING (true);