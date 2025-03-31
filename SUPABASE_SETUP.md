# Supabase Setup Instructions

This document provides instructions for setting up Supabase Row Level Security (RLS) policies to allow public access to certain tables.

## Row Level Security (RLS) Policies

By default, Supabase tables are not accessible to the public unless you set up policies to allow it. You need to configure Row Level Security (RLS) policies to control access to your tables.

### Enable RLS for Tables

First, enable Row Level Security for your tables:

```sql
ALTER TABLE pianos ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

### Create Policies for Public Read Access

Create policies to allow public read access to the pianos and events tables:

```sql
-- Allow anyone to read pianos
CREATE POLICY "Allow public read access for pianos" ON pianos
  FOR SELECT
  USING (true);

-- Allow anyone to read events
CREATE POLICY "Allow public read access for events" ON events
  FOR SELECT
  USING (true);
```

### Create Policies for Authenticated Write Access

Create policies to allow authenticated users to create and update pianos and events:

```sql
-- Allow authenticated users to insert pianos
CREATE POLICY "Allow authenticated insert for pianos" ON pianos
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own pianos
CREATE POLICY "Allow authenticated update for pianos" ON pianos
  FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Allow authenticated users to insert events
CREATE POLICY "Allow authenticated insert for events" ON events
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own events
CREATE POLICY "Allow authenticated update for events" ON events
  FOR UPDATE
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);
```

## Testing RLS Policies

You can test your RLS policies using the Supabase SQL Editor:

```sql
-- Test public read access for pianos
SELECT * FROM pianos LIMIT 10;

-- Test public read access for events
SELECT * FROM events LIMIT 10;
```

## Troubleshooting

If you're still having issues with public access to tables, check the following:

1. Make sure RLS is enabled for the tables
2. Make sure the policies are correctly configured
3. Check the Supabase logs for any errors
4. Try accessing the tables using the Supabase API Explorer

## Additional Resources

- [Supabase Row Level Security Documentation](https://supabase.io/docs/guides/auth/row-level-security)
- [Supabase Policies Documentation](https://supabase.io/docs/guides/auth/policies)