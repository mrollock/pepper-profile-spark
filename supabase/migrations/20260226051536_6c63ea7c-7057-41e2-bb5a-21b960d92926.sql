CREATE TABLE public.quiz_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on quiz_analytics"
  ON public.quiz_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Block anonymous select on quiz_analytics"
  ON public.quiz_analytics FOR SELECT
  USING (false);