"use client";

import {
  useMemo,
  useState,
} from "react";

import EmptyPlan from "@/components/EmptyPlan";
import PlanTabs from "@/components/PlanTabs";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import StatsCard from "@/components/StatsCard";

import { useWorkoutContext } from "@/context/WorkoutContext";

type ActiveTab =
  | "plan"
  | "saved";

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

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    toastMessage,
    setToastMessage,
  ] = useState("");

  // ======================================
  // TOAST
  // ======================================
  const showToast = (
    message: string
  ) => {
    setToastMessage(message);

    window.setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // ======================================
  // METRICS
  // ======================================
  const totalExercises =
    todaysPlan.length;

  const totalMinutes =
    todaysPlan.reduce(
      (total, workout) =>
        total +
        workout.duration,
      0
    );

  const totalCalories =
    todaysPlan.reduce(
      (total, workout) =>
        total +
        workout.caloriesBurned,
      0
    );

  // ======================================
  // CURRENT TAB
  // ======================================
  const activeWorkouts =
    activeTab === "plan"
      ? todaysPlan
      : savedWorkouts;

  // ======================================
  // SEARCH + SORT
  // ======================================
  const visibleWorkouts =
    useMemo(() => {
      const query =
        searchTerm
          .trim()
          .toLowerCase();

      let workouts =
        [...activeWorkouts];

      if (query) {
        workouts =
          workouts.filter(
            (workout) => {
              const matchesName =
                workout.name
                  .toLowerCase()
                  .includes(query);

              const matchesTag =
                workout.muscleGroups.some(
                  (muscle) =>
                    muscle
                      .toLowerCase()
                      .includes(query)
                );

              return (
                matchesName ||
                matchesTag
              );
            }
          );
      }

      if (
        sortBy === "duration"
      ) {
        workouts.sort(
          (a, b) =>
            a.duration -
            b.duration
        );
      }

      if (
        sortBy === "calories"
      ) {
        workouts.sort(
          (a, b) =>
            b.caloriesBurned -
            a.caloriesBurned
        );
      }

      if (
        sortBy === "rating"
      ) {
        workouts.sort(
          (a, b) =>
            b.rating -
            a.rating
        );
      }

      return workouts;
    }, [
      activeWorkouts,
      searchTerm,
      sortBy,
    ]);

  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-14">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-black uppercase leading-none text-white sm:text-4xl">
            My Plan
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* METRICS */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e]">
          <div className="grid grid-cols-1 divide-y divide-[#252a31] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <StatsCard
              label="Exercises"
              value={
                totalExercises
              }
              highlight
            />

            <StatsCard
              label="Minutes"
              value={
                totalMinutes
              }
            />

            <StatsCard
              label="Calories"
              value={
                totalCalories
              }
            />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PlanTabs
              activeTab={
                activeTab
              }
              onChange={(
                tab
              ) => {
                setActiveTab(
                  tab
                );

                setSearchTerm("");
              }}
            />

            {/* SORT */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">
                Sort By
              </span>

              <div className="relative">
                <select
                  value={
                    sortBy
                  }
                  onChange={(
                    event
                  ) =>
                    setSortBy(
                      event
                        .target
                        .value as SortOption
                    )
                  }
                  className="min-w-[115px] cursor-pointer appearance-none rounded-lg border border-[#2b3038] bg-[#15181e] py-2.5 pl-4 pr-10 text-xs text-gray-200 outline-none focus:border-[#c9ff00]"
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

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className="relative w-full sm:max-w-[320px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              value={
                searchTerm
              }
              onChange={(
                event
              ) =>
                setSearchTerm(
                  event.target
                    .value
                )
              }
              placeholder="Search name or tag..."
              className="w-full rounded-lg border border-[#2b3038] bg-[#15181e] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#c9ff00]"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="mt-6">
          {!isLoaded ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37]">
              <p className="text-sm text-gray-400">
                Loading workouts...
              </p>
            </div>
          ) : activeWorkouts.length ===
            0 ? (
            <EmptyPlan />
          ) : visibleWorkouts.length ===
            0 ? (
            <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37]">
              <div className="text-center">
                <h3 className="text-lg font-black uppercase text-white">
                  No Matches
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another workout name or muscle tag.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleWorkouts.map(
                (workout) => (
                  <PlanWorkoutCard
                    key={
                      workout.id
                    }
                    workout={
                      workout
                    }
                    type={
                      activeTab
                    }
                    isDone={
                      activeTab ===
                      "plan"
                        ? isDone(
                            workout.id
                          )
                        : false
                    }
                    onMarkDone={
                      activeTab ===
                      "plan"
                        ? () => {
                            markAsDone(
                              workout.id
                            );

                            showToast(
                              `${workout.name} marked as done`
                            );
                          }
                        : undefined
                    }
                    onRemove={() => {
                      if (
                        activeTab ===
                        "plan"
                      ) {
                        removeFromPlan(
                          workout.id
                        );

                        showToast(
                          `${workout.name} removed from today's plan`
                        );
                      } else {
                        removeFromSaved(
                          workout.id
                        );

                        showToast(
                          `${workout.name} removed from saved workouts`
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

      {/* TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#38402f] bg-[#181d14] px-5 py-4 shadow-2xl">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9ff00] text-black">
              ✓
            </span>

            <p className="text-sm font-medium text-white">
              {toastMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
}