import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-[#252a31] bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#c9ff00]/50"
    >
      {/* ==============================
          WORKOUT IMAGE
      =============================== */}
      <div className="relative h-[190px] w-full overflow-hidden sm:h-[200px] lg:h-[210px]">
        <Image
          src="/assets/workout-boy.png"
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      {/* ==============================
          CARD CONTENT
      =============================== */}
      <div className="p-4">
        {/* Muscle groups */}
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#c9ff00] px-2.5 py-1 text-[10px] font-black uppercase leading-none text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout title */}
        <h3 className="text-base font-black uppercase leading-tight text-white transition group-hover:text-[#c9ff00]">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1.5 text-xs text-gray-500">
          {workout.equipment}
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-[#252a31]" />

        {/* Workout information */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-500">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>

            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.2 2.4c.8 3.1-.7 4.7-2.1 6.1-1.2 1.2-2.2 2.3-1.5 4 .5-1.3 1.4-2.1 2.4-3 .7-.6 1.4-1.3 1.9-2.2 2 1.6 3.5 4 3.5 6.7a4.4 4.4 0 0 1-8.8 0c0-.3 0-.6.1-.9-1.1 1.1-1.7 2.6-1.7 4.1A6 6 0 0 0 18 17c0-5.4-3.2-10.3-5.8-14.6Z" />
            </svg>

            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15 8.5 22 9.3 17 14.2 18.2 21 12 17.7 5.8 21 7 14.2 2 9.3 9 8.5 12 2" />
            </svg>

            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;