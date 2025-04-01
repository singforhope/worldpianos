# Database Schema & Type Mismatches Fixes

This document outlines the changes made to fix the database schema and type mismatches in the World Pianos project.

## Issues Addressed

1. **Inconsistent Primary Key Types**
   - Some tables used UUID (user_profiles, piano_reports, event_reports, piano_media, event_media, user_piano_visits, user_event_attendance)
   - Others used TEXT (pianos, events)
   - This inconsistency made it difficult to maintain referential integrity and led to type confusion

2. **Type Mismatches Between TypeScript and SQL**
   - In TypeScript, coordinates was defined as `number[]` but in SQL it was `NUMERIC[]`
   - Some date fields were stored as TEXT in the database but handled as Date objects in TypeScript
   - This led to potential data conversion issues and made it harder to work with dates

3. **Inconsistent Error Handling**
   - Some functions used the standardized error handling utilities
   - Others used custom error handling approaches
   - This inconsistency made it harder to debug issues and led to inconsistent error messages

## Changes Made

### 1. Database Schema Updates

We created a new schema file (`supabase/final_schema.sql`) that:

- **Standardizes Primary Key Types**
  - All tables now use UUID for primary keys
  - Pianos and events tables were updated to use UUID instead of TEXT
  - Foreign key references were updated accordingly

- **Improves Date Handling**
  - Changed date fields from TEXT to TIMESTAMP WITH TIME ZONE
  - This ensures proper date handling and timezone support
  - Affected fields:
    - `last_maintained` in pianos table
    - `date` in events table
    - `visit_date` in user_piano_visits table

- **Adds Safety Checks**
  - Added NOT NULL constraints to required fields
  - Created storage buckets for media files
  - Added DEFAULT values for optional fields
  - Added proper foreign key constraints

- **Storage Buckets for Media Files**
  - Created dedicated storage buckets for different types of media:
    - `piano-images`: For storing piano images
    - `event-images`: For storing event images
    - `user-avatars`: For storing user profile pictures
  - Created SQL script (`storage_policies.sql`) to set up proper access policies
  - Ensured buckets exist before they're needed by client-side code

- **Improves Migration Safety**
  - Uses DO blocks to check if tables exist before creating them
  - Adds columns if they don't exist instead of recreating tables
  - Preserves existing data during schema updates

### 2. TypeScript Type Updates

We updated the TypeScript types in `src/utils/dataService.ts` to:

- **Match the Database Schema**
  - Updated ID types to be string (which will be UUID strings in the database)
  - Added comments to clarify the database types
  - Kept coordinates as number[] in TypeScript for ease of use

- **Improve Date Handling**
  - Updated date fields to accept both Date objects and strings
  - This provides flexibility while ensuring type safety
  - Example: `created_at?: Date | string;`

- **Add Better Type Documentation**
  - Added comments to clarify the database types
  - Made optional fields explicit with `?` syntax
  - Improved type definitions for joined queries

### 3. Error Handling Standardization

We standardized error handling across all functions by:

- **Using Shared Utility Functions**
  - Created `dataServiceUtils.ts` with standardized error handling functions
  - Updated all functions to use these utilities
  - This ensures consistent error messages and handling

- **Improving Error Messages**
  - Added operation context to error messages (e.g., "fetching", "creating")
  - Added resource type to error messages (e.g., "piano", "event")
  - Added resource ID to error messages when available

- **Standardizing Return Types**
  - Created utility functions for handling different return types:
    - `handleSingleResult`: For safely handling single item results
    - `handleArrayResult`: For safely handling array results
    - `handleFirstResult`: For safely handling the first item of array results

## How to Apply These Changes

1. **Update the Database Schema**
   - Run the SQL commands in `supabase/final_schema.sql` in your Supabase SQL editor
   - This will update the database schema with all the necessary changes
   - The script is designed to be idempotent, so it can be run multiple times without issues

2. **Update Your Code**
   - The TypeScript types in `src/utils/dataService.ts` have been updated
   - Make sure to use the updated types in your code
   - When working with dates, you can now use both Date objects and strings

3. **Set Up Storage Policies**
   - Run the `storage_policies.sql` script in the Supabase SQL Editor
   - This will create the following policies for each bucket (piano-images, event-images, user-avatars):
     - Allow public read access: SELECT for anon
     - Allow authenticated users to upload: INSERT for authenticated
     - Allow users to update their own uploads: UPDATE for authenticated where owner = auth.uid()
     - Allow users to delete their own uploads: DELETE for authenticated where owner = auth.uid()
   - Verify the policies are created in Storage > Policies in the Supabase dashboard

4. **Test Your Application**
   - After applying these changes, thoroughly test your application
   - Pay special attention to forms that create or update data
   - Verify that dates are handled correctly
   - Check that IDs are properly generated and referenced

## Benefits of These Changes

1. **Improved Data Integrity**
   - Consistent primary key types ensure proper referential integrity
   - NOT NULL constraints prevent invalid data
   - Proper date types ensure accurate date handling

2. **Better Type Safety**
   - TypeScript types now match the database schema
   - This reduces the risk of type-related bugs
   - Improved type documentation makes the code easier to understand

3. **Consistent Error Handling**
   - Standardized error handling makes debugging easier
   - Better error messages help identify issues quickly

4. **Improved Media Storage**
   - Dedicated storage buckets for different types of media
   - Instructions for setting up proper access policies via the Supabase dashboard
   - Consistent approach to file storage and retrieval
   - Better error messages help identify issues quickly
   - Consistent return types make the API more predictable

4. **Future-Proofing**
   - The new schema is more flexible and can accommodate future changes
   - The migration script is designed to be safe and idempotent
   - The TypeScript types are more explicit and easier to maintain