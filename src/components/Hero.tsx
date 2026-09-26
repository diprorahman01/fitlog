import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#252a31] bg-[#15181e]">
        <div className="grid min-h-[320px] grid-cols-1 items-center gap-8 px-6 py-10 sm:px-8 md:min-h-[360px] md:grid-cols-2 md:px-10 lg:min-h-[400px] lg:px-14">
          
          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="z-10 max-w-[650px]">
            {/* Small label */}
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.12em] text-[#c9ff00] sm:text-sm">
              Workout Library
            </p>

            {/* Main heading */}
            <h1 className="max-w-[620px] text-[38px] font-black uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-[48px] md:text-[52px] lg:text-[60px]">
              Train With Intent. Log Every Set.
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-[620px] text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Browse button */}
            <Link
              href="#workouts"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#c9ff00] px-6 text-xs font-extrabold uppercase tracking-wide text-black transition duration-200 hover:bg-[#b8eb00] sm:text-sm"
            >
              Browse Workouts
            </Link>
          </div>

          {/* =========================
              RIGHT IMAGE
          ========================== */}
          <div className="relative flex items-center justify-center md:justify-end">
            <div className="relative h-[230px] w-[230px] sm:h-[280px] sm:w-[280px] md:h-[300px] md:w-[300px] lg:h-[330px] lg:w-[330px]">
              <Image
                src="/assets/banner.png"
                alt="FitLog workout illustration"
                fill
                priority
                sizes="(max-width: 768px) 230px, (max-width: 1024px) 300px, 330px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;