"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Workout } from "@/types/workout";

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  completedWorkoutIds: number[];
  isLoaded: boolean;

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider = ({
  children,
}: WorkoutProviderProps) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<
    number[]
  >([]);

  const [isLoaded, setIsLoaded] = useState(false);

  // ==================================================
  // LOAD DATA FROM LOCAL STORAGE
  // ==================================================
  useEffect(() => {
    const loadStoredData = () => {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedCompleted =
        localStorage.getItem("fitlog-completed");

      // Today's Plan
      if (storedPlan) {
        try {
          const parsedPlan: Workout[] =
            JSON.parse(storedPlan);

          setTodaysPlan(parsedPlan);
        } catch (error) {
          console.error(
            "Failed to load today's plan:",
            error
          );

          setTodaysPlan([]);
        }
      }

      // Saved Workouts
      if (storedSaved) {
        try {
          const parsedSaved: Workout[] =
            JSON.parse(storedSaved);

          setSavedWorkouts(parsedSaved);
        } catch (error) {
          console.error(
            "Failed to load saved workouts:",
            error
          );

          setSavedWorkouts([]);
        }
      }

      // Completed Workouts
      if (storedCompleted) {
        try {
          const parsedCompleted: number[] =
            JSON.parse(storedCompleted);

          setCompletedWorkoutIds(
            parsedCompleted
          );
        } catch (error) {
          console.error(
            "Failed to load completed workouts:",
            error
          );

          setCompletedWorkoutIds([]);
        }
      }

      setIsLoaded(true);
    };

    /*
      Running the localStorage state update on the next task
      avoids the React ESLint synchronous setState-in-effect warning.
    */
    const timer = window.setTimeout(
      loadStoredData,
      0
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // ==================================================
  // SAVE TODAY'S PLAN
  // ==================================================
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(todaysPlan)
    );
  }, [todaysPlan, isLoaded]);

  // ==================================================
  // SAVE SAVED WORKOUTS
  // ==================================================
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isLoaded]);

  // ==================================================
  // SAVE COMPLETED WORKOUTS
  // ==================================================
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completedWorkoutIds)
    );
  }, [completedWorkoutIds, isLoaded]);

  // ==================================================
  // ADD TO TODAY'S PLAN
  // ==================================================
  const addToPlan = (workout: Workout) => {
    setTodaysPlan((previousPlan) => {
      const alreadyExists =
        previousPlan.some(
          (item) =>
            item.id === workout.id
        );

      if (alreadyExists) {
        return previousPlan;
      }

      return [
        ...previousPlan,
        workout,
      ];
    });
  };

  // ==================================================
  // REMOVE FROM TODAY'S PLAN
  // ==================================================
  const removeFromPlan = (id: number) => {
    setTodaysPlan((previousPlan) =>
      previousPlan.filter(
        (workout) =>
          workout.id !== id
      )
    );

    setCompletedWorkoutIds(
      (previousCompleted) =>
        previousCompleted.filter(
          (workoutId) =>
            workoutId !== id
        )
    );
  };

  // ==================================================
  // ADD TO SAVED
  // ==================================================
  const addToSaved = (workout: Workout) => {
    setSavedWorkouts(
      (previousSaved) => {
        const alreadyExists =
          previousSaved.some(
            (item) =>
              item.id ===
              workout.id
          );

        if (alreadyExists) {
          return previousSaved;
        }

        return [
          ...previousSaved,
          workout,
        ];
      }
    );
  };

  // ==================================================
  // REMOVE FROM SAVED
  // ==================================================
  const removeFromSaved = (
    id: number
  ) => {
    setSavedWorkouts(
      (previousSaved) =>
        previousSaved.filter(
          (workout) =>
            workout.id !== id
        )
    );
  };

  // ==================================================
  // MARK WORKOUT AS DONE
  // ==================================================
  const markAsDone = (
    id: number
  ) => {
    setCompletedWorkoutIds(
      (previousCompleted) => {
        const alreadyDone =
          previousCompleted.includes(
            id
          );

        if (alreadyDone) {
          return previousCompleted;
        }

        return [
          ...previousCompleted,
          id,
        ];
      }
    );
  };

  // ==================================================
  // CHECK IF WORKOUT IS IN TODAY'S PLAN
  // ==================================================
  const isInPlan = (
    id: number
  ) => {
    return todaysPlan.some(
      (workout) =>
        workout.id === id
    );
  };

  // ==================================================
  // CHECK IF WORKOUT IS SAVED
  // ==================================================
  const isSaved = (
    id: number
  ) => {
    return savedWorkouts.some(
      (workout) =>
        workout.id === id
    );
  };

  // ==================================================
  // CHECK IF WORKOUT IS COMPLETED
  // ==================================================
  const isDone = (
    id: number
  ) => {
    return completedWorkoutIds.includes(
      id
    );
  };

  // ==================================================
  // CONTEXT
  // ==================================================
  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        completedWorkoutIds,
        isLoaded,

        addToPlan,
        removeFromPlan,

        addToSaved,
        removeFromSaved,

        markAsDone,

        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

// ==================================================
// CUSTOM CONTEXT HOOK
// ==================================================
export const useWorkoutContext =
  () => {
    const context =
      useContext(
        WorkoutContext
      );

    if (!context) {
      throw new Error(
        "useWorkoutContext must be used inside WorkoutProvider"
      );
    }

    return context;
  };