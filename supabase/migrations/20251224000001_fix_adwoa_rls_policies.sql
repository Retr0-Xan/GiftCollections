-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view adwoa wedding gifts" ON adwoa_wedding_gifts;
DROP POLICY IF EXISTS "Anyone can add adwoa wedding gifts" ON adwoa_wedding_gifts;

-- Recreate policies with support for both authenticated and anonymous users
CREATE POLICY "Anyone can view adwoa wedding gifts"
  ON adwoa_wedding_gifts
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Anyone can add adwoa wedding gifts"
  ON adwoa_wedding_gifts
  FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);
