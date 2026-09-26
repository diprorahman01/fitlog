"use client";

import Image from "next/image";
import {
  Suspense,
  useMemo,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import EmptyPlan from "@/components/EmptyPlan";
import MyPlanControls from "@/components/MyPlanControls";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import StatsCard from "@/components/StatsCard";

import { useWorkoutContext } from "@/context/WorkoutContext";

type ActiveTab = "plan" | "saved";

type SortOption =
  | "duration"
  | "calories"
  | "rating";

// ==========================================
// MAIN MY PLAN CONTENT
// ==========================================
function MyPlanContent() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const {
    todaysPlan,
    savedWorkouts,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    isDone,
    isLoaded,
  } = useWorkoutContext();

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    toastMessage,
    setToastMessage,
  ] = useState("");

  // ======================================
  // ACTIVE TAB
  // ======================================
  const activeTab: ActiveTab =
    searchParams.get("tab") === "saved"
      ? "saved"
      : "plan";

  // ======================================
  // CHANGE TAB
  // ======================================
  const changeTab = (
    tab: ActiveTab
  ) => {
    setSearchTerm("");

    router.push(
      `/my-plan?tab=${tab}`
    );
  };

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
  // SUMMARY
  // ======================================
  const exercises =
    todaysPlan.length;

  const minutes =
    todaysPlan.reduce(
      (total, workout) =>
        total + workout.duration,
      0
    );

  const calories =
    todaysPlan.reduce(
      (total, workout) =>
        total +
        workout.caloriesBurned,
      0
    );

  // ======================================
  // ACTIVE TAB DATA
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

      let workouts = [
        ...activeWorkouts,
      ];

      // Search
      if (query) {
        workouts =
          workouts.filter(
            (workout) => {
              const nameMatch =
                workout.name
                  .toLowerCase()
                  .includes(query);

              const tagMatch =
                workout.muscleGroups.some(
                  (muscle) =>
                    muscle
                      .toLowerCase()
                      .includes(query)
                );

              return (
                nameMatch ||
                tagMatch
              );
            }
          );
      }

      // Sort duration
      if (
        sortBy === "duration"
      ) {
        workouts.sort(
          (a, b) =>
            a.duration -
            b.duration
        );
      }

      // Sort calories
      if (
        sortBy === "calories"
      ) {
        workouts.sort(
          (a, b) =>
            b.caloriesBurned -
            a.caloriesBurned
        );
      }

      // Sort rating
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
          <h1 className="text-3xl font-black uppercase text-white sm:text-4xl">
            My Plan
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Cap of five lifts for
            today. Finish them, then
            load more.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e]">
          <div className="grid grid-cols-1 divide-y divide-[#252a31] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <StatsCard
              label="Exercises"
              value={exercises}
              highlight
            />

            <StatsCard
              label="Minutes"
              value={minutes}
            />

            <StatsCard
              label="Calories"
              value={calories}
            />
          </div>
        </div>

        {/* CONTROLS */}
        <MyPlanControls
          activeTab={activeTab}
          sortBy={sortBy}
          searchTerm={
            searchTerm
          }
          onTabChange={
            changeTab
          }
          onSortChange={
            setSortBy
          }
          onSearchChange={
            setSearchTerm
          }
        />

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
            <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37] px-4 text-center">
              <div>
                <h3 className="text-lg font-black uppercase text-white">
                  No Matches
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another workout
                  name or muscle tag.
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
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9ff00]">
              <Image
                src="/assets/check.png"
                alt=""
                width={14}
                height={14}
              />
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

// ==========================================
// PAGE
// Suspense is required for useSearchParams()
// ==========================================
export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[500px] w-full max-w-[1440px] items-center justify-center px-4">
          <p className="text-sm text-gray-400">
            Loading workouts...
          </p>
        </div>
      }
    >
      <MyPlanContent />
    </Suspense>
  );
}