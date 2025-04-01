-- Migration to add reported_by column to piano_reports and event_reports tables
-- This aligns the database schema with the dataService.ts functions

-- Check if the reported_by column already exists in piano_reports
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'piano_reports'
        AND column_name = 'reported_by'
    ) THEN
        -- Add reported_by column to piano_reports
        ALTER TABLE piano_reports
        ADD COLUMN reported_by UUID REFERENCES auth.users(id);

        -- Copy existing user_id values to reported_by for data consistency
        UPDATE piano_reports
        SET reported_by = user_id
        WHERE user_id IS NOT NULL;
    END IF;
END
$$;

-- Check if the reported_by column already exists in event_reports
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'event_reports'
        AND column_name = 'reported_by'
    ) THEN
        -- Add reported_by column to event_reports
        ALTER TABLE event_reports
        ADD COLUMN reported_by UUID REFERENCES auth.users(id);

        -- Copy existing user_id values to reported_by for data consistency
        UPDATE event_reports
        SET reported_by = user_id
        WHERE user_id IS NOT NULL;
    END IF;
END
$$;

-- Add comment to explain the purpose of the reported_by column
COMMENT ON COLUMN piano_reports.reported_by IS 'User ID of the person who reported the issue, used by dataService.ts reportPianoIssue function';
COMMENT ON COLUMN event_reports.reported_by IS 'User ID of the person who reported the issue, used by dataService.ts reportEventIssue function';