import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/layout/Navbar";

const oswald = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train With Intent",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${oswald.className} bg-[#121215] text-neutral-50 min-h-screen flex flex-col`}>
        <WorkoutProvider>
          <Navbar />
          <main className="grow">
            {children}
          </main>
        </WorkoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;