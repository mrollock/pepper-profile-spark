CREATE TABLE public.pre_profile_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  quadrant_explored TEXT,
  converted_to_profile BOOLEAN DEFAULT FALSE,
  crisis_detected BOOLEAN DEFAULT FALSE,
  message_count INTEGER DEFAULT 0,
  ip_hash TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pre_profile_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on pre_profile_conversations"
  ON public.pre_profile_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous update on pre_profile_conversations"
  ON public.pre_profile_conversations FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Block anonymous select on pre_profile_conversations"
  ON public.pre_profile_conversations FOR SELECT
  USING (false);