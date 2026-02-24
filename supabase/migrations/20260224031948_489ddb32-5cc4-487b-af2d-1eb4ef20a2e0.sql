-- Add email format validation constraints at database level
ALTER TABLE contact_submissions
  ADD CONSTRAINT valid_email CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

ALTER TABLE quiz_submissions
  ADD CONSTRAINT valid_email CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');

ALTER TABLE book_signups
  ADD CONSTRAINT valid_email CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$');