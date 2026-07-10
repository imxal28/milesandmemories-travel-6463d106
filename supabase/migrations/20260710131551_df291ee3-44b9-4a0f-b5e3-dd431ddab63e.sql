
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 200),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 320),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 3 AND 40),
  destination TEXT NOT NULL CHECK (char_length(destination) BETWEEN 1 AND 200),
  travel_dates TEXT NOT NULL CHECK (char_length(travel_dates) BETWEEN 1 AND 200),
  travel_type TEXT NOT NULL CHECK (char_length(travel_type) BETWEEN 1 AND 60),
  travel_type_other TEXT CHECK (travel_type_other IS NULL OR char_length(travel_type_other) <= 120),
  persons INT NOT NULL CHECK (persons BETWEEN 1 AND 100),
  children_ages TEXT CHECK (children_ages IS NULL OR char_length(children_ages) <= 200),
  budget TEXT NOT NULL CHECK (char_length(budget) BETWEEN 1 AND 200),
  notes TEXT CHECK (notes IS NULL OR char_length(notes) <= 2000)
);

GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
