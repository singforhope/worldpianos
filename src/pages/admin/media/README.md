# Media Management

This directory contains the admin media management functionality for WorldPianos.

## Overview

The Media Management page provides administrators with the ability to:

1. View all media across the platform (both piano media and event media)
2. Filter media by type (piano/event/all)
3. Filter flagged media for moderation
4. Search media by description
5. Sort media by date added
6. Paginate through results
7. Flag/unflag media items for moderation
8. Delete inappropriate media

## Implementation Details

The main components of the Media Management system include:

- **index.astro**: The main page that displays media in a grid format with filtering options
- Client-side JavaScript for flagging, unflagging, and deleting media items
- Integration with Supabase for database operations

## Data Structure

This feature relies on the following database tables:

- `piano_media`: Stores media related to pianos
- `event_media`: Stores media related to events

Both tables include a `flagged` field to mark content for moderation.

## Usage

1. Navigate to `/admin/media` from the admin dashboard
2. Use the filters at the top to find specific media
3. Click on "Flag" to mark media for further review
4. Click on "Approve" to remove the flag from content
5. Click on "Delete" to permanently remove inappropriate media

## Security

All database operations enforce Role-Based Access Control (RBC) to ensure only administrators can perform media management tasks. 