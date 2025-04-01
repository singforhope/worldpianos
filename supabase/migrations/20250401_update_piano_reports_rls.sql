-- Migration to update the RLS policy for piano_reports table
-- This makes the policy more permissive for testing purposes

-- First, drop the existing policy if it exists
DROP POLICY IF EXISTS "Authenticated users can create piano reports" ON piano_reports;

-- Create a new, more permissive policy
CREATE POLICY "Anyone can create piano reports"
ON piano_reports 
FOR INSERT 
WITH CHECK (true);  -- Allow any insert

-- Create a policy to allow users to see their own reports
CREATE POLICY "Users can view their own reports"
ON piano_reports
FOR SELECT
USING (
    auth.uid() = user_id OR
    auth.uid() = reported_by OR
    EXISTS (
        SELECT 1 FROM user_profiles
        WHERE user_profiles.id = auth.uid()
        AND user_profiles.role = 'admin'
    )
);

-- Add a comment explaining this is a temporary policy for testing
COMMENT ON POLICY "Anyone can create piano reports" ON piano_reports
IS 'Temporary policy for testing - allows any insert without authentication check';