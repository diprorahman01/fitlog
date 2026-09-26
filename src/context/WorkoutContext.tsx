"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Workout } from "@/types/workout";

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];

  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;

  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;

  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
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

  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data when website starts
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      try {
        setTodaysPlan(JSON.parse(storedPlan));
      } catch {
        setTodaysPlan([]);
      }
    }

    if (storedSaved) {
      try {
        setSavedWorkouts(JSON.parse(storedSaved));
      } catch {
        setSavedWorkouts([]);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save Today's Plan
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(todaysPlan)
    );
  }, [todaysPlan, isLoaded]);

  // Save Saved Workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts, isLoaded]);

  // Add workout to Today's Plan
  const addToPlan = (workout: Workout) => {
    setTodaysPlan((previousPlan) => {
      const alreadyExists = previousPlan.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return previousPlan;
      }

      return [...previousPlan, workout];
    });
  };

  // Remove workout from Today's Plan
  const removeFromPlan = (id: number) => {
    setTodaysPlan((previousPlan) =>
      previousPlan.filter((workout) => workout.id !== id)
    );
  };

  // Add workout to Saved
  const addToSaved = (workout: Workout) => {
    setSavedWorkouts((previousSaved) => {
      const alreadyExists = previousSaved.some(
        (item) => item.id === workout.id
      );

      if (alreadyExists) {
        return previousSaved;
      }

      return [...previousSaved, workout];
    });
  };

  // Remove workout from Saved
  const removeFromSaved = (id: number) => {
    setSavedWorkouts((previousSaved) =>
      previousSaved.filter((workout) => workout.id !== id)
    );
  };

  // Check whether workout is already in plan
  const isInPlan = (id: number) => {
    return todaysPlan.some((workout) => workout.id === id);
  };

  // Check whether workout is already saved
  const isSaved = (id: number) => {
    return savedWorkouts.some((workout) => workout.id === id);
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkoutContext must be used inside WorkoutProvider"
    );
  }

  return context;
};