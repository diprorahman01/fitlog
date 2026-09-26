import { Workout } from "@/types/workout";

export const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

// Get all workouts
export async function getWorkouts(): Promise<Workout[]> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }

    const data: Workout[] = await response.json();

    return data;
  } catch (error) {
    console.error("Workout API Error:", error);

    return [];
  }
}

// Get a single workout
export async function getWorkoutById(
  id: string | number
): Promise<Workout | null> {
  try {
    // First try the single workout endpoint
    const response = await fetch(`${API_URL}/${id}`);

    if (response.ok) {
      const data: Workout = await response.json();

      return data;
    }

    // Fallback:
    // Fetch all workouts and find the matching ID
    const workouts = await getWorkouts();

    const workout = workouts.find(
      (item) => item.id === Number(id)
    );

    return workout ?? null;
  } catch (error) {
    console.error("Workout Details API Error:", error);

    return null;
  }
}