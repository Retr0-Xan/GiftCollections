/*
  # Adwoa Wedding Gift Collections Schema

  ## Overview
  Creates a database table for Emmanuel and Adwoa's wedding gift collection.

  ## Tables Created
  
  ### `adwoa_wedding_gifts`
  - `id` (uuid, primary key) - Unique identifier for each gift entry
  - `first_name` (text, required) - First name of the person who brought the gift
  - `last_name` (text, required) - Last name of the person who brought the gift
  - `phone_number` (text, optional) - Contact number of the gift giver
  - `gift_description` (text, required) - Description of the gift brought
  - `created_at` (timestamptz) - Timestamp when the gift was recorded
  
  ## Security
  - Enables Row Level Security (RLS) on the `adwoa_wedding_gifts` table
  - Creates a public read policy allowing anyone to view all gifts
  - Creates a public insert policy allowing anyone to add new gifts
  
  ## Notes
  - This is a simple public app where anyone can view and add gifts
  - No authentication is required for this use case
*/

CREATE TABLE IF NOT EXISTS adwoa_wedding_gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text,
  gift_description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE adwoa_wedding_gifts ENABLE ROW LEVEL SECURITY;

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
