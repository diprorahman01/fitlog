import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "@/lib/api";

const WorkoutLibrary = async () => {
  const workouts = await getWorkouts();

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-[1440px] scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      {/* SECTION HEADER */}
      <div className="mb-7">
        <h2 className="text-2xl font-black uppercase leading-none text-white sm:text-3xl">
          The Library
        </h2>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* EMPTY / ERROR STATE */}
      {workouts.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-[#252a31] bg-[#15181e]">
          <div className="text-center">
            <h3 className="text-lg font-bold text-white">
              No workouts found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Please try again later.
            </p>
          </div>
        </div>
      ) : (
        /* WORKOUT GRID */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;