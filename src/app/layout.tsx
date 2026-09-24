import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WorkoutProvider } from "@/context/WorkoutContext";
import Navbar from "@/components/layout/Navbar"; // Ensure this path is correct
import Footer from "@/components/layout/Footer";
import { Oswald } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald', // Define a custom CSS variable
});

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
    <html lang="en" data-theme= "light">
      
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