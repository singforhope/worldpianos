# Supabase Setup for World Pianos Project

This directory contains the necessary files for setting up and seeding the Supabase database for the World Pianos project.

## Files

- `final_schema.sql` - Contains the complete database schema with UUID primary keys and storage buckets
- `updated_seed.sql` - Contains seed data for initial database population (compatible with the new schema)
- `storage_policies.sql` - Contains SQL to set up storage bucket policies for media files
- `archive/schema.sql` - (Deprecated) Original schema file
- `archive/updated_schema.sql` - (Deprecated) Intermediate schema update
- `archive/seed.sql` - (Deprecated) Original seed file with TEXT IDs

## Setup Instructions

### 1. Install Supabase CLI

If you haven't already, install the Supabase CLI:

```bash
# Using npm
npm install -g supabase

# Using yarn
yarn global add supabase

# Using pnpm
pnpm add -g supabase
```

### 2. Initialize Supabase

If you haven't initialized Supabase in your project yet:

```bash
supabase init
```

### 3. Start Supabase Local Development

Start the local Supabase instance:

```bash
supabase start
```

### 4. Apply Schema

Apply the database schema:

```bash
supabase db reset
```

This will apply both the schema and seed files.

Alternatively, you can apply just the schema:

```bash
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/final_schema.sql
```

### 5. Seed the Database

If you want to seed the database separately:

```bash
psql -h localhost -p 54322 -U postgres -d postgres -f supabase/updated_seed.sql
```

## Supabase Project Setup

If you're using a hosted Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `final_schema.sql` and run it
4. Copy and paste the contents of `updated_seed.sql` and run it
5. Copy and paste the contents of `storage_policies.sql` and run it to set up storage policies

## Database Structure

The database consists of the following main tables:

### Pianos

Stores information about pianos:

- `id` - Unique identifier for the piano (UUID)
- `name` - Name of the piano
- `location` - Physical location description
- `coordinates` - Geographic coordinates [longitude, latitude]
- `description` - Detailed description
- `type` - Type of piano (e.g., "Airport Piano", "Public Piano")
- `condition` - Condition of the piano
- `access` - Access information
- `last_maintained` - Date of last maintenance (TIMESTAMP WITH TIME ZONE)
- `category` - Category (e.g., "airport", "city")
- `airport_code` - Airport code (for airport pianos)
- `country` - Country code
- `city` - City name
- `verified` - Whether the piano has been verified
- `verification_count` - Number of verifications
- `created_by` - User who created the piano record (UUID)

### Events

Stores information about events related to pianos:
- `id` - Unique identifier for the event (UUID)
- `name` - Name of the event
- `location` - Physical location description
- `coordinates` - Geographic coordinates [longitude, latitude]
- `date` - Date of the event (TIMESTAMP WITH TIME ZONE)
- `time` - Time of the event
- `description` - Detailed description
- `type` - Type of event (e.g., "Festival", "Recital")
- `piano_id` - Reference to the associated piano (UUID)
- `status` - Status of the event (e.g., "upcoming", "past")
- `created_by` - User who created the event record (UUID)
- `status` - Status of the event (e.g., "upcoming", "past")

## Data Migration

The seed file includes:

- 10 airport pianos
- 5 city pianos
- 6 events

This provides a good starting point for testing and development.

## Storage Buckets

The schema also creates the following storage buckets:

- `piano-images` - For storing piano images
- `event-images` - For storing event images
- `user-avatars` - For storing user profile pictures

These buckets have public access policies for reading the files, but require authentication for uploading.