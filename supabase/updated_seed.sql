-- supabase/updated_seed.sql
-- Seed file for Supabase database (updated for UUID primary keys)

-- Clear existing data
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE pianos CASCADE;

-- Create variables to store generated UUIDs for reference
DO $$
DECLARE
  evn_id UUID := uuid_generate_v4();
  ams_id UUID := uuid_generate_v4();
  crl_id UUID := uuid_generate_v4();
  bru_id UUID := uuid_generate_v4();
  bda_id UUID := uuid_generate_v4();
  slc_id UUID := uuid_generate_v4();
  yyc_id UUID := uuid_generate_v4();
  yvr_id UUID := uuid_generate_v4();
  mel_id UUID := uuid_generate_v4();
  can_id UUID := uuid_generate_v4();
  p1_id UUID := uuid_generate_v4();
  p2_id UUID := uuid_generate_v4();
  p3_id UUID := uuid_generate_v4();
  p4_id UUID := uuid_generate_v4();
  p5_id UUID := uuid_generate_v4();
  koln_id UUID := uuid_generate_v4();
BEGIN
  -- Insert piano data with UUID primary keys
  INSERT INTO pianos (id, name, location, coordinates, description, type, condition, access, last_maintained, category, airport_code, country, city, verified, created_at, updated_at)
  VALUES
    -- Airport Pianos (with UUID instead of TEXT IDs)
    (evn_id, 'Zvartnots Yerevan International Airport Piano', 'Zvartnots Yerevan International Airport, Yerevan, Armenia', 
     ARRAY[44.40008000000006, 40.15240000000006], 'Piano located at Zvartnots Yerevan International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'EVN', 'ARM', 'Yerevan', false, NOW(), NOW()),
    
    (ams_id, 'Schiphol International Airport Piano', 'Schiphol International Airport, Amsterdam, Netherlands', 
     ARRAY[4.762637615203858, 52.31094500858536], 'Piano located at Schiphol International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'AMS', 'NLD', 'Amsterdam', false, NOW(), NOW()),
    
    (crl_id, 'Brussels South Charleroi Airport Piano', 'Brussels South Charleroi Airport, Charleroi, Belgium', 
     ARRAY[4.46935000000002, 50.469520000000045], 'Piano located at Brussels South Charleroi Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'CRL', 'BEL', 'Charleroi', false, NOW(), NOW()),
    
    (bru_id, 'Zaventem Luchthaven Piano', 'Zaventem Luchthaven, Zaventem, Belgium', 
     ARRAY[4.4810900000000515, 50.89786000000004], 'Piano located at Zaventem Luchthaven', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'BRU', 'BEL', 'Zaventem', false, NOW(), NOW()),
    
    (bda_id, 'L. F. Wade International Airport Piano', 'L. F. Wade International Airport, St George''s, Bermuda', 
     ARRAY[-111.97776999999996, 40.78839000000005], 'Piano located at L. F. Wade International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'BDA', 'BMU', 'St George''s', false, NOW(), NOW()),
    
    (slc_id, 'Salt Lake City International Airport Piano', 'Salt Lake City International Airport, Salt Lake City, USA', 
     ARRAY[-111.97776999999996, 40.78839000000005], 'Piano located at Salt Lake City International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'SLC', 'USA', 'Salt Lake City', true, NOW(), NOW()),
    
    (yyc_id, 'Calgary International Airport Piano', 'Calgary International Airport, Calgary, Canada', 
     ARRAY[-114.00762999999995, 51.13420000000008], 'Piano located at Calgary International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'YYC', 'CAN', 'Calgary', false, NOW(), NOW()),
    
    (yvr_id, 'Vancouver International Airport Piano', 'Vancouver International Airport, Richmond, Canada', 
     ARRAY[-123.17789999999997, 49.19536000000005], 'Piano located at Vancouver International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'YVR', 'CAN', 'Richmond', false, NOW(), NOW()),
    
    (mel_id, 'Melbourne Airport Piano', 'Melbourne Airport, Melbourne Airport, Australia', 
     ARRAY[144.84879421469407, -37.66952220715411], 'Piano located at Melbourne Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'MEL', 'AUS', 'Melbourne Airport', false, NOW(), NOW()),
    
    (can_id, 'Guangzhou Baiyun International Airport Piano', 'Guangzhou Baiyun International Airport, Guangzhou, China', 
     ARRAY[113.29879000000005, 23.39244000000008], 'Piano located at Guangzhou Baiyun International Airport', 
     'Airport Piano', 'Unknown', 'Public', NULL, 'airport', 'CAN', 'CHN', 'Guangzhou', false, NOW(), NOW()),
    
    -- City Pianos
    (p1_id, 'Central Park Piano', 'Central Park, New York, NY, USA', 
     ARRAY[-73.9654, 40.7829], 'Public piano in Central Park', 
     'Public Piano', 'Good', 'Public', '2024-01-15'::TIMESTAMP WITH TIME ZONE, 'city', NULL, 'USA', 'New York', true, NOW(), NOW()),
    
    (p2_id, 'British Library Piano', 'British Library, London, UK', 
     ARRAY[-0.1276, 51.5300], 'Public piano in the British Library', 
     'Public Piano', 'Excellent', 'Public', '2024-02-20'::TIMESTAMP WITH TIME ZONE, 'city', NULL, 'GBR', 'London', true, NOW(), NOW()),
    
    (p3_id, 'Tokyo Station Piano', 'Tokyo Station, Tokyo, Japan', 
     ARRAY[139.7671, 35.6812], 'Public piano in Tokyo Station', 
     'Public Piano', 'Good', 'Public', '2024-01-10'::TIMESTAMP WITH TIME ZONE, 'city', NULL, 'JPN', 'Tokyo', true, NOW(), NOW()),
    
    (p4_id, 'Paris Metro Piano', 'Gare du Nord, Paris, France', 
     ARRAY[2.3566, 48.8809], 'Public piano in Paris Metro station', 
     'Public Piano', 'Fair', 'Public', '2023-11-05'::TIMESTAMP WITH TIME ZONE, 'city', NULL, 'FRA', 'Paris', false, NOW(), NOW()),
    
    (koln_id, 'Café Toré Piano', 'Café Toré inside the Kulturbunker Köln-Mülheim, Cologne, Germany',
     ARRAY[6.9975, 50.9607], 'Public piano located in Café Toré inside the Kulturbunker Köln-Mülheim. Opening hours: Wednesday – Saturday 10:00-22:00, Sunday 10:00-20:00',
     'Public Piano', 'Unknown', 'Public', NULL, 'city', NULL, 'DEU', 'Cologne', false, NOW(), NOW()),
     
    (p5_id, 'Sydney Opera House Piano', 'Sydney Opera House, Sydney, Australia',
     ARRAY[151.2153, -33.8568], 'Public piano at Sydney Opera House', 
     'Public Piano', 'Excellent', 'Public', '2024-03-01'::TIMESTAMP WITH TIME ZONE, 'city', NULL, 'AUS', 'Sydney', true, NOW(), NOW());

  -- Insert event data with UUID primary keys and proper date format
  INSERT INTO events (id, name, location, coordinates, date, time, description, type, piano_id, status, created_at, updated_at)
  VALUES
    (uuid_generate_v4(), 'Central Park Piano Festival', 'Central Park, New York, NY', 
     ARRAY[-73.9654, 40.7829], '2024-06-15'::TIMESTAMP WITH TIME ZONE, '14:00', 'Annual piano festival featuring local musicians', 
     'Festival', p1_id, 'upcoming', NOW(), NOW()),
    
    (uuid_generate_v4(), 'London Piano Recital', 'British Library, London, UK', 
     ARRAY[-0.1276, 51.5300], '2024-05-20'::TIMESTAMP WITH TIME ZONE, '19:00', 'Evening recital featuring classical masterpieces', 
     'Recital', p2_id, 'upcoming', NOW(), NOW()),
    
    (uuid_generate_v4(), 'Tokyo Station Jazz Night', 'Tokyo Station, Tokyo, Japan', 
     ARRAY[139.7671, 35.6812], '2024-07-10'::TIMESTAMP WITH TIME ZONE, '20:00', 'Jazz performance featuring local artists', 
     'Concert', p3_id, 'upcoming', NOW(), NOW()),
    
    (uuid_generate_v4(), 'Paris Metro Piano Marathon', 'Gare du Nord, Paris, France', 
     ARRAY[2.3566, 48.8809], '2024-04-25'::TIMESTAMP WITH TIME ZONE, '10:00', '12-hour piano marathon with rotating performers', 
     'Marathon', p4_id, 'upcoming', NOW(), NOW()),
    
    (uuid_generate_v4(), 'Sydney Opera House Piano Showcase', 'Sydney Opera House, Sydney, Australia', 
     ARRAY[151.2153, -33.8568], '2024-08-05'::TIMESTAMP WITH TIME ZONE, '18:30', 'Showcase of local piano talent at the Opera House', 
     'Showcase', p5_id, 'upcoming', NOW(), NOW()),
    
    (uuid_generate_v4(), 'Airport Piano Flash Mob', 'Salt Lake City International Airport, Salt Lake City, USA', 
     ARRAY[-111.97776999999996, 40.78839000000005], '2024-05-01'::TIMESTAMP WITH TIME ZONE, '12:00', 'Surprise flash mob performance at the airport piano', 
     'Flash Mob', slc_id, 'upcoming', NOW(), NOW()),
     
   (uuid_generate_v4(), 'Cologne Jazz Evening', 'Café Toré, Kulturbunker Köln-Mülheim, Cologne, Germany',
    ARRAY[6.9975, 50.9607], '2024-06-30'::TIMESTAMP WITH TIME ZONE, '19:30', 'Evening of jazz piano music at Café Toré',
    'Concert', koln_id, 'upcoming', NOW(), NOW());
END
$$;