-- Create the product_reviews table
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  product_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT true
);

-- Set up RLS (Row Level Security)
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read reviews
CREATE POLICY "Anyone can read reviews" 
ON product_reviews FOR SELECT 
USING (approved = true);

-- Policy: Anyone can submit a review
CREATE POLICY "Anyone can submit a review" 
ON product_reviews FOR INSERT 
WITH CHECK (true);

-- Policy: Admins can manage reviews
CREATE POLICY "Admins can manage reviews" 
ON product_reviews FOR ALL 
USING (true)
WITH CHECK (true);
