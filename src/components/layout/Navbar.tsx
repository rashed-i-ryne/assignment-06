"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, savedWorkouts } = useWorkout();

  return (
    <div className="navbar sticky top-0 z-50 bg-[#0a0a0a] border-b border-neutral-800 px-2 sm:px-4 md:px-8 h-20">
      
      <div className="navbar-start  w-1/3 lg:w-1/4">
        {/* Mobile Hamburger Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost text-white px-0 pl-2 sm:px-2 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-4 z-1 p-3 shadow bg-[#111] border border-neutral-800 rounded-box w-52 gap-2">
            <li>
              <Link
                href="/"
                className={`rounded-full px-4 py-3 font-medium transition-colors ${
                  pathname === '/' 
                    ? 'bg-[#1a2205] text-[#ccff00]' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={`rounded-full px-4 py-3 font-medium transition-colors ${
                  pathname === '/my-plan' 
                    ? 'bg-[#1a2205] text-[#ccff00]' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Logo */}
        <Link 
          href="/" 
          className="hidden lg:flex items-center bg-transparent hover:opacity-80 transition-opacity text-white text-3xl font-black gap-5 px-0"
        >
          <Image 
            src="/logo.png" 
            alt="Brand Logo" 
            width={44} 
            height={44} 
            className="object-contain"
            priority
          />
          FITLOG
        </Link>
      </div>

      {/* CENTER: Logo (Mobile) | Navigation Links (Desktop) */}
      <div className="navbar-center w-1/3 lg:w-1/2 flex justify-center">
        {/* Mobile Logo */}
        <Link 
          href="/" 
          className="flex lg:hidden items-center bg-transparent hover:opacity-80 transition-opacity text-white text-xl font-black gap-2 px-0"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8">
            <Image 
              src="/logo.png" 
              alt="Brand Logo" 
              fill
              sizes="(max-width: 640px) 28px, 32px"
              className="object-contain"
              priority
            />
          </div>
          FITLOG
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="menu menu-horizontal hidden lg:flex px-1 gap-2">
          <li>
            <Link
              href="/"
              className={`rounded-full px-5 py-2 font-medium transition-colors ${
                pathname === '/' 
                  ? 'bg-[#1a2205] text-[#ccff00] focus:bg-[#1a2205] focus:text-[#ccff00]' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/my-plan"
              className={`rounded-full px-5 py-2 font-medium transition-colors ${
                pathname === '/my-plan' 
                  ? 'bg-[#1a2205] text-[#ccff00] focus:bg-[#1a2205] focus:text-[#ccff00]' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT: Badges (Responsive) */}
      <div className="navbar-end w-1/3 lg:w-1/4 flex justify-end gap-2 lg:gap-6 pr-1 sm:pr-2 flex-nowrap">
        <Link 
          href="/my-plan" 
          className="flex rounded-full items-center gap-1.5 lg:gap-2 text-sm text-white font-medium hover:opacity-80 transition-opacity"
        >
          <span className="hidden lg:inline-block">Plan</span>
          <div className="badge bg-[#ccff00] text-black border-none font-bold w-6 h-6 sm:w-7 sm:h-7 p-0 flex items-center justify-center rounded-full">
            {todaysPlan?.length || 0}
          </div>
        </Link>
        
        <Link 
          href="/my-plan" 
          className="flex rounded-full items-center gap-1.5 lg:gap-2 text-sm text-neutral-400 font-medium hover:text-white transition-colors"
        >
          <span className="hidden lg:inline-block">Saved</span>
          <div className="badge badge-outline border-neutral-600 text-neutral-300 w-6 h-6 sm:w-7 sm:h-7 p-0 flex items-center justify-center rounded-full">
            {savedWorkouts?.length || 0}
          </div>
        </Link>
      </div>
      
    </div>
  );
}