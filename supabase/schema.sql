-- supabase/schema.sql
-- Schema definition for World Pianos project

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Set up storage for piano and event media
CREATE SCHEMA IF NOT EXISTS storage;

-- Create tables
-- Pianos table
CREATE TABLE IF NOT EXISTS pianos (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    coordinates NUMERIC[] NOT NULL, -- [longitude, latitude]
    description TEXT,
    type TEXT NOT NULL,
    condition TEXT,
    access TEXT,
    last_maintained TEXT,
    category TEXT NOT NULL,
    airport_code TEXT,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    coordinates NUMERIC[] NOT NULL, -- [longitude, latitude]
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,
    piano_id TEXT REFERENCES pianos(id),
    status TEXT DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Piano reports table
CREATE TABLE IF NOT EXISTS piano_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    piano_id TEXT REFERENCES pianos(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event reports table
CREATE TABLE IF NOT EXISTS event_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT REFERENCES events(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    issue_type TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Piano media table
CREATE TABLE IF NOT EXISTS piano_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    piano_id TEXT REFERENCES pianos(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    media_type TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event media table
CREATE TABLE IF NOT EXISTS event_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id TEXT REFERENCES events(id) NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    media_type TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User piano visits (for piano passport)
CREATE TABLE IF NOT EXISTS user_piano_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    piano_id TEXT REFERENCES pianos(id) NOT NULL,
    visit_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, piano_id)
);

-- User event attendance
CREATE TABLE IF NOT EXISTS user_event_attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    event_id TEXT REFERENCES events(id) NOT NULL,
    status TEXT DEFAULT 'interested', -- interested, going, attended
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pianos_category ON pianos(category);
CREATE INDEX IF NOT EXISTS idx_pianos_country ON pianos(country);
CREATE INDEX IF NOT EXISTS idx_pianos_city ON pianos(city);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_piano_id ON events(piano_id);
CREATE INDEX IF NOT EXISTS idx_piano_reports_piano_id ON piano_reports(piano_id);
CREATE INDEX IF NOT EXISTS idx_event_reports_event_id ON event_reports(event_id);
CREATE INDEX IF NOT EXISTS idx_piano_media_piano_id ON piano_media(piano_id);
CREATE INDEX IF NOT EXISTS idx_event_media_event_id ON event_media(event_id);
CREATE INDEX IF NOT EXISTS idx_user_piano_visits_user_id ON user_piano_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_piano_visits_piano_id ON user_piano_visits(piano_id);
CREATE INDEX IF NOT EXISTS idx_user_event_attendance_user_id ON user_event_attendance(user_id);
CREATE INDEX IF NOT EXISTS idx_user_event_attendance_event_id ON user_event_attendance(event_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_pianos_updated_at
BEFORE UPDATE ON pianos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_piano_reports_updated_at
BEFORE UPDATE ON piano_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_reports_updated_at
BEFORE UPDATE ON event_reports
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_event_attendance_updated_at
BEFORE UPDATE ON user_event_attendance
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

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

-- Create policies
-- Pianos: everyone can read, only authenticated users can insert, only admins can update/delete
CREATE POLICY "Pianos are viewable by everyone" 
ON pianos FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create pianos" 
ON pianos FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only admins can update pianos" 
ON pianos FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

CREATE POLICY "Only admins can delete pianos" 
ON pianos FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- Events: similar to pianos
CREATE POLICY "Events are viewable by everyone" 
ON events FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" 
ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only admins can update events" 
ON events FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

CREATE POLICY "Only admins can delete events" 
ON events FOR DELETE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- User profiles: users can read all profiles but only update their own
CREATE POLICY "User profiles are viewable by everyone" 
ON user_profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON user_profiles FOR UPDATE USING (auth.uid() = id);

-- Reports: authenticated users can create, only admins can view/update
CREATE POLICY "Only admins can view piano reports" 
ON piano_reports FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

CREATE POLICY "Authenticated users can create piano reports" 
ON piano_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only admins can update piano reports" 
ON piano_reports FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- Similar policies for event reports
CREATE POLICY "Only admins can view event reports" 
ON event_reports FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

CREATE POLICY "Authenticated users can create event reports" 
ON event_reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only admins can update event reports" 
ON event_reports FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_profiles.id = auth.uid() 
        AND user_profiles.role = 'admin'
    )
);

-- Media: everyone can view, authenticated users can upload
CREATE POLICY "Piano media is viewable by everyone" 
ON piano_media FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload piano media" 
ON piano_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can only update their own piano media" 
ON piano_media FOR UPDATE USING (auth.uid() = user_id);

-- Similar policies for event media
CREATE POLICY "Event media is viewable by everyone" 
ON event_media FOR SELECT USING (true);

CREATE POLICY "Authenticated users can upload event media" 
ON event_media FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can only update their own event media" 
ON event_media FOR UPDATE USING (auth.uid() = user_id);

-- User piano visits: users can only see and manage their own visits
CREATE POLICY "Users can view their own piano visits" 
ON user_piano_visits FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can record their own piano visits" 
ON user_piano_visits FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own piano visits" 
ON user_piano_visits FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own piano visits" 
ON user_piano_visits FOR DELETE USING (auth.uid() = user_id);

-- User event attendance: users can only see and manage their own attendance
CREATE POLICY "Users can view their own event attendance" 
ON user_event_attendance FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can record their own event attendance" 
ON user_event_attendance FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own event attendance" 
ON user_event_attendance FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own event attendance" 
ON user_event_attendance FOR DELETE USING (auth.uid() = user_id);