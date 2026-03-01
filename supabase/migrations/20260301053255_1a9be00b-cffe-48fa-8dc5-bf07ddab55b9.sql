
-- Enable pg_net extension for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Function to call send-quiz-email edge function on quiz_submissions insert
CREATE OR REPLACE FUNCTION public.trigger_quiz_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  edge_url text;
  payload jsonb;
BEGIN
  edge_url := 'https://ovihfxegjbjnxqziazoe.supabase.co/functions/v1/send-quiz-email';
  
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'email', NEW.email,
      'name', NEW.name,
      'primary_fire_type', NEW.primary_fire_type,
      'score_validation', NEW.score_validation,
      'score_agency', NEW.score_agency,
      'score_community', NEW.score_community,
      'score_capacity', NEW.score_capacity,
      'score_generativity', NEW.score_generativity,
      'scoville_gate_triggered', NEW.scoville_gate_triggered
    )
  );

  PERFORM extensions.http_post(
    edge_url,
    payload::text,
    'application/json'
  );

  RETURN NEW;
END;
$$;

-- Function to call send-book-email edge function on book_signups insert
CREATE OR REPLACE FUNCTION public.trigger_book_email()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  edge_url text;
  payload jsonb;
BEGIN
  edge_url := 'https://ovihfxegjbjnxqziazoe.supabase.co/functions/v1/send-book-email';
  
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'email', NEW.email
    )
  );

  PERFORM extensions.http_post(
    edge_url,
    payload::text,
    'application/json'
  );

  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_quiz_submission_send_email
  AFTER INSERT ON public.quiz_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_quiz_email();

CREATE TRIGGER on_book_signup_send_email
  AFTER INSERT ON public.book_signups
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_book_email();
