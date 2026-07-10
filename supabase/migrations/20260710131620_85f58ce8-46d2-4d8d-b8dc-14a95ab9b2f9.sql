
DROP POLICY "Anyone can submit an enquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit a valid enquiry"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(name) BETWEEN 1 AND 200
    AND char_length(destination) BETWEEN 1 AND 200
    AND persons BETWEEN 1 AND 100
  );
