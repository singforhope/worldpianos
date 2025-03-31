-- supabase/updated_schema.sql
-- Updated Schema definition for World Pianos project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Set up storage for piano and event media
CREATE SCHEMA IF NOT EXISTS storage;

-- Create tables if they don't exist
-- Pianos table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'pianos') THEN
        CREATE TABLE pianos (
            id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            coordinates NUMERIC[] NOT NULL, -- [longitude, latitude]
            description TEXT,
            type TEXT NOT NULL,
            condition TEXT NOT NULL,
            access TEXT NOT NULL,
            last_maintained TEXT,
            category TEXT NOT NULL,
            airport_code TEXT,
            country TEXT NOT NULL,
            city TEXT NOT NULL,
            verified BOOLEAN DEFAULT FALSE,
            verification_count INTEGER DEFAULT 0,
            created_by UUID REFERENCES auth.users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    ELSE
        -- Add any missing columns to existing table
        BEGIN
            ALTER TABLE pianos ADD COLUMN IF NOT EXISTS verification_count INTEGER DEFAULT 0;
            ALTER TABLE pianos ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
            -- Make required fields NOT NULL if they aren't already
            ALTER TABLE pianos ALTER COLUMN name SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN location SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN coordinates SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN type SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN condition SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN access SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN category SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN country SET NOT NULL;
            ALTER TABLE pianos ALTER COLUMN city SET NOT NULL;
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Error altering pianos table: %', SQLERRM;
        END;
    END IF;
END
$$;

-- Events table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'events') THEN
        CREATE TABLE events (
            id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            coordinates NUMERIC[] NOT NULL, -- [longitude, latitude]
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            description TEXT NOT NULL,
            type TEXT NOT NULL,
            piano_id TEXT REFERENCES pianos(id) NOT NULL,
            status TEXT DEFAULT 'upcoming',
            created_by UUID REFERENCES auth.users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    ELSE
        -- Add any missing columns to existing table
        BEGIN
            ALTER TABLE events ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
            -- Make required fields NOT NULL if they aren't already
            ALTER TABLE events ALTER COLUMN name SET NOT NULL;
            ALTER TABLE events ALTER COLUMN location SET NOT NULL;
            ALTER TABLE events ALTER COLUMN coordinates SET NOT NULL;
            ALTER TABLE events ALTER COLUMN date SET NOT NULL;
            ALTER TABLE events ALTER COLUMN time SET NOT NULL;
            ALTER TABLE events ALTER COLUMN description SET NOT NULL;
            ALTER TABLE events ALTER COLUMN type SET NOT NULL;
            ALTER TABLE events ALTER COLUMN piano_id SET NOT NULL;
        EXCEPTION
            WHEN others THEN
                RAISE NOTICE 'Error altering events table: %', SQLERRM;
        END;
    END IF;
END
$$;

-- User profiles table (extends Supabase auth.users)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_profiles') THEN
        CREATE TABLE user_profiles (
            id UUID PRIMARY KEY REFERENCES auth.users(id),
            display_name TEXT,
            bio TEXT,
            avatar_url TEXT,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END
$$;

-- Piano reports table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'piano_reports') THEN
        CREATE TABLE piano_reports (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            piano_id TEXT REFERENCES pianos(id) NOT NULL,
            user_id UUID REFERENCES auth.users(id),
            issue_type TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END
$$;

-- Event reports table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'event_reports') THEN
        CREATE TABLE event_reports (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_id TEXT REFERENCES events(id) NOT NULL,
            user_id UUID REFERENCES auth.users(id),
            issue_type TEXT NOT NULL,
            description TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END
$$;

-- Piano media table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'piano_media') THEN
        CREATE TABLE piano_media (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            piano_id TEXT REFERENCES pianos(id) NOT NULL,
            user_id UUID REFERENCES auth.users(id),
            media_type TEXT NOT NULL,
            url TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END
$$;

-- Event media table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'event_media') THEN
        CREATE TABLE event_media (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_id TEXT REFERENCES events(id) NOT NULL,
            user_id UUID REFERENCES auth.users(id),
            media_type TEXT NOT NULL,
            url TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
    END IF;
END
$$;

-- User piano visits (for piano passport)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_piano_visits') THEN
        CREATE TABLE user_piano_visits (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) NOT NULL,
            piano_id TEXT REFERENCES pianos(id) NOT NULL,
            visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            notes TEXT,
            UNIQUE(user_id, piano_id)
        );
    END IF;
END
$$;

-- User event attendance
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_event_attendance') THEN
        CREATE TABLE user_event_attendance (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES auth.users(id) NOT NULL,
            event_id TEXT REFERENCES events(id) NOT NULL,
            status TEXT DEFAULT 'interested', -- interested, going, attended
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(user_id, event_id)
        );
    END IF;
END
$$;

-- Create indexes for better performance
DO $$
BEGIN
    -- Pianos indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_pianos_category') THEN
        CREATE INDEX idx_pianos_category ON pianos(category);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_pianos_country') THEN
        CREATE INDEX idx_pianos_country ON pianos(country);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_pianos_city') THEN
        CREATE INDEX idx_pianos_city ON pianos(city);
    END IF;
    
    -- Events indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_events_date') THEN
        CREATE INDEX idx_events_date ON events(date);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_events_piano_id') THEN
        CREATE INDEX idx_events_piano_id ON events(piano_id);
    END IF;
    
    -- Reports indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_piano_reports_piano_id') THEN
        CREATE INDEX idx_piano_reports_piano_id ON piano_reports(piano_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_event_reports_event_id') THEN
        CREATE INDEX idx_event_reports_event_id ON event_reports(event_id);
    END IF;
    
    -- Media indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_piano_media_piano_id') THEN
        CREATE INDEX idx_piano_media_piano_id ON piano_media(piano_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_event_media_event_id') THEN
        CREATE INDEX idx_event_media_event_id ON event_media(event_id);
    END IF;
    
    -- User visits and attendance indexes
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_piano_visits_user_id') THEN
        CREATE INDEX idx_user_piano_visits_user_id ON user_piano_visits(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_piano_visits_piano_id') THEN
        CREATE INDEX idx_user_piano_visits_piano_id ON user_piano_visits(piano_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_event_attendance_user_id') THEN
        CREATE INDEX idx_user_event_attendance_user_id ON user_event_attendance(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_event_attendance_event_id') THEN
        CREATE INDEX idx_user_event_attendance_event_id ON user_event_attendance(event_id);
    END IF;
END
$$;

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps (if they don't already exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_pianos_updated_at') THEN
        CREATE TRIGGER update_pianos_updated_at
        BEFORE UPDATE ON pianos
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_events_updated_at') THEN
        CREATE TRIGGER update_events_updated_at
        BEFORE UPDATE ON events
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_profiles_updated_at') THEN
        CREATE TRIGGER update_user_profiles_updated_at
        BEFORE UPDATE ON user_profiles
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_piano_reports_updated_at') THEN
        CREATE TRIGGER update_piano_reports_updated_at
        BEFORE UPDATE ON piano_reports
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_reports_updated_at') THEN
        CREATE TRIGGER update_event_reports_updated_at
        BEFORE UPDATE ON event_reports
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_user_event_attendance_updated_at') THEN
        CREATE TRIGGER update_user_event_attendance_updated_at
        BEFORE UPDATE ON user_event_attendance
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END
$$;

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE pianos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE piano_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE piano_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_piano_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_event_attendance ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't already exist
-- Helper function to check if a policy exists
CREATE OR REPLACE FUNCTION policy_exists(policy_name text, table_name text) RETURNS boolean AS $$
DECLARE
    exists_val boolean;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE policyname = policy_name
        AND tablename = table_name
    ) INTO exists_val;
    RETURN exists_val;
END;
$$ LANGUAGE plpgsql;

-- Pianos: everyone can read, only authenticated users can insert, only admins can update/delete
DO $$
BEGIN
    IF NOT policy_exists('Pianos are viewable by everyone', 'pianos') THEN
        CREATE POLICY "Pianos are viewable by everyone"
        ON pianos FOR SELECT USING (true);
    END IF;
    
    IF NOT policy_exists('Authenticated users can create pianos', 'pianos') THEN
        CREATE POLICY "Authenticated users can create pianos"
        ON pianos FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Users can update their own pianos', 'pianos') THEN
        CREATE POLICY "Users can update their own pianos"
        ON pianos FOR UPDATE USING (
            auth.uid() = created_by OR
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
    
    IF NOT policy_exists('Only admins can delete pianos', 'pianos') THEN
        CREATE POLICY "Only admins can delete pianos"
        ON pianos FOR DELETE USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
END
$$;

-- Events: similar to pianos
DO $$
BEGIN
    IF NOT policy_exists('Events are viewable by everyone', 'events') THEN
        CREATE POLICY "Events are viewable by everyone"
        ON events FOR SELECT USING (true);
    END IF;
    
    IF NOT policy_exists('Authenticated users can create events', 'events') THEN
        CREATE POLICY "Authenticated users can create events"
        ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Users can update their own events', 'events') THEN
        CREATE POLICY "Users can update their own events"
        ON events FOR UPDATE USING (
            auth.uid() = created_by OR
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
    
    IF NOT policy_exists('Only admins can delete events', 'events') THEN
        CREATE POLICY "Only admins can delete events"
        ON events FOR DELETE USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
END
$$;

-- User profiles: users can read all profiles but only update their own
DO $$
BEGIN
    IF NOT policy_exists('User profiles are viewable by everyone', 'user_profiles') THEN
        CREATE POLICY "User profiles are viewable by everyone"
        ON user_profiles FOR SELECT USING (true);
    END IF;
    
    IF NOT policy_exists('Users can insert their own profile', 'user_profiles') THEN
        CREATE POLICY "Users can insert their own profile"
        ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
    
    IF NOT policy_exists('Users can update their own profile', 'user_profiles') THEN
        CREATE POLICY "Users can update their own profile"
        ON user_profiles FOR UPDATE USING (auth.uid() = id);
    END IF;
END
$$;

-- Reports: authenticated users can create, only admins can view/update
DO $$
BEGIN
    IF NOT policy_exists('Only admins can view piano reports', 'piano_reports') THEN
        CREATE POLICY "Only admins can view piano reports"
        ON piano_reports FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
    
    IF NOT policy_exists('Authenticated users can create piano reports', 'piano_reports') THEN
        CREATE POLICY "Authenticated users can create piano reports"
        ON piano_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Only admins can update piano reports', 'piano_reports') THEN
        CREATE POLICY "Only admins can update piano reports"
        ON piano_reports FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
END
$$;

-- Similar policies for event reports
DO $$
BEGIN
    IF NOT policy_exists('Only admins can view event reports', 'event_reports') THEN
        CREATE POLICY "Only admins can view event reports"
        ON event_reports FOR SELECT USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
    
    IF NOT policy_exists('Authenticated users can create event reports', 'event_reports') THEN
        CREATE POLICY "Authenticated users can create event reports"
        ON event_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Only admins can update event reports', 'event_reports') THEN
        CREATE POLICY "Only admins can update event reports"
        ON event_reports FOR UPDATE USING (
            EXISTS (
                SELECT 1 FROM user_profiles
                WHERE user_profiles.id = auth.uid()
                AND user_profiles.role = 'admin'
            )
        );
    END IF;
END
$$;

-- Media: everyone can view, authenticated users can upload
DO $$
BEGIN
    IF NOT policy_exists('Piano media is viewable by everyone', 'piano_media') THEN
        CREATE POLICY "Piano media is viewable by everyone"
        ON piano_media FOR SELECT USING (true);
    END IF;
    
    IF NOT policy_exists('Authenticated users can upload piano media', 'piano_media') THEN
        CREATE POLICY "Authenticated users can upload piano media"
        ON piano_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Users can only update their own piano media', 'piano_media') THEN
        CREATE POLICY "Users can only update their own piano media"
        ON piano_media FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- Similar policies for event media
DO $$
BEGIN
    IF NOT policy_exists('Event media is viewable by everyone', 'event_media') THEN
        CREATE POLICY "Event media is viewable by everyone"
        ON event_media FOR SELECT USING (true);
    END IF;
    
    IF NOT policy_exists('Authenticated users can upload event media', 'event_media') THEN
        CREATE POLICY "Authenticated users can upload event media"
        ON event_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    
    IF NOT policy_exists('Users can only update their own event media', 'event_media') THEN
        CREATE POLICY "Users can only update their own event media"
        ON event_media FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- User piano visits: users can only see and manage their own visits
DO $$
BEGIN
    IF NOT policy_exists('Users can view their own piano visits', 'user_piano_visits') THEN
        CREATE POLICY "Users can view their own piano visits"
        ON user_piano_visits FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can record their own piano visits', 'user_piano_visits') THEN
        CREATE POLICY "Users can record their own piano visits"
        ON user_piano_visits FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can update their own piano visits', 'user_piano_visits') THEN
        CREATE POLICY "Users can update their own piano visits"
        ON user_piano_visits FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can delete their own piano visits', 'user_piano_visits') THEN
        CREATE POLICY "Users can delete their own piano visits"
        ON user_piano_visits FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;

-- User event attendance: users can only see and manage their own attendance
DO $$
BEGIN
    IF NOT policy_exists('Users can view their own event attendance', 'user_event_attendance') THEN
        CREATE POLICY "Users can view their own event attendance"
        ON user_event_attendance FOR SELECT USING (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can record their own event attendance', 'user_event_attendance') THEN
        CREATE POLICY "Users can record their own event attendance"
        ON user_event_attendance FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can update their own event attendance', 'user_event_attendance') THEN
        CREATE POLICY "Users can update their own event attendance"
        ON user_event_attendance FOR UPDATE USING (auth.uid() = user_id);
    END IF;
    
    IF NOT policy_exists('Users can delete their own event attendance', 'user_event_attendance') THEN
        CREATE POLICY "Users can delete their own event attendance"
        ON user_event_attendance FOR DELETE USING (auth.uid() = user_id);
    END IF;
END
$$;