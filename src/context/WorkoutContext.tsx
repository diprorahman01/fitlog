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

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
}

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

interface WorkoutProviderProps {
  children: ReactNode;
}

export const WorkoutProvider = ({
  children,
}: WorkoutProviderProps) => {
  const [todaysPlan, setTodaysPlan] =
    useState<Workout[]>([]);

  const [savedWorkouts, setSavedWorkouts] =
    useState<Workout[]>([]);

  const [
    completedWorkoutIds,
    setCompletedWorkoutIds,
  ] = useState<number[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  // ==========================================
  // LOAD LOCAL STORAGE
  // ==========================================
  useEffect(() => {
    const loadStoredData = () => {
      const storedPlan =
        localStorage.getItem("fitlog-plan");

      const storedSaved =
        localStorage.getItem("fitlog-saved");

      const storedCompleted =
        localStorage.getItem(
          "fitlog-completed"
        );

      if (storedPlan) {
        try {
          setTodaysPlan(
            JSON.parse(storedPlan)
          );
        } catch {
          setTodaysPlan([]);
        }
      }

      if (storedSaved) {
        try {
          setSavedWorkouts(
            JSON.parse(storedSaved)
          );
        } catch {
          setSavedWorkouts([]);
        }
      }

      if (storedCompleted) {
        try {
          setCompletedWorkoutIds(
            JSON.parse(storedCompleted)
          );
        } catch {
          setCompletedWorkoutIds([]);
        }
      }

      setIsLoaded(true);
    };

    const timer =
      window.setTimeout(
        loadStoredData,
        0
      );

    return () =>
      window.clearTimeout(timer);
  }, []);

  // ==========================================
  // SAVE PLAN
  // ==========================================
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(todaysPlan)
    );
  }, [todaysPlan, isLoaded]);

  // ==========================================
  // SAVE SAVED WORKOUTS
  // ==========================================
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isLoaded]);

  // ==========================================
  // SAVE COMPLETED WORKOUTS
  // ==========================================
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(
        completedWorkoutIds
      )
    );
  }, [
    completedWorkoutIds,
    isLoaded,
  ]);

  // ==========================================
  // ADD TO TODAY'S PLAN
  // Maximum 5 workouts
  // Returns true if successful
  // ==========================================
  const addToPlan = (
    workout: Workout
  ): boolean => {
    const alreadyExists =
      todaysPlan.some(
        (item) =>
          item.id === workout.id
      );

    if (alreadyExists) {
      return false;
    }

    if (todaysPlan.length >= 5) {
      return false;
    }

    setTodaysPlan(
      (previousPlan) => [
        ...previousPlan,
        workout,
      ]
    );

    return true;
  };

  // ==========================================
  // REMOVE FROM PLAN
  // ==========================================
  const removeFromPlan = (
    id: number
  ) => {
    setTodaysPlan(
      (previousPlan) =>
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

  // ==========================================
  // ADD TO SAVED
  // ==========================================
  const addToSaved = (
    workout: Workout
  ) => {
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

  // ==========================================
  // REMOVE FROM SAVED
  // ==========================================
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

  // ==========================================
  // MARK AS DONE
  // ==========================================
  const markAsDone = (
    id: number
  ) => {
    setCompletedWorkoutIds(
      (previousCompleted) => {
        if (
          previousCompleted.includes(
            id
          )
        ) {
          return previousCompleted;
        }

        return [
          ...previousCompleted,
          id,
        ];
      }
    );
  };

  // ==========================================
  // CHECK FUNCTIONS
  // ==========================================
  const isInPlan = (
    id: number
  ) => {
    return todaysPlan.some(
      (workout) =>
        workout.id === id
    );
  };

  const isSaved = (
    id: number
  ) => {
    return savedWorkouts.some(
      (workout) =>
        workout.id === id
    );
  };

  const isDone = (
    id: number
  ) => {
    return completedWorkoutIds.includes(
      id
    );
  };

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