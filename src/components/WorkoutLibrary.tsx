"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";
import { API_URL } from "@/lib/api";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error("Workout API Error:", error);
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const filteredWorkouts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return workouts;
    }

    return workouts.filter((workout) => {
      const matchesName = workout.name
        .toLowerCase()
        .includes(query);

      const matchesTag = workout.muscleGroups.some((muscle) =>
        muscle.toLowerCase().includes(query)
      );

      return matchesName || matchesTag;
    });
  }, [workouts, searchTerm]);

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase text-white sm:text-3xl">
            The Library
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full sm:max-w-[300px]">
          <Image
            src="/assets/search.png"
            alt=""
            width={17}
            height={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-50 brightness-0 invert"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search name or muscle..."
            className="w-full rounded-lg border border-[#2b3038] bg-[#15181e] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#c9ff00]"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-[#252a31] bg-[#15181e]"
            >
              <div className="h-[210px] animate-pulse bg-[#20242b]" />

              <div className="space-y-3 p-4">
                <div className="h-5 w-1/3 animate-pulse rounded bg-[#20242b]" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-[#20242b]" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[#20242b]" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredWorkouts.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37]">
          <div className="text-center">
            <h3 className="text-lg font-black uppercase text-white">
              No Workouts Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another workout name or muscle group.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;