# Schema Updates

This document outlines the updates made to the Supabase schema and the corresponding TypeScript types and functions in the dataService.ts file.

## Schema Updates

The following updates were made to the Supabase schema:

1. **Added DEFAULT uuid_generate_v4()::text to ID fields**
   - This ensures that IDs are automatically generated when not provided
   - Makes it easier to create new records without having to generate IDs client-side

2. **Made Required Fields NOT NULL**
   - Added NOT NULL constraints to required fields in the database schema
   - This ensures data integrity and matches the form validation

3. **Updated RLS Policies**
   - Modified the Row Level Security (RLS) policies to allow users to update their own records
   - Added policies for user-specific operations like piano visits and event attendance

4. **Added created_by Field to Tables**
   - Added created_by field to pianos and events tables
   - This allows tracking who created each record
   - Enables users to manage their own records

## TypeScript Types

The following TypeScript types were added or updated in dataService.ts:

1. **UserProfile**
   ```typescript
   export type UserProfile = {
     id: string;
     display_name?: string;
     bio?: string;
     avatar_url?: string;
     role?: string;
     created_at?: string;
     updated_at?: string;
   };
   ```

2. **PianoReport**
   ```typescript
   export type PianoReport = {
     id: string;
     piano_id: string;
     user_id?: string;
     issue_type: string;
     description: string;
     status?: string;
     created_at?: string;
     updated_at?: string;
   };
   ```

3. **EventReport**
   ```typescript
   export type EventReport = {
     id: string;
     event_id: string;
     user_id?: string;
     issue_type: string;
     description: string;
     status?: string;
     created_at?: string;
     updated_at?: string;
   };
   ```

4. **PianoMedia**
   ```typescript
   export type PianoMedia = {
     id: string;
     piano_id: string;
     user_id?: string;
     media_type: string;
     url: string;
     description?: string;
     created_at?: string;
   };
   ```

5. **EventMedia**
   ```typescript
   export type EventMedia = {
     id: string;
     event_id: string;
     user_id?: string;
     media_type: string;
     url: string;
     description?: string;
     created_at?: string;
   };
   ```

6. **UserPianoVisit**
   ```typescript
   export type UserPianoVisit = {
     id: string;
     user_id: string;
     piano_id: string;
     visit_date?: string;
     notes?: string;
   };
   ```

7. **UserEventAttendance**
   ```typescript
   export type UserEventAttendance = {
     id: string;
     user_id: string;
     event_id: string;
     status?: string;
     created_at?: string;
     updated_at?: string;
   };
   ```

## New Functions

The following functions were added to dataService.ts:

1. **User Piano Visits**
   - `getUserPianoVisits(userId: string)`: Get all piano visits for a user
   - `createUserPianoVisit(visitData)`: Record a new piano visit

2. **User Event Attendance**
   - `getUserEventAttendance(userId: string)`: Get all event attendance records for a user
   - `createUserEventAttendance(attendanceData)`: Record a new event attendance
   - `updateUserEventAttendance(id: string, attendanceData)`: Update an existing attendance record

## How to Apply These Changes

1. **Update the Supabase Schema**
   - Run the SQL commands in `supabase/updated_schema.sql` in your Supabase SQL editor
   - This will update the database schema with all the necessary changes

2. **Update the TypeScript Types**
   - The TypeScript types in `src/utils/dataService.ts` have been updated
   - These types are used throughout the application for type checking

3. **Use the New Functions**
   - The new functions in `src/utils/dataService.ts` can be used to interact with the updated schema
   - These functions handle all the necessary API calls to Supabase

## Benefits of These Changes

1. **Improved Data Integrity**
   - Required fields are now enforced at the database level
   - IDs are automatically generated

2. **Better User Experience**
   - Users can now manage their own records
   - Piano visits and event attendance can be tracked

3. **Enhanced Security**
   - Row Level Security (RLS) policies ensure that users can only access and modify their own data
   - Admin users have additional privileges

4. **Easier Development**
   - TypeScript types provide better code completion and error checking
   - Functions abstract away the details of interacting with Supabase