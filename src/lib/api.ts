import type { Workout } from "@/types/workout";

export const API_URL =
  "https://api.abcz.workers.dev/api/fitlog";

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

export async function getWorkoutById(
  id: string | number
): Promise<Workout | null> {
  try {
    const response = await fetch(
      `${API_URL}/${id}`
    );

    if (!response.ok) {
      return null;
    }

    const data: Workout =
      await response.json();

    return data;
  } catch (error) {
    console.error(
      "Workout Details API Error:",
      error
    );

    return null;
  }
}