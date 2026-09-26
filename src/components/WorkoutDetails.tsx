"use client";

import Image from "next/image";
import { useState } from "react";

import { Workout } from "@/types/workout";
import { useWorkoutContext } from "@/context/WorkoutContext";

interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const {
    addToPlan,
    addToSaved,
    isInPlan,
    isSaved,
  } = useWorkoutContext();

  const [toastMessage, setToastMessage] = useState("");

  const workoutInPlan = isInPlan(workout.id);
  const workoutSaved = isSaved(workout.id);

  // =========================
  // TOAST FUNCTION
  // =========================
  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // =========================
  // ADD TO TODAY'S PLAN
  // =========================
  const handleAddToPlan = () => {
    if (workoutInPlan) {
      showToast("Already in today's plan");
      return;
    }

    addToPlan(workout);
    showToast("Added to today's plan");
  };

  // =========================
  // SAVE FOR LATER
  // =========================
  const handleSaveWorkout = () => {
    if (workoutSaved) {
      showToast("Workout already saved");
      return;
    }

    addToSaved(workout);
    showToast("Saved for later");
  };

  return (
    <>
      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 md:py-10 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* =========================
              LEFT SIDE - IMAGE
          ========================== */}
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e] sm:min-h-[520px] lg:min-h-[700px]">
            <Image
              src="/assets/workout-details.png"
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* =========================
              RIGHT SIDE - CONTENT
          ========================== */}
          <div className="flex flex-col">
            {/* TITLE */}
            <h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl lg:text-[42px]">
              {workout.name}
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-3 max-w-[700px] text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              {workout.description}
            </p>

            {/* MUSCLE TAGS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#c9ff00] px-4 py-1.5 text-xs font-black uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* =========================
                SPECS PANEL
            ========================== */}
            <div className="mt-8 overflow-hidden rounded-xl border border-[#292e36] bg-[#15181e]">
              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Equipment
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Difficulty
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Sets
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Reps
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Duration
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#292e36] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Calories
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Rating
                </span>

                <span className="text-right text-sm text-gray-200">
                  {workout.rating}
                </span>
              </div>
            </div>

            {/* =========================
                INSTRUCTIONS
            ========================== */}
            <div className="mt-8">
              <h2 className="text-lg font-black uppercase text-white">
                Instructions
              </h2>

              <ol className="mt-5 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="shrink-0 text-gray-500">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* =========================
                BUTTONS
            ========================== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* ADD TO PLAN */}
              <button
                type="button"
                onClick={handleAddToPlan}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#c9ff00] px-6 text-sm font-extrabold text-black transition duration-200 hover:bg-[#b8eb00]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    width="18"
                    height="18"
                    x="3"
                    y="4"
                    rx="2"
                  />
                  <line
                    x1="16"
                    x2="16"
                    y1="2"
                    y2="6"
                  />
                  <line
                    x1="8"
                    x2="8"
                    y1="2"
                    y2="6"
                  />
                  <line
                    x1="3"
                    x2="21"
                    y1="10"
                    y2="10"
                  />
                  <path d="M12 14v4" />
                  <path d="M10 16h4" />
                </svg>

                {workoutInPlan
                  ? "Added to today's plan"
                  : "Add to today's plan"}
              </button>

              {/* SAVE FOR LATER */}
              <button
                type="button"
                onClick={handleSaveWorkout}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#3a414c] bg-transparent px-6 text-sm font-semibold text-gray-200 transition duration-200 hover:border-[#c9ff00] hover:text-[#c9ff00]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>

                {workoutSaved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TOAST NOTIFICATION
      ========================== */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
          <div className="flex items-center gap-3 rounded-lg border border-[#38402f] bg-[#181d14] px-5 py-4 shadow-xl">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c9ff00] text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <p className="text-sm font-medium text-white">
              {toastMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutDetails;