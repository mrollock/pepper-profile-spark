
-- Update to use anon key instead of service role key for the HTTP call
-- The edge function itself creates a service-role client internally
CREATE OR REPLACE FUNCTION public.process_nurture_queue()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  email_record RECORD;
  edge_url TEXT := 'https://ovihfxegjbjnxqziazoe.supabase.co/functions/v1/send-nurture-email';
  anon_key TEXT := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92aWhmeGVnamJqbnhxemlhem9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODcwNzQsImV4cCI6MjA4NzQ2MzA3NH0.5Kypz13e1s4z62jdNCXLKt5CuVNI6NgY3PdG0ylOx3g';
BEGIN
  FOR email_record IN
    SELECT ne.profile_id, ne.email_number
    FROM public.nurture_emails ne
    WHERE ne.scheduled_at <= NOW()
      AND ne.sent_at IS NULL
      AND ne.skipped_at IS NULL
    ORDER BY ne.scheduled_at ASC
    LIMIT 20
  LOOP
    PERFORM net.http_post(
      url := edge_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key
      ),
      body := jsonb_build_object(
        'profile_id', email_record.profile_id,
        'email_number', email_record.email_number
      )
    );
  END LOOP;
END;
$$;
