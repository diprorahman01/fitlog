import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Track workouts, build your daily plan and save exercises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b0d10] text-white">
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}