-- supabase/storage_policies.sql
-- Storage policies for Supabase buckets

-- Note: This script assumes that the 'owner' column in storage.objects is of type UUID.
-- We cast 'owner' to UUID when comparing with auth.uid() to ensure type compatibility.
-- The INSERT policies have been simplified to just check for authenticated role and bucket_id.

-- Piano Images Bucket Policies
-- Allow public read access
CREATE POLICY "Public can view piano images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'piano-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload piano images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'piano-images'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own piano images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'piano-images'
  AND auth.uid() = owner::uuid
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own piano images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'piano-images'
  AND auth.uid() = owner::uuid
);

-- Event Images Bucket Policies
-- Allow public read access
CREATE POLICY "Public can view event images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'event-images');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload event images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'event-images'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own event images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'event-images'
  AND auth.uid() = owner::uuid
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own event images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'event-images'
  AND auth.uid() = owner::uuid
);

-- User Avatars Bucket Policies
-- Allow public read access
CREATE POLICY "Public can view user avatars"
ON storage.objects
FOR SELECT
USING (bucket_id = 'user-avatars');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload user avatars"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'user-avatars'
  AND auth.role() = 'authenticated'
);

-- Allow users to update their own uploads
CREATE POLICY "Users can update their own avatars"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'user-avatars'
  AND auth.uid() = owner::uuid
);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete their own avatars"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'user-avatars'
  AND auth.uid() = owner::uuid
);

-- Note: These policies assume that:
-- 1. The storage.objects table has an "owner" column of type UUID that stores the user's ID
-- 2. You're using Supabase Auth for authentication

-- To apply these policies:
-- 1. Go to the SQL Editor in your Supabase dashboard
-- 2. Paste and run this SQL
-- 3. Verify the policies are created in Storage > Policies