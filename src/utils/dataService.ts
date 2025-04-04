import { supabase } from './supabaseClient';
import {
  handleDataServiceError,
  handleSingleResult,
  handleArrayResult,
  handleFirstResult
} from './dataServiceUtils';

// Types
export type Piano = {
  id: string; // UUID string in the database
  name: string;
  location: string;
  coordinates: number[]; // [longitude, latitude] - NUMERIC[] in the database
  description?: string;
  type: string;
  condition: string;
  access: string;
  last_maintained?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  category: string;
  airport_code?: string;
  country: string;
  city: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  created_by?: string; // UUID string in the database
  verified?: boolean;
  verification_count?: number;
  status?: string; // 'active' or 'archived'
};

export type Event = {
  id: string; // UUID string in the database
  name: string;
  location: string;
  coordinates: number[]; // [longitude, latitude] - NUMERIC[] in the database
  date: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  time: string;
  description: string;
  type: string;
  piano_id: string; // UUID string in the database
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  created_by?: string; // UUID string in the database
  status?: string;
  pianos?: Piano; // For joined queries
};

export type UserProfile = {
  id: string; // UUID string in the database
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  role?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

export type PianoReport = {
  id: string; // UUID string in the database
  piano_id: string; // UUID string in the database
  user_id?: string; // UUID string in the database
  issue_type: string;
  description: string;
  status?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

export type EventReport = {
  id: string; // UUID string in the database
  event_id: string; // UUID string in the database
  user_id?: string; // UUID string in the database
  issue_type: string;
  description: string;
  status?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

export type PianoMedia = {
  id: string; // UUID string in the database
  piano_id: string; // UUID string in the database
  user_id?: string; // UUID string in the database
  media_type: string;
  url: string;
  description?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

export type EventMedia = {
  id: string; // UUID string in the database
  event_id: string; // UUID string in the database
  user_id?: string; // UUID string in the database
  media_type: string;
  url: string;
  description?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

export type UserPianoVisit = {
  id: string; // UUID string in the database
  user_id: string; // UUID string in the database
  piano_id: string; // UUID string in the database
  visit_date?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  notes?: string;
};

export type UserEventAttendance = {
  id: string; // UUID string in the database
  user_id: string; // UUID string in the database
  event_id: string; // UUID string in the database
  status?: string;
  created_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
  updated_at?: Date | string; // TIMESTAMP WITH TIME ZONE in the database
};

// Piano-related functions
export async function getAllPianos() {
  try {
    const { data, error } = await supabase
      .from('pianos')
      .select('*')
      .neq('status', 'archived')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'pianos', err);
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
    
    // Return null if the piano is archived
    if (data && data.status === 'archived') {
      throw new Error("This piano is no longer available");
    }
    
    return handleSingleResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'piano', err, id);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('creating', 'piano', err);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('updating', 'piano', err, id);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('reporting', 'piano issue', err, reportData.piano_id);
  }
}

// Event-related functions
export async function getAllEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*, pianos:piano_id(*)')
      .order('date');
    
    if (error) {
      throw error;
    }
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'events', err);
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
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'upcoming events', err);
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
    
    return handleSingleResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'event', err, id);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('creating', 'event', err);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('updating', 'event', err, id);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('reporting', 'event issue', err, reportData.event_id);
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
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'piano media', err, pianoId);
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
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'event media', err, eventId);
  }
}

// User-related functions
export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (err) {
    throw handleDataServiceError('fetching', 'current user', err);
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
    
    return handleSingleResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'user profile', err, userId);
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
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'user piano visits', err, userId);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('creating', 'user piano visit', err, visitData.piano_id);
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
    
    return handleArrayResult(data);
  } catch (err) {
    throw handleDataServiceError('fetching', 'user event attendance', err, userId);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('creating', 'user event attendance', err, attendanceData.event_id);
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
    
    return handleFirstResult(data);
  } catch (err) {
    throw handleDataServiceError('updating', 'user event attendance', err, id);
  }
}

// End of file