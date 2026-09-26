"use client";

import Image from "next/image";
import Link from "next/link";

import { Workout } from "@/types/workout";

interface PlanWorkoutCardProps {
  workout: Workout;
  type: "plan" | "saved";
  isDone?: boolean;
  onRemove: () => void;
  onMarkDone?: () => void;
}

const PlanWorkoutCard = ({
  workout,
  type,
  isDone = false,
  onRemove,
  onMarkDone,
}: PlanWorkoutCardProps) => {
  return (
    <article
      className={`rounded-2xl border bg-[#15181e] px-4 py-4 transition ${
        isDone
          ? "border-[#4a5b29]"
          : "border-[#252a31]"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* ====================================
            LEFT IMAGE
        ===================================== */}
        <div className="relative h-[145px] w-full shrink-0 overflow-hidden rounded-lg sm:h-[110px] lg:h-[76px] lg:w-[135px]">
          <Image
            src="/assets/workout-boy.png"
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 135px"
            className={`object-cover ${
              isDone ? "opacity-50" : ""
            }`}
          />
        </div>

        {/* ====================================
            WORKOUT INFORMATION
        ===================================== */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`text-lg font-black uppercase leading-tight ${
                isDone
                  ? "text-gray-500 line-through"
                  : "text-white"
              }`}
            >
              {workout.name}
            </h3>

            {isDone && (
              <span className="rounded-full bg-[#23320f] px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-[#c9ff00]">
                Done
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {workout.equipment}
          </p>

          {/* STATS */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-400">
            {/* Duration */}
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9ff00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>

              {workout.duration} min
            </span>

            {/* Calories */}
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#c9ff00"
              >
                <path d="M12.2 2.4c.8 3.1-.7 4.7-2.1 6.1-1.2 1.2-2.2 2.3-1.5 4 .5-1.3 1.4-2.1 2.4-3 .7-.6 1.4-1.3 1.9-2.2 2 1.6 3.5 4 3.5 6.7a4.4 4.4 0 0 1-8.8 0c0-.3 0-.6.1-.9-1.1 1.1-1.7 2.6-1.7 4.1A6 6 0 0 0 18 17c0-5.4-3.2-10.3-5.8-14.6Z" />
              </svg>

              {workout.caloriesBurned} kcal
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c9ff00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15 8.5 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 9 8.5 12 2" />
              </svg>

              {workout.rating}
            </span>
          </div>
        </div>

        {/* ====================================
            RIGHT ACTIONS
        ===================================== */}
        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
          {/* View Details */}
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#3a414c] px-5 text-xs font-medium text-gray-200 transition duration-200 hover:border-[#c9ff00] hover:text-[#c9ff00]"
          >
            View Details
          </Link>

          {/* Mark as Done only on Today's Plan */}
          {type === "plan" && !isDone && (
            <button
              type="button"
              onClick={onMarkDone}
              className="inline-flex min-h-9 items-center justify-center gap-2 rounded-full bg-[#c9ff00] px-5 text-xs font-extrabold text-black transition duration-200 hover:bg-[#b8eb00]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 4 4L19 6" />
              </svg>

              Mark as Done
            </button>
          )}

          {/* Remove X */}
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${workout.name}`}
            className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-500 transition duration-200 hover:bg-[#242830] hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </article>
  );
};

export default PlanWorkoutCard;