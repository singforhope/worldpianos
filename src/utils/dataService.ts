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

export type UserProfile = {
  id: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
};

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

export type PianoMedia = {
  id: string;
  piano_id: string;
  user_id?: string;
  media_type: string;
  url: string;
  description?: string;
  created_at?: string;
};

export type EventMedia = {
  id: string;
  event_id: string;
  user_id?: string;
  media_type: string;
  url: string;
  description?: string;
  created_at?: string;
};

export type UserPianoVisit = {
  id: string;
  user_id: string;
  piano_id: string;
  visit_date?: string;
  notes?: string;
};

export type UserEventAttendance = {
  id: string;
  user_id: string;
  event_id: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

// Piano-related functions
export async function getAllPianos() {
  try {
    console.log('Fetching all pianos...');
    
    // Check if supabase is initialized
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase client is not initialized');
    }
    
    // Log the supabase object to see if it's properly initialized
    console.log('Supabase client:', supabase ? 'Initialized' : 'Not initialized');
    
    // Try to fetch pianos - this should be a public operation that doesn't require authentication
    console.log('Attempting to fetch pianos from the "pianos" table...');
    const { data, error } = await supabase
      .from('pianos')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Supabase error fetching pianos:', error);
      
      // Check for specific error types
      if (error.code === 'PGRST301') {
        console.error('Authentication error: This might be due to Row Level Security (RLS) policies requiring authentication');
        console.error('Make sure your Supabase RLS policies allow public access to the pianos table');
      } else if (error.code === '42501') {
        console.error('Permission denied: This might be due to Row Level Security (RLS) policies');
        console.error('Make sure your Supabase RLS policies allow public access to the pianos table');
      } else if (error.code === '42P01') {
        console.error('Table not found: The "pianos" table might not exist');
      }
      
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} pianos`);
    return data || [];
  } catch (err) {
    console.error('Exception in getAllPianos:', err);
    throw {
      message: 'Error fetching pianos',
      details: err
    };
  }
}

export async function getPianoById(id: string) {
  try {
    const { data, error } = await supabase
      .from('pianos')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    throw {
      message: `Error fetching piano with id ${id}`,
      details: err
    };
  }
}

export async function createPiano(pianoData: Omit<Piano, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('pianos')
      .insert(pianoData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error creating piano',
      details: err
    };
  }
}

export async function updatePiano(id: string, pianoData: Partial<Piano>) {
  try {
    const { data, error } = await supabase
      .from('pianos')
      .update(pianoData)
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: `Error updating piano with id ${id}`,
      details: err
    };
  }
}

export async function reportPianoIssue(reportData: {
  piano_id: string;
  issue_type: string;
  description: string;
  reported_by?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('piano_reports')
      .insert(reportData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error reporting piano issue',
      details: err
    };
  }
}

// Event-related functions
export async function getAllEvents() {
  try {
    console.log('Fetching all events...');
    
    // Check if supabase is initialized
    if (!supabase) {
      console.error('Supabase client is not initialized');
      throw new Error('Supabase client is not initialized');
    }
    
    // Log the supabase object to see if it's properly initialized
    console.log('Supabase client:', supabase ? 'Initialized' : 'Not initialized');
    
    // Try to fetch events - this should be a public operation that doesn't require authentication
    console.log('Attempting to fetch events from the "events" table...');
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .order('date');
    
    if (error) {
      console.error('Supabase error fetching events:', error);
      
      // Check for specific error types
      if (error.code === 'PGRST301') {
        console.error('Authentication error: This might be due to Row Level Security (RLS) policies requiring authentication');
        console.error('Make sure your Supabase RLS policies allow public access to the events table');
      } else if (error.code === '42501') {
        console.error('Permission denied: This might be due to Row Level Security (RLS) policies');
        console.error('Make sure your Supabase RLS policies allow public access to the events table');
      } else if (error.code === '42P01') {
        console.error('Table not found: The "events" table might not exist');
      }
      
      throw error;
    }
    
    console.log(`Successfully fetched ${data?.length || 0} events`);
    return data || [];
  } catch (err) {
    console.error('Exception in getAllEvents:', err);
    throw {
      message: 'Error fetching events',
      details: err
    };
  }
}

export async function getUpcomingEvents() {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .gte('date', today)
      .order('date');
    
    if (error) {
      throw error;
    }
    return data || [];
  } catch (err) {
    throw {
      message: 'Error fetching upcoming events',
      details: err
    };
  }
}

export async function getEventById(id: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (err) {
    throw {
      message: `Error fetching event with id ${id}`,
      details: err
    };
  }
}

export async function createEvent(eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error creating event',
      details: err
    };
  }
}

export async function updateEvent(id: string, eventData: Partial<Event>) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: `Error updating event with id ${id}`,
      details: err
    };
  }
}

export async function reportEventIssue(reportData: {
  event_id: string;
  issue_type: string;
  description: string;
  reported_by?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('event_reports')
      .insert(reportData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error reporting event issue',
      details: err
    };
  }
}

// Media-related functions
export async function getPianoMedia(pianoId: string) {
  try {
    const { data, error } = await supabase
      .from('piano_media')
      .select('*')
      .eq('piano_id', pianoId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    return data || [];
  } catch (err) {
    throw {
      message: `Error fetching media for piano ${pianoId}`,
      details: err
    };
  }
}

export async function getEventMedia(eventId: string) {
  try {
    const { data, error } = await supabase
      .from('event_media')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    return data || [];
  } catch (err) {
    throw {
      message: `Error fetching media for event ${eventId}`,
      details: err
    };
  }
}

// User-related functions
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    throw {
      message: 'Error getting current user',
      details: err
    };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      throw error;
    }
    return data;
  } catch (err) {
    throw {
      message: `Error fetching profile for user ${userId}`,
      details: err
    };
  }
}

// Data migration helper (for development)
// User Piano Visits functions
export async function getUserPianoVisits(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_piano_visits')
      .select('*, pianos:piano_id(*)')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    return data || [];
  } catch (err) {
    throw {
      message: 'Error fetching user piano visits',
      details: err
    };
  }
}

export async function createUserPianoVisit(visitData: {
  user_id: string;
  piano_id: string;
  visit_date?: string;
  notes?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_piano_visits')
      .insert(visitData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error creating user piano visit',
      details: err
    };
  }
}

// User Event Attendance functions
export async function getUserEventAttendance(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_event_attendance')
      .select('*, events:event_id(*)')
      .eq('user_id', userId);
    
    if (error) {
      throw error;
    }
    return data || [];
  } catch (err) {
    throw {
      message: 'Error fetching user event attendance',
      details: err
    };
  }
}

export async function createUserEventAttendance(attendanceData: {
  user_id: string;
  event_id: string;
  status?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_event_attendance')
      .insert(attendanceData)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error creating user event attendance',
      details: err
    };
  }
}

export async function updateUserEventAttendance(id: string, attendanceData: {
  status?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('user_event_attendance')
      .update(attendanceData)
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    return data[0];
  } catch (err) {
    throw {
      message: 'Error updating user event attendance',
      details: err
    };
  }
}

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
        return { success: false, error };
      }
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}