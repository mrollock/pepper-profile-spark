
-- Create nurture_emails table
CREATE TABLE public.nurture_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.quiz_submissions(id) ON DELETE CASCADE NOT NULL,
  email_number INTEGER NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  skipped_at TIMESTAMPTZ,
  skip_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, email_number)
);

-- Index for the cron job query
CREATE INDEX idx_nurture_due ON public.nurture_emails (scheduled_at)
  WHERE sent_at IS NULL AND skipped_at IS NULL;

-- Add unsubscribe columns to quiz_submissions
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS nurture_unsubscribed BOOLEAN DEFAULT FALSE;
ALTER TABLE public.quiz_submissions ADD COLUMN IF NOT EXISTS nurture_unsubscribed_at TIMESTAMPTZ;

-- Enable RLS on nurture_emails (no public policies - only service role access)
ALTER TABLE public.nurture_emails ENABLE ROW LEVEL SECURITY;

-- Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;
