
-- Table 1: quiz_submissions
CREATE TABLE public.quiz_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  item_1 smallint, item_2 smallint, item_3 smallint, item_4 smallint, item_5 smallint,
  item_6 smallint, item_7 smallint, item_8 smallint, item_9 smallint, item_10 smallint,
  item_11 smallint, item_12 smallint, item_13 smallint, item_14 smallint, item_15 smallint,
  item_16 smallint, item_17 smallint, item_18 smallint, item_19 smallint, item_20 smallint,
  item_21 smallint, item_22 smallint, item_23 smallint, item_24 smallint, item_25 smallint,
  item_26 smallint, item_27 smallint, item_28 smallint,
  item_29 text, item_30 text, item_31 text, item_32 text, item_33 text,
  score_validation smallint,
  score_agency smallint,
  score_community smallint,
  score_capacity smallint,
  score_generativity smallint,
  primary_fire_type text,
  chronic_fire_type text,
  scoville_gate_triggered boolean DEFAULT false,
  scoville_items_flagged text[] DEFAULT '{}'
);

ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on quiz_submissions"
  ON public.quiz_submissions FOR INSERT
  WITH CHECK (true);

-- Table 2: book_signups
CREATE TABLE public.book_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  email text NOT NULL,
  source text NOT NULL DEFAULT 'book_notification'
);

ALTER TABLE public.book_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on book_signups"
  ON public.book_signups FOR INSERT
  WITH CHECK (true);

-- Table 3: contact_submissions
CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  message text
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on contact_submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);
