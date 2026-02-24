
-- Create immutable date extraction function
CREATE OR REPLACE FUNCTION public.extract_date(ts timestamptz)
RETURNS date AS $$
  SELECT ts::date;
$$ LANGUAGE sql IMMUTABLE SET search_path = public;

-- Prevent duplicate book signups per email per day
CREATE UNIQUE INDEX book_signups_email_date_idx 
  ON book_signups (email, public.extract_date(created_at));

-- Prevent duplicate quiz submissions per email per day
CREATE UNIQUE INDEX quiz_submissions_email_date_idx
  ON quiz_submissions (email, public.extract_date(created_at));

-- Add length constraints on contact_submissions
ALTER TABLE contact_submissions
  ADD CONSTRAINT name_length CHECK (length(name) <= 100),
  ADD CONSTRAINT email_length CHECK (length(email) <= 255),
  ADD CONSTRAINT message_length CHECK (length(message) <= 2000);

-- Add length constraints on quiz_submissions
ALTER TABLE quiz_submissions
  ADD CONSTRAINT name_length CHECK (length(name) <= 100),
  ADD CONSTRAINT email_length CHECK (length(email) <= 255);

-- Add length constraint on book_signups
ALTER TABLE book_signups
  ADD CONSTRAINT email_length CHECK (length(email) <= 255);

-- Add value range checks for likert quiz items (1-6 scale)
ALTER TABLE quiz_submissions
  ADD CONSTRAINT item_values CHECK (
    (item_1 IS NULL OR item_1 BETWEEN 1 AND 6) AND
    (item_2 IS NULL OR item_2 BETWEEN 1 AND 6) AND
    (item_3 IS NULL OR item_3 BETWEEN 1 AND 6) AND
    (item_4 IS NULL OR item_4 BETWEEN 1 AND 6) AND
    (item_5 IS NULL OR item_5 BETWEEN 1 AND 6) AND
    (item_6 IS NULL OR item_6 BETWEEN 1 AND 6) AND
    (item_7 IS NULL OR item_7 BETWEEN 1 AND 6) AND
    (item_8 IS NULL OR item_8 BETWEEN 1 AND 6) AND
    (item_9 IS NULL OR item_9 BETWEEN 1 AND 6) AND
    (item_10 IS NULL OR item_10 BETWEEN 1 AND 6) AND
    (item_11 IS NULL OR item_11 BETWEEN 1 AND 6) AND
    (item_12 IS NULL OR item_12 BETWEEN 1 AND 6) AND
    (item_13 IS NULL OR item_13 BETWEEN 1 AND 6) AND
    (item_14 IS NULL OR item_14 BETWEEN 1 AND 6) AND
    (item_15 IS NULL OR item_15 BETWEEN 1 AND 6) AND
    (item_16 IS NULL OR item_16 BETWEEN 1 AND 6) AND
    (item_17 IS NULL OR item_17 BETWEEN 1 AND 6) AND
    (item_18 IS NULL OR item_18 BETWEEN 1 AND 6) AND
    (item_19 IS NULL OR item_19 BETWEEN 1 AND 6) AND
    (item_20 IS NULL OR item_20 BETWEEN 1 AND 6) AND
    (item_21 IS NULL OR item_21 BETWEEN 1 AND 6) AND
    (item_22 IS NULL OR item_22 BETWEEN 1 AND 6) AND
    (item_23 IS NULL OR item_23 BETWEEN 1 AND 6) AND
    (item_24 IS NULL OR item_24 BETWEEN 1 AND 6) AND
    (item_25 IS NULL OR item_25 BETWEEN 1 AND 6) AND
    (item_26 IS NULL OR item_26 BETWEEN 1 AND 6) AND
    (item_27 IS NULL OR item_27 BETWEEN 1 AND 6) AND
    (item_28 IS NULL OR item_28 BETWEEN 1 AND 6)
  );

-- Add length constraints for text-based fire items (29-33)
ALTER TABLE quiz_submissions
  ADD CONSTRAINT text_item_lengths CHECK (
    (item_29 IS NULL OR length(item_29) <= 200) AND
    (item_30 IS NULL OR length(item_30) <= 200) AND
    (item_31 IS NULL OR length(item_31) <= 200) AND
    (item_32 IS NULL OR length(item_32) <= 200) AND
    (item_33 IS NULL OR length(item_33) <= 200)
  );
