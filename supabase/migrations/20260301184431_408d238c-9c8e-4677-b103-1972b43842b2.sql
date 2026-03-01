ALTER TABLE public.extended_profile_purchases DROP CONSTRAINT email_format;

ALTER TABLE public.extended_profile_purchases ADD CONSTRAINT email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');