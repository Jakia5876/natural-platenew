-- Create the products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 5,
  reviews_count INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  weight TEXT,
  description TEXT,
  is_new BOOLEAN DEFAULT false
);

-- Set up RLS (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read products
CREATE POLICY "Anyone can read products" 
ON products FOR SELECT 
USING (true);

-- Policy: Admin can manage products
CREATE POLICY "Admins can manage products" 
ON products FOR ALL 
USING (true)
WITH CHECK (true);
