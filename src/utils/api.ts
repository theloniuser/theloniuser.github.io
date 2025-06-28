
import { toast } from "sonner";
import { SongResponse } from "@/types/song";

const API_BASE_URL = "https://legacy-api.kexp.org/v1";
const RECENT_PLAYS_ENDPOINT = "/play";

export async function fetchRecentPlays(limit: number = 20): Promise<SongResponse | null> {
  try {
    const url = `${API_BASE_URL}${RECENT_PLAYS_ENDPOINT}/?limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data: SongResponse = await response.json();
    console.log("API Response:", data);
    
    // Check if we have the expected data structure
    if (data.results && data.results.length > 0) {
      const sampleSong = data.results[0];
      console.log("Sample song:", sampleSong);
      console.log("Sample song release:", sampleSong.release);
      console.log("Sample song releaseevent:", sampleSong.releaseevent);
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching recent plays:", error);
    toast.error("Failed to load recent plays", {
      description: error instanceof Error ? error.message : "Unknown error occurred",
    });
    return null;
  }
}

export function formatReleaseDate(dateString: string | null | undefined): string {
  if (!dateString) return "Unknown";
  
  try {
    const date = new Date(dateString);
    // Check if date is valid before formatting
    if (isNaN(date.getTime())) {
      return "Unknown";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown";
  }
}
