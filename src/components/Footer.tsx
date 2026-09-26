import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[#23272f] bg-[#0b0d10]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        {/* =========================
            LEFT - BRAND
        ========================== */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain"
          />

          <span className="text-sm font-extrabold uppercase tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* =========================
            RIGHT - COPYRIGHT
        ========================== */}
        <p className="text-xs leading-5 text-gray-500 sm:text-sm md:text-right">
          © 2026 FitLog — Workout Library.{" "}
          <span className="italic text-gray-400">
            Train hard, log honest.
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;