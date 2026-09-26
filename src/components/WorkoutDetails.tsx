"use client";

import Image from "next/image";
import { useState } from "react";

import type { Workout } from "@/types/workout";
import { useWorkoutContext } from "@/context/WorkoutContext";

interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  const {
    todaysPlan,
    addToPlan,
    addToSaved,
    isInPlan,
    isSaved,
  } = useWorkoutContext();

  const [toastMessage, setToastMessage] = useState("");

  const workoutInPlan = isInPlan(workout.id);
  const workoutSaved = isSaved(workout.id);
  const planIsFull = todaysPlan.length >= 5;

  const showToast = (message: string) => {
    setToastMessage(message);

    window.setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const handleAddToPlan = () => {
    if (workoutInPlan) {
      showToast("Already in today's plan");
      return;
    }

    if (planIsFull) {
      showToast("Today's plan can contain a maximum of 5 workouts");
      return;
    }

    const added = addToPlan(workout);

    if (added) {
      showToast("Added to today's plan");
    }
  };

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
          {/* IMAGE */}
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e] sm:min-h-[520px] lg:min-h-[700px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-black uppercase text-white sm:text-4xl lg:text-[42px]">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400 sm:text-base">
              {workout.description}
            </p>

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

            {/* SPECS */}
            <div className="mt-8 overflow-hidden rounded-xl border border-[#292e36] bg-[#15181e]">
              {[
                ["Equipment", workout.equipment],
                ["Difficulty", workout.difficulty],
                ["Sets", workout.sets],
                ["Reps", workout.reps],
                ["Duration", `${workout.duration} min`],
                ["Calories", `${workout.caloriesBurned} kcal`],
                ["Rating", workout.rating],
              ].map(([label, value], index, array) => (
                <div
                  key={label}
                  className={`flex items-center justify-between gap-4 px-5 py-4 ${
                    index < array.length - 1
                      ? "border-b border-[#292e36]"
                      : ""
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {label}
                  </span>

                  <span className="text-right text-sm text-gray-200">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* INSTRUCTIONS */}
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
                    <span className="text-gray-500">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={workoutInPlan || planIsFull}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-extrabold transition ${
                  workoutInPlan || planIsFull
                    ? "cursor-not-allowed bg-[#667a16] text-black/60"
                    : "bg-[#c9ff00] text-black hover:bg-[#b8eb00]"
                }`}
              >
                <Image
                  src="/assets/calendar-plus.png"
                  alt=""
                  width={18}
                  height={18}
                />

                {workoutInPlan
                  ? "Added to today's plan"
                  : planIsFull
                    ? "Plan is full"
                    : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={handleSaveWorkout}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[#3a414c] px-6 text-sm font-semibold text-gray-200 transition hover:border-[#c9ff00] hover:text-[#c9ff00]"
              >
                <Image
                  src="/assets/bookmark.png"
                  alt=""
                  width={17}
                  height={17}
                  className="brightness-0 invert"
                />

                {workoutSaved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 px-4">
          <div className="flex items-center gap-3 rounded-xl border border-[#38402f] bg-[#181d14] px-5 py-4 shadow-2xl">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9ff00]">
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
};

export default WorkoutDetails;