-- Fix trigger functions to use pg_net instead of http extension

CREATE OR REPLACE FUNCTION public.trigger_quiz_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

  PERFORM net.http_post(
    url := edge_url,
    body := payload,
    headers := jsonb_build_object('Content-Type', 'application/json')
  );

  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.trigger_book_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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

  PERFORM net.http_post(
    url := edge_url,
    body := payload,
    headers := jsonb_build_object('Content-Type', 'application/json')
  );

  RETURN NEW;
END;
$function$;