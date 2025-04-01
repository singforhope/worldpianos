// Event type definitions for the application

// Base event type from the database
export interface Event {
  id: string;
  name: string;
  location: string;
  coordinates: number[]; // [longitude, latitude]
  date: Date | string;
  time: string;
  description: string;
  type: string;
  piano_id: string;
  status?: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  created_by?: string;
  pianos?: any; // Piano object from join
}

// Formatted event for calendar display
export interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  start: string;
  description: string;
  type: string;
  piano_id: string;
  status: string;
  color: string;
  textColor: string;
}