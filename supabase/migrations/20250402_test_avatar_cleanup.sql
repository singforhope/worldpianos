-- Test script for the avatar cleanup trigger
-- This can be run separately to verify the trigger works correctly

-- Enable query logging for debugging
SET client_min_messages TO NOTICE;

-- Create a test function to simulate an avatar update
CREATE OR REPLACE FUNCTION test_avatar_cleanup() 
RETURNS TEXT AS $$
DECLARE
  test_user_id UUID;
  old_avatar_url TEXT;
  new_avatar_url TEXT;
  result TEXT;
BEGIN
  -- Get an existing user or create a test user if needed
  SELECT id INTO test_user_id FROM auth.users LIMIT 1;
  
  IF test_user_id IS NULL THEN
    RAISE NOTICE 'No users found for testing';
    RETURN 'No users found for testing';
  END IF;
  
  -- Get the current avatar URL
  SELECT avatar_url INTO old_avatar_url 
  FROM user_profiles 
  WHERE id = test_user_id;
  
  -- Log the current state
  RAISE NOTICE 'Testing with user ID: %, Current avatar: %', 
              test_user_id, COALESCE(old_avatar_url, 'NULL');
  
  -- Create a new avatar URL for testing
  new_avatar_url := 'https://example.com/storage/v1/object/public/user-avatars/avatars/test_' || 
                     test_user_id || '_' || extract(epoch from now())::text || '.jpg';
  
  -- Update the user profile with the new avatar URL
  UPDATE user_profiles 
  SET avatar_url = new_avatar_url,
      updated_at = NOW()
  WHERE id = test_user_id;
  
  -- Check if the trigger fired correctly by looking at notices
  result := 'Test completed. Check logs for "Attempting to delete old avatar" message.';
  
  -- Cleanup - revert to the original avatar if it was changed
  IF old_avatar_url IS NOT NULL THEN
    UPDATE user_profiles 
    SET avatar_url = old_avatar_url,
        updated_at = NOW()
    WHERE id = test_user_id;
    
    RAISE NOTICE 'Reverted avatar URL back to: %', old_avatar_url;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Run the test function
-- Comment this out if you want to run the test manually
SELECT test_avatar_cleanup();

-- Drop the test function when done
-- Comment this out if you want to keep the test function
DROP FUNCTION IF EXISTS test_avatar_cleanup();

-- Example of how to manually test:
--
-- 1. For a manual test, you can run:
--    SELECT test_avatar_cleanup();
--
-- 2. Or update a specific user's avatar directly:
--    UPDATE user_profiles 
--    SET avatar_url = 'https://example.com/new-avatar-path.jpg' 
--    WHERE id = '00000000-0000-0000-0000-000000000000';
--
-- 3. Then check the logs for trigger activation messages 