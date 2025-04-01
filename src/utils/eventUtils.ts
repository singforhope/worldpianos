// Utility functions for event handling

import type { Event, CalendarEvent } from './eventTypes';

/**
 * Format events from the database for calendar display
 * @param events Events from the database
 * @returns Formatted events for calendar display
 */
export function formatEventsForCalendar(events: Event[]): CalendarEvent[] {
  return events.map((event) => {
    // Ensure date and time are properly formatted
    let startDate = parseEventDate(event);
    
    return {
      id: event.id,
      title: event.name,
      location: event.location,
      start: startDate.toISOString(),
      description: event.description,
      type: event.type,
      piano_id: event.piano_id,
      status: event.status || 'upcoming',
      // Add color based on event type
      color: getEventColor(event.type),
      // Add text color for better contrast
      textColor: '#ffffff'
    };
  });
}

/**
 * Parse event date from various formats
 * @param event Event object
 * @returns Date object
 */
export function parseEventDate(event: Event): Date {
  try {
    // Fix for PostgreSQL timestamp format: "2024-04-25 00:00:00+00"
    if (typeof event.date === 'string') {
      // Replace space with T for ISO format and remove the timezone part
      const dateStr = event.date.replace(' ', 'T').split('+')[0];
      const date = new Date(dateStr);
      
      // If time is provided, set the hours and minutes
      if (event.time && typeof event.time === 'string') {
        const [hours, minutes] = event.time.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          date.setHours(hours, minutes);
        }
      }
      
      return date;
    } else if (event.date instanceof Date) {
      // If date is already a Date object, use it directly
      const date = new Date(event.date);
      
      // If time is provided, set the hours and minutes
      if (event.time && typeof event.time === 'string') {
        const [hours, minutes] = event.time.split(':').map(Number);
        if (!isNaN(hours) && !isNaN(minutes)) {
          date.setHours(hours, minutes);
        }
      }
      
      return date;
    }
    
    // Fallback to current date
    return new Date();
  } catch (e) {
    console.error(`Error parsing date for event ${event.name}:`, e);
    // Fallback to current date if there's an error
    return new Date();
  }
}

/**
 * Format date for display
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatEventDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

/**
 * Filter events by type (upcoming or past)
 * @param events Events to filter
 * @param type Filter type ('upcoming' or 'past')
 * @returns Filtered events
 */
export function filterEvents(events: CalendarEvent[], type: string): CalendarEvent[] {
  const now = new Date();
  return events.filter((event) => {
    const eventDate = new Date(event.start);
    return type === "upcoming" ? eventDate >= now : eventDate < now;
  });
}

/**
 * Get color for event type
 * @param type Event type
 * @returns Color hex code
 */
export function getEventColor(type: string): string {
  switch (type?.toLowerCase()) {
    case 'festival':
      return '#FF5722'; // Deep Orange
    case 'recital':
      return '#9C27B0'; // Purple
    case 'concert':
      return '#2196F3'; // Blue
    case 'marathon':
      return '#4CAF50'; // Green
    case 'showcase':
      return '#FFC107'; // Amber
    case 'flash mob':
      return '#E91E63'; // Pink
    default:
      return '#607D8B'; // Blue Grey
  }
}