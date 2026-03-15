ALTER TABLE public.quiz_submissions
  ADD COLUMN health_data_consent boolean DEFAULT false,
  ADD COLUMN health_data_consent_at timestamptz,
  ADD COLUMN terms_accepted boolean DEFAULT false,
  ADD COLUMN terms_accepted_at timestamptz;