"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useWorkoutContext } from "@/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    todaysPlan,
    savedWorkouts,
  } = useWorkoutContext();

  const planCount = todaysPlan.length;
  const savedCount = savedWorkouts.length;

  const isWorkoutActive =
    pathname === "/" ||
    pathname.startsWith("/workout");

  const isPlanActive =
    pathname.startsWith("/my-plan");

  return (
    <header className="w-full border-b border-[#23272f] bg-[#0b0d10]">
      <nav className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">

        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={34}
            height={34}
            className="h-[34px] w-[34px] object-contain"
            priority
          />

          <span className="text-xl font-extrabold tracking-wide text-white sm:text-2xl">
            FITLOG
          </span>
        </Link>

        {/* DESKTOP CENTER LINKS */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              isWorkoutActive
                ? "bg-[#18280d] text-[#c9ff00]"
                : "text-gray-400 hover:bg-[#15181d] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan?tab=plan"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              isPlanActive
                ? "bg-[#18280d] text-[#c9ff00]"
                : "text-gray-400 hover:bg-[#15181d] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>


        <div className="hidden items-center gap-7 md:flex">

          <Link
            href="/my-plan?tab=plan"
            className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
          >
            <span>Plan</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c9ff00] px-1.5 text-xs font-bold text-black">
              {planCount}
            </span>
          </Link>


          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
          >
            <span>Saved</span>

            <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-gray-600 px-1.5 text-xs font-semibold text-gray-300">
              {savedCount}
            </span>
          </Link>
        </div>


        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2b3038] text-white transition hover:bg-[#171a20] md:hidden"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#23272f] bg-[#0b0d10] px-4 pb-5 pt-4 md:hidden">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                isWorkoutActive
                  ? "bg-[#18280d] text-[#c9ff00]"
                  : "text-gray-300 hover:bg-[#15181d]"
              }`}
            >
              Workouts
            </Link>

            <Link
              href="/my-plan?tab=plan"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                isPlanActive
                  ? "bg-[#18280d] text-[#c9ff00]"
                  : "text-gray-300 hover:bg-[#15181d]"
              }`}
            >
              My Plan
            </Link>

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-[#23272f] pt-4">
              <Link
                href="/my-plan?tab=plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-[#13161b] px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Plan
                </span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c9ff00] px-1.5 text-xs font-bold text-black">
                  {planCount}
                </span>
              </Link>

              <Link
                href="/my-plan?tab=saved"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg bg-[#13161b] px-4 py-3"
              >
                <span className="text-sm text-gray-300">
                  Saved
                </span>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-full border border-gray-600 px-1.5 text-xs text-gray-300">
                  {savedCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;