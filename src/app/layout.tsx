import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/layout/Navbar"; // Ensure this path is correct
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitLog",
  description: "Train With Intent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WorkoutProvider>
          <Navbar />
          {children}
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}