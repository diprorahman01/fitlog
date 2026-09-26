"use client";

import { useMemo, useState } from "react";

import EmptyPlan from "@/components/EmptyPlan";
import PlanTabs from "@/components/PlanTabs";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import StatsCard from "@/components/StatsCard";

import { useWorkoutContext } from "@/context/WorkoutContext";

type ActiveTab = "plan" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

export default function MyPlanPage() {
  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isDone,
    isLoaded,
  } = useWorkoutContext();

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  // ========================================
  // LIVE SUMMARY METRICS
  // ========================================
  const totalExercises = todaysPlan.length;

  const totalMinutes = todaysPlan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = todaysPlan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  // ========================================
  // ACTIVE TAB WORKOUTS
  // ========================================
  const activeWorkouts =
    activeTab === "plan"
      ? todaysPlan
      : savedWorkouts;

  // ========================================
  // SORTING
  // ========================================
  const sortedWorkouts = useMemo(() => {
    const workouts = [...activeWorkouts];

    if (sortBy === "duration") {
      return workouts.sort(
        (a, b) => a.duration - b.duration
      );
    }

    if (sortBy === "calories") {
      return workouts.sort(
        (a, b) =>
          b.caloriesBurned -
          a.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      return workouts.sort(
        (a, b) => b.rating - a.rating
      );
    }

    return workouts;
  }, [activeWorkouts, sortBy]);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-14">
      {/* ========================================
          HEADER
      ======================================== */}
      <div>
        <h1 className="text-3xl font-black uppercase leading-none text-white sm:text-4xl">
          My Plan
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* ========================================
          SUMMARY BOX
      ======================================== */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e]">
        <div className="grid grid-cols-1 divide-y divide-[#252a31] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <StatsCard
            label="Exercises"
            value={totalExercises}
            highlight
          />

          <StatsCard
            label="Minutes"
            value={totalMinutes}
          />

          <StatsCard
            label="Calories"
            value={totalCalories}
          />
        </div>
      </div>

      {/* ========================================
          TABS + SORT
      ======================================== */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PlanTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as SortOption
              )
            }
            className="rounded-lg border border-[#2b3038] bg-[#15181e] px-4 py-2.5 text-xs text-gray-200 outline-none transition duration-200 focus:border-[#c9ff00]"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>
      </div>

      {/* ========================================
          CONTENT AREA
      ======================================== */}
      <div className="mt-6">
        {!isLoaded ? (
          // LOADING
          <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37]">
            <p className="text-sm text-gray-400">
              Loading workouts...
            </p>
          </div>
        ) : sortedWorkouts.length === 0 ? (
          // EMPTY
          <EmptyPlan />
        ) : (
          // WORKOUT LIST
          <div className="space-y-4">
            {sortedWorkouts.map(
              (workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  type={activeTab}
                  isDone={
                    activeTab === "plan"
                      ? isDone(workout.id)
                      : false
                  }
                  onMarkDone={
                    activeTab === "plan"
                      ? () =>
                          markAsDone(
                            workout.id
                          )
                      : undefined
                  }
                  onRemove={() => {
                    if (
                      activeTab === "plan"
                    ) {
                      removeFromPlan(
                        workout.id
                      );
                    } else {
                      removeFromSaved(
                        workout.id
                      );
                    }
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}