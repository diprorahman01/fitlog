"use client";

import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/types/workout";

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

        <div className="relative h-[145px] w-full shrink-0 overflow-hidden rounded-lg sm:h-[110px] lg:h-[76px] lg:w-[135px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 135px"
            className={`object-cover ${
              isDone ? "opacity-50" : ""
            }`}
          />
        </div>

 
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
              <span className="rounded-full bg-[#23320f] px-2.5 py-1 text-[9px] font-black uppercase text-[#c9ff00]">
                Done
              </span>
            )}
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {workout.equipment}
          </p>


          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-400">
            <span className="flex items-center gap-1.5">
              <Image
                src="/assets/clock.png"
                alt=""
                width={14}
                height={14}
                className="opacity-70 brightness-0 invert"
              />

              {workout.duration} min
            </span>

            <span className="flex items-center gap-1.5">
              <Image
                src="/assets/fire.png"
                alt=""
                width={14}
                height={14}
                className="opacity-70 brightness-0 invert"
              />

              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1.5">
              <Image
                src="/assets/star.png"
                alt=""
                width={14}
                height={14}
                className="opacity-70 brightness-0 invert"
              />

              {workout.rating}
            </span>
          </div>
        </div>


        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex min-h-9 cursor-pointer items-center justify-center rounded-full border border-[#3a414c] px-5 text-xs font-medium text-gray-200 transition hover:border-[#c9ff00] hover:text-[#c9ff00]"
          >
            View Details
          </Link>

          {type === "plan" && !isDone && (
            <button
              type="button"
              onClick={onMarkDone}
              className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#c9ff00] px-5 text-xs font-extrabold text-black transition hover:bg-[#b8eb00]"
            >
              <Image
                src="/assets/check.png"
                alt=""
                width={13}
                height={13}
              />

              Mark as Done
            </button>
          )}

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${workout.name}`}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-[#242830]"
          >
            <Image
              src="/assets/close.png"
              alt="Remove"
              width={15}
              height={15}
              className="opacity-60 brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PlanWorkoutCard;