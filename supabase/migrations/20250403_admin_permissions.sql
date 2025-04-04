-- Migration: 20250403_admin_permissions.sql
-- Description: Enhance admin permissions to ensure admins can perform all operations on all tables
-- Date: 2025-04-03

-- Helper function to determine if a user is an admin
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_profiles
        WHERE user_profiles.id = auth.uid()
        AND user_profiles.role = 'admin'
    );
END;
$$ LANGUAGE plpgsql;

-- PIANO MEDIA table policies
DO $$
BEGIN
    -- Add admin update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'piano_media' AND policyname = 'Admins can update any piano media'
    ) THEN
        CREATE POLICY "Admins can update any piano media"
        ON piano_media FOR UPDATE USING (is_admin());
    END IF;
    
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'piano_media' AND policyname = 'Admins can delete any piano media'
    ) THEN
        CREATE POLICY "Admins can delete any piano media"
        ON piano_media FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- EVENT MEDIA table policies
DO $$
BEGIN
    -- Add admin update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_media' AND policyname = 'Admins can update any event media'
    ) THEN
        CREATE POLICY "Admins can update any event media"
        ON event_media FOR UPDATE USING (is_admin());
    END IF;
    
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_media' AND policyname = 'Admins can delete any event media'
    ) THEN
        CREATE POLICY "Admins can delete any event media"
        ON event_media FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- USER PROFILES table policies
DO $$
BEGIN
    -- Add admin update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' AND policyname = 'Admins can update any user profile'
    ) THEN
        CREATE POLICY "Admins can update any user profile"
        ON user_profiles FOR UPDATE USING (is_admin());
    END IF;
    
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' AND policyname = 'Admins can delete any user profile'
    ) THEN
        CREATE POLICY "Admins can delete any user profile"
        ON user_profiles FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- PIANO REPORTS table policies
DO $$
BEGIN
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'piano_reports' AND policyname = 'Admins can delete any piano report'
    ) THEN
        CREATE POLICY "Admins can delete any piano report"
        ON piano_reports FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- EVENT REPORTS table policies
DO $$
BEGIN
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_reports' AND policyname = 'Admins can delete any event report'
    ) THEN
        CREATE POLICY "Admins can delete any event report"
        ON event_reports FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- USER PIANO VISITS table policies
DO $$
BEGIN
    -- Add admin select policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_piano_visits' AND policyname = 'Admins can view all piano visits'
    ) THEN
        CREATE POLICY "Admins can view all piano visits"
        ON user_piano_visits FOR SELECT USING (is_admin());
    END IF;
    
    -- Add admin update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_piano_visits' AND policyname = 'Admins can update any piano visit'
    ) THEN
        CREATE POLICY "Admins can update any piano visit"
        ON user_piano_visits FOR UPDATE USING (is_admin());
    END IF;
    
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_piano_visits' AND policyname = 'Admins can delete any piano visit'
    ) THEN
        CREATE POLICY "Admins can delete any piano visit"
        ON user_piano_visits FOR DELETE USING (is_admin());
    END IF;
END
$$;

-- USER EVENT ATTENDANCE table policies
DO $$
BEGIN
    -- Add admin select policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_event_attendance' AND policyname = 'Admins can view all event attendance'
    ) THEN
        CREATE POLICY "Admins can view all event attendance"
        ON user_event_attendance FOR SELECT USING (is_admin());
    END IF;
    
    -- Add admin update policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_event_attendance' AND policyname = 'Admins can update any event attendance'
    ) THEN
        CREATE POLICY "Admins can update any event attendance"
        ON user_event_attendance FOR UPDATE USING (is_admin());
    END IF;
    
    -- Add admin delete policy if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_event_attendance' AND policyname = 'Admins can delete any event attendance'
    ) THEN
        CREATE POLICY "Admins can delete any event attendance"
        ON user_event_attendance FOR DELETE USING (is_admin());
    END IF;
END
$$; 