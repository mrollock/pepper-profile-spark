
-- 3A. Create anonymous_responses table
CREATE TABLE public.anonymous_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  completed_at timestamptz NOT NULL DEFAULT now(),
  item_1 smallint, item_2 smallint, item_3 smallint, item_4 smallint, item_5 smallint,
  item_6 smallint, item_7 smallint, item_8 smallint, item_9 smallint, item_10 smallint,
  item_11 smallint, item_12 smallint, item_13 smallint, item_14 smallint, item_15 smallint,
  item_16 smallint, item_17 smallint, item_18 smallint, item_19 smallint, item_20 smallint,
  item_21 smallint, item_22 smallint, item_23 smallint, item_24 smallint, item_25 smallint,
  item_26 smallint, item_27 smallint, item_28 smallint, item_29 smallint,
  item_30 text, item_31 text, item_32 text, item_33 text, item_34 text
);

ALTER TABLE public.anonymous_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert on anonymous_responses"
  ON public.anonymous_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Block anonymous select on anonymous_responses"
  ON public.anonymous_responses FOR SELECT
  USING (false);

-- 3B. Add gate boolean columns to quiz_submissions
ALTER TABLE public.quiz_submissions
  ADD COLUMN IF NOT EXISTS gate_overwhelm boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS gate_safety boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS gate_burdensomeness boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS gate_numbing boolean DEFAULT false;

-- 3C. Drop item-level columns from quiz_submissions
ALTER TABLE public.quiz_submissions
  DROP COLUMN IF EXISTS item_1, DROP COLUMN IF EXISTS item_2, DROP COLUMN IF EXISTS item_3,
  DROP COLUMN IF EXISTS item_4, DROP COLUMN IF EXISTS item_5, DROP COLUMN IF EXISTS item_6,
  DROP COLUMN IF EXISTS item_7, DROP COLUMN IF EXISTS item_8, DROP COLUMN IF EXISTS item_9,
  DROP COLUMN IF EXISTS item_10, DROP COLUMN IF EXISTS item_11, DROP COLUMN IF EXISTS item_12,
  DROP COLUMN IF EXISTS item_13, DROP COLUMN IF EXISTS item_14, DROP COLUMN IF EXISTS item_15,
  DROP COLUMN IF EXISTS item_16, DROP COLUMN IF EXISTS item_17, DROP COLUMN IF EXISTS item_18,
  DROP COLUMN IF EXISTS item_19, DROP COLUMN IF EXISTS item_20, DROP COLUMN IF EXISTS item_21,
  DROP COLUMN IF EXISTS item_22, DROP COLUMN IF EXISTS item_23, DROP COLUMN IF EXISTS item_24,
  DROP COLUMN IF EXISTS item_25, DROP COLUMN IF EXISTS item_26, DROP COLUMN IF EXISTS item_27,
  DROP COLUMN IF EXISTS item_28, DROP COLUMN IF EXISTS item_29, DROP COLUMN IF EXISTS item_30,
  DROP COLUMN IF EXISTS item_31, DROP COLUMN IF EXISTS item_32, DROP COLUMN IF EXISTS item_33;

ALTER TABLE public.quiz_submissions DROP CONSTRAINT IF EXISTS item_values;
ALTER TABLE public.quiz_submissions DROP CONSTRAINT IF EXISTS text_item_lengths;
