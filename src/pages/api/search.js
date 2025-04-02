// Search API endpoint
import { getAllPianos, getAllEvents } from "../../utils/dataService";

export async function GET({ url }) {
  try {
    // Extract query parameters
    const searchParams = new URL(url).searchParams;
    const query = searchParams.get("q") || "";
    const type = searchParams.get("type") || "pianos";
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    
    if (query.length < 2) {
      return new Response(
        JSON.stringify({ error: "Search query must be at least 2 characters" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    let results = [];
    
    // Perform search based on type
    if (type === "pianos") {
      const pianos = await getAllPianos();
      results = pianos.filter(
        (piano) =>
          piano.name?.toLowerCase().includes(query.toLowerCase()) ||
          piano.make?.toLowerCase().includes(query.toLowerCase()) ||
          piano.model?.toLowerCase().includes(query.toLowerCase()) ||
          piano.location?.toLowerCase().includes(query.toLowerCase()) ||
          piano.city?.toLowerCase().includes(query.toLowerCase()) ||
          piano.country?.toLowerCase().includes(query.toLowerCase())
      );
    } else if (type === "events") {
      const events = await getAllEvents();
      results = events.filter(
        (event) =>
          event.name?.toLowerCase().includes(query.toLowerCase()) ||
          event.location?.toLowerCase().includes(query.toLowerCase()) ||
          event.description?.toLowerCase().includes(query.toLowerCase()) ||
          event.venue?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply limit
    const limitedResults = results.slice(0, limit);
    
    // Return results
    return new Response(
      JSON.stringify(limitedResults),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Search API error:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to perform search" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
} 