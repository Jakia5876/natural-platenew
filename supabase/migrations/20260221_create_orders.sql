-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- Using custom ID format NP-XXXX or UUID
  created_at TIMESTAMPTZ DEFAULT now(),
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  shipping_address TEXT,
  phone TEXT
);

-- Create the order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL
);

-- Set up RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can create orders (for checkout)
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create order items" ON order_items FOR INSERT WITH CHECK (true);

-- Policy: Admin can manage all
CREATE POLICY "Admins can manage orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admins can manage order items" ON order_items FOR ALL USING (true) WITH CHECK (true);
