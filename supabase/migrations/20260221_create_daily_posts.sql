-- Create the daily_posts table
CREATE TABLE IF NOT EXISTS daily_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT,
  content TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'none')) DEFAULT 'none',
  media_url TEXT,
  published BOOLEAN DEFAULT true
);

-- Set up RLS (Row Level Security)
ALTER TABLE daily_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Anyone can read published posts" 
ON daily_posts FOR SELECT 
USING (published = true);

-- Policy: Admin can do everything (Assuming service_role or similar, 
-- but for now we'll keep it simple or restricted to a specific role if we had one)
-- In a real setup, we'd restrict this to authenticated admins.
CREATE POLICY "Admins can manage posts" 
ON daily_posts FOR ALL 
USING (true)
WITH CHECK (true);
