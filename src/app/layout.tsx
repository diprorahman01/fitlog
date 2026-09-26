import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { WorkoutProvider } from "@/context/WorkoutContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description:
    "Track workouts, build your daily plan and save exercises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#0b0d10] text-white"
      >
        <WorkoutProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
              {children}
            </main>

            <Footer />
          </div>
        </WorkoutProvider>
      </body>
    </html>
  );
}