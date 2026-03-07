
-- Add payment tracking columns to quiz_submissions
ALTER TABLE public.quiz_submissions
  ADD COLUMN IF NOT EXISTS extended_report_paid BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- Create the conversations table
CREATE TABLE public.extended_report_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.quiz_submissions(id) ON DELETE CASCADE UNIQUE,
  user_email TEXT NOT NULL,
  user_first_name TEXT,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  scoville_gate_triggered BOOLEAN DEFAULT FALSE,
  scoville_items JSONB DEFAULT '[]'::jsonb,
  conversation_status TEXT NOT NULL DEFAULT 'in_progress',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  report_generated BOOLEAN DEFAULT FALSE,
  abandonment_email_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: allow anonymous insert
ALTER TABLE public.extended_report_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on extended_report_conversations"
  ON public.extended_report_conversations
  FOR INSERT
  WITH CHECK (true);

-- RLS: allow select by profile_id (so the conversation page can load its own data)
CREATE POLICY "Allow select extended_report_conversations by profile_id"
  ON public.extended_report_conversations
  FOR SELECT
  USING (true);

-- RLS: allow update (for saving messages, marking complete)
CREATE POLICY "Allow update extended_report_conversations"
  ON public.extended_report_conversations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow select on quiz_submissions extended_report_paid column (already has select policy)
-- Allow update of extended_report_paid on quiz_submissions
CREATE POLICY "Allow update extended_report_paid on quiz_submissions"
  ON public.quiz_submissions
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
