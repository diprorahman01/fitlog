import Link from "next/link";

const EmptyPlan = () => {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-[#2a2f37] px-5 py-10 text-center sm:min-h-[300px] lg:min-h-[320px]">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-black uppercase tracking-wide text-white sm:text-2xl">
          Nothing Here Yet
        </h3>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          Browse the library and add a lift to get today moving.
        </p>

        <Link
          href="/#library"
          className="mt-6 inline-flex min-h-10 items-center justify-center rounded-full bg-[#c9ff00] px-6 text-xs font-extrabold text-black transition duration-200 hover:bg-[#b8eb00]"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
};

export default EmptyPlan;