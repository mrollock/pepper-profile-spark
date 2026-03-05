
CREATE OR REPLACE FUNCTION public.trigger_contact_email()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  edge_url text;
  payload jsonb;
BEGIN
  edge_url := 'https://ovihfxegjbjnxqziazoe.supabase.co/functions/v1/send-contact-email';
  
  payload := jsonb_build_object(
    'record', jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'message', NEW.message
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

CREATE TRIGGER on_contact_submission_send_email
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_contact_email();
