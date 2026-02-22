-- Create a new bucket for journal media if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('journal-media', 'journal-media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for the bucket
-- Allow public access to read files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'journal-media' );

-- Allow authenticated users to upload files
-- For simplicity in this demo, we'll allow anyone to upload, 
-- but in a real app, you'd restrict this to admin users.
CREATE POLICY "Allow Uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'journal-media' );

-- Allow users to delete their own files if needed
CREATE POLICY "Allow Deletion"
ON storage.objects FOR DELETE
USING ( bucket_id = 'journal-media' );
