/*
  # Wedding Gift Collections Schema

  ## Overview
  Creates a simple database table to store wedding gift information including the guest name and the gift they brought.

  ## Tables Created
  
  ### `wedding_gifts`
  - `id` (uuid, primary key) - Unique identifier for each gift entry
  - `guest_name` (text, required) - Name of the person who brought the gift
  - `gift_description` (text, required) - Description of the gift brought
  - `created_at` (timestamptz) - Timestamp when the gift was recorded
  
  ## Security
  - Enables Row Level Security (RLS) on the `wedding_gifts` table
  - Creates a public read policy allowing anyone to view all gifts
  - Creates a public insert policy allowing anyone to add new gifts
  
  ## Notes
  - This is a simple public app where anyone can view and add gifts
  - No authentication is required for this use case
*/

CREATE TABLE IF NOT EXISTS wedding_gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone_number text,
  gift_description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wedding_gifts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view wedding gifts"
  ON wedding_gifts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can add wedding gifts"
  ON wedding_gifts
  FOR INSERT
  TO anon
  WITH CHECK (true);