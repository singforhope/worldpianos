# Supabase Migrations

This directory contains database migrations for the World Pianos project. Each migration file is prefixed with a date in YYYYMMDD format.

## Admin Permissions Migration

The `20250403_admin_permissions.sql` migration adds comprehensive policies to ensure admins have full permissions (SELECT, INSERT, UPDATE, DELETE) for all tables in the database. This helps address issues with piano deletion and other admin operations.

### What it does

1. Creates a reusable `is_admin()` function to check if the current user has the admin role
2. Adds missing UPDATE and DELETE policies for admins to the following tables:
   - piano_media and event_media
   - user_profiles
   - piano_reports and event_reports
   - user_piano_visits
   - user_event_attendance
3. Ensures consistent admin access across all operations on all tables

## Avatar Cleanup Migration

The `20250402_avatar_cleanup_trigger.sql` migration adds a trigger to automatically clean up old avatar files when a user updates their profile with a new avatar.

### How it works

1. When a user updates their profile with a new avatar URL, the trigger function `delete_avatar_on_profile_update()` is called
2. The function extracts the filename from the old avatar URL
3. If the old avatar is not a default avatar (from ui-avatars.com) and has a valid filename, it attempts to delete the file from storage
4. The actual deletion is handled by a helper function `delete_storage_object(bucket_name, object_path)`

### Testing

You can test the trigger functionality using the `20250402_test_avatar_cleanup.sql` script:

```sql
-- Apply the migrations first
\i supabase/migrations/20250402_avatar_cleanup_trigger.sql

-- Then run the test
\i supabase/migrations/20250402_test_avatar_cleanup.sql
```

## Applying Migrations

### Local Development

To apply all migrations to your local Supabase instance:

```bash
# Start Supabase if not already running
supabase start

# Apply migrations
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250401_add_reported_by_column.sql
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250401_update_piano_reports_rls.sql
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250401_update_event_reports_rls.sql
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250402_avatar_cleanup_trigger.sql
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/migrations/20250403_admin_permissions.sql
```

### Production Environment

For production environments, you can run these migrations through the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of the migration file
5. Run the query

## Migration Order

Make sure to apply migrations in the correct order:

1. Schema changes (tables, columns)
2. Function definitions
3. Trigger definitions
4. Policy updates
5. Data migrations

## Troubleshooting

### Admin Permissions Issues

If you experience issues with admin permissions:

1. Check if the policies were created successfully:
   ```sql
   SELECT tablename, policyname, cmd, permissive 
   FROM pg_policies 
   WHERE policyname LIKE 'Admins can%';
   ```

2. Verify the is_admin() function is working correctly:
   ```sql
   -- Set a user role to admin
   UPDATE user_profiles SET role = 'admin' WHERE id = 'your-user-id';
   
   -- Test the function (in authenticated context)
   SELECT is_admin();
   ```

### Avatar Cleanup Issues

If you encounter issues with the avatar cleanup trigger:

1. Check if the trigger and functions exist:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'trigger_delete_avatar_on_profile_update';
   SELECT proname, prosrc FROM pg_proc WHERE proname = 'delete_avatar_on_profile_update';
   ```

2. Test the trigger manually:
   ```sql
   -- Get a user ID
   SELECT id FROM auth.users LIMIT 1;
   
   -- Update that user's avatar URL
   UPDATE user_profiles 
   SET avatar_url = 'https://example.com/new-test-avatar.jpg' 
   WHERE id = 'user-id-from-previous-query';
   ```

3. Check the Supabase storage logs for deletion attempts 