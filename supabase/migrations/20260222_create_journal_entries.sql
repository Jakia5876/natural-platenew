-- Create the journal_entries table
CREATE TABLE IF NOT EXISTS journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT,
  content TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('image', 'video', 'none')) DEFAULT 'none',
  media_url TEXT,
  published BOOLEAN DEFAULT true
);

-- Set up RLS (Row Level Security)
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published entries
CREATE POLICY "Anyone can read published journal entries" 
ON journal_entries FOR SELECT 
USING (published = true);

-- Policy: Admins can manage entries
CREATE POLICY "Admins can manage journal entries" 
ON journal_entries FOR ALL 
USING (true)
WITH CHECK (true);
