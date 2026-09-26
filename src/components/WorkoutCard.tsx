import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const getImagePosition = (id: number) => {
    switch (id) {
      case 1:
        return "center 35%";
      case 2:
        return "center 30%";
      case 3:
        return "center 15%";
      case 4:
        return "center 30%";
      case 5:
        return "center 25%";
      case 6:
        return "center 25%";
      case 7:
        return "center 35%";
      case 8:
        return "center 25%";
      case 9:
        return "center 30%";
      case 10:
        return "center 25%";
      case 11:
        return "center 15%";
      case 12:
        return "center 15%";
      default:
        return "center center";
    }
  };

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-xl border border-[#252a31] bg-[#15181e] transition duration-300 hover:-translate-y-1 hover:border-[#c9ff00]/50"
    >

      <div className="relative aspect-[2/1] w-full overflow-hidden bg-[#101216]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          style={{
            objectPosition: getImagePosition(workout.id),
          }}
        />
      </div>

      <div className="p-4">

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

        <h3 className="text-base font-black uppercase leading-tight text-white transition group-hover:text-[#c9ff00]">
          {workout.name}
        </h3>

        <p className="mt-1.5 text-xs text-gray-500">
          {workout.equipment}
        </p>

        <div className="my-4 h-px bg-[#252a31]" />


        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <Image
              src="/assets/clock.png"
              alt=""
              width={13}
              height={13}
              className="opacity-60 brightness-0 invert"
            />

            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Image
              src="/assets/fire.png"
              alt=""
              width={13}
              height={13}
              className="opacity-60 brightness-0 invert"
            />

            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Image
              src="/assets/star.png"
              alt=""
              width={13}
              height={13}
              className="opacity-60 brightness-0 invert"
            />

            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;