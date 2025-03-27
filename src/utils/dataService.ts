import { supabase } from './supabase';

// Types
export type Piano = {
  id: string;
  name: string;
  location: string;
  coordinates: number[];
  description: string;
  type: string;
  condition: string;
  access: string;
  last_maintained?: string;
  category: string;
  airport_code?: string;
  country: string;
  city: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  verified?: boolean;
  verification_count?: number;
};

export type Event = {
  id: string;
  name: string;
  location: string;
  coordinates: number[];
  date: string;
  time: string;
  description: string;
  type: string;
  piano_id: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  status?: string;
  pianos?: Piano; // For joined queries
};

// Piano-related functions
export async function getAllPianos() {
  const { data, error } = await supabase
    .from('pianos')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching pianos:', error);
    throw error;
  }
  return data || [];
}

export async function getPianoById(id: string) {
  const { data, error } = await supabase
    .from('pianos')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching piano with id ${id}:`, error);
    throw error;
  }
  return data;
}

export async function createPiano(pianoData: Omit<Piano, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('pianos')
    .insert(pianoData)
    .select();
  
  if (error) {
    console.error('Error creating piano:', error);
    throw error;
  }
  return data[0];
}

export async function updatePiano(id: string, pianoData: Partial<Piano>) {
  const { data, error } = await supabase
    .from('pianos')
    .update(pianoData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error(`Error updating piano with id ${id}:`, error);
    throw error;
  }
  return data[0];
}

export async function reportPianoIssue(reportData: {
  piano_id: string;
  issue_type: string;
  description: string;
  reported_by?: string;
}) {
  const { data, error } = await supabase
    .from('piano_reports')
    .insert(reportData)
    .select();
  
  if (error) {
    console.error('Error reporting piano issue:', error);
    throw error;
  }
  return data[0];
}

// Event-related functions
export async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .order('date');
    
    if (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error('Exception in getAllEvents:', err);
    throw err;
  }
}

export async function getUpcomingEvents() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('events')
    .select('*, pianos:piano_id(*)')
    .gte('date', today)
    .order('date');
  
  if (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
  return data || [];
}

export async function getEventById(id: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error(`Exception in getEventById(${id}):`, err);
    throw err;
  }
}

export async function createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('events')
    .insert(eventData)
    .select();
  
  if (error) {
    console.error('Error creating event:', error);
    throw error;
  }
  return data[0];
}

export async function updateEvent(id: string, eventData: Partial<Event>) {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error(`Error updating event with id ${id}:`, error);
    throw error;
  }
  return data[0];
}

export async function reportEventIssue(reportData: {
  event_id: string;
  issue_type: string;
  description: string;
  reported_by?: string;
}) {
  const { data, error } = await supabase
    .from('event_reports')
    .insert(reportData)
    .select();
  
  if (error) {
    console.error('Error reporting event issue:', error);
    throw error;
  }
  return data[0];
}

// Media-related functions
export async function getPianoMedia(pianoId: string) {
  const { data, error } = await supabase
    .from('piano_media')
    .select('*')
    .eq('piano_id', pianoId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching media for piano ${pianoId}:`, error);
    throw error;
  }
  return data || [];
}

export async function getEventMedia(eventId: string) {
  const { data, error } = await supabase
    .from('event_media')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error(`Error fetching media for event ${eventId}:`, error);
    throw error;
  }
  return data || [];
}

// User-related functions
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error(`Error fetching profile for user ${userId}:`, error);
    throw error;
  }
  return data;
}

// Data migration helper (for development)
export async function importMockData(mockData: any) {
  try {
    // Import pianos
    if (mockData.pianos && mockData.pianos.length > 0) {
      const pianos = mockData.pianos.map((piano: any) => ({
        id: piano.id, // Use the ID directly
        name: piano.name,
        location: piano.location,
        coordinates: piano.coordinates,
        description: piano.description,
        type: piano.type,
        condition: piano.condition,
        access: piano.access || 'Public',
        last_maintained: piano.lastMaintained,
        category: piano.category,
        airport_code: piano.airportCode,
        country: piano.country,
        city: piano.city,
        verified: false,
        verification_count: 0
      }));

      const { data, error } = await supabase
        .from('pianos')
        .insert(pianos)
        .select();
      
      if (error) {
        console.error('Error importing pianos:', error);
        return { success: false, error };
      }
    }

    // Import events
    if (mockData.events && mockData.events.length > 0) {
      const events = mockData.events.map((event: any) => ({
        id: event.id, // Use the ID directly
        name: event.name,
        location: event.location,
        coordinates: event.coordinates,
        date: event.date,
        time: event.time,
        description: event.description,
        type: event.type,
        piano_id: event.pianoId, // Use pianoId directly
        status: 'upcoming'
      }));

      const { data, error } = await supabase
        .from('events')
        .insert(events)
        .select();
      
      if (error) {
        console.error('Error importing events:', error);
        return { success: false, error };
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Exception in importMockData:', err);
    return { success: false, error: err };
  }
}