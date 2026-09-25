"use client";

import { useEffect, useState } from 'react';
import { getAllWorkouts } from '@/lib/api';
import { Workout } from '@/context/WorkoutContext';
import WorkoutCard from './WorkoutCard';

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); // Added error state

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        // Fallback safety check to guarantee we only set an array, preventing .map crashes
        setWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load workouts:", err);
        setHasError(true);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="py-24 px-4 scroll-mt-16">
      {/* Custom Keyframe Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes custom-stretch {
          0%, 40%, 100% { transform: scaleY(0.4); }
          20% { transform: scaleY(1.0); }
        }
        .fitlog-bar {
          width: 8px;
          height: 48px;
          border-radius: 4px;
          animation: custom-stretch 1.2s infinite ease-in-out;
        }
        .fitlog-bar:nth-child(1) { background-color: #27272a; animation-delay: -1.2s; }
        .fitlog-bar:nth-child(2) { background-color: #ccff00; animation-delay: -1.1s; }
        .fitlog-bar:nth-child(3) { background-color: #27272a; animation-delay: -1.0s; }
        .fitlog-bar:nth-child(4) { background-color: #ccff00; animation-delay: -0.9s; }
        .fitlog-bar:nth-child(5) { background-color: #27272a; animation-delay: -0.8s; }
      `}} />

      <div className="container mx-auto max-w-[1400px]">
        {/* Header Section */}
        <div className="text-center md:text-left mb-10">
          {/* FIXED: Changed text-black to text-white for visibility on the dark background */}
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto md:mx-0">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
             <div className="flex gap-2 items-center justify-center">
               <div className="fitlog-bar"></div>
               <div className="fitlog-bar"></div>
               <div className="fitlog-bar"></div>
               <div className="fitlog-bar"></div>
               <div className="fitlog-bar"></div>
             </div>
             <p className="font-bold text-sm tracking-widest text-zinc-500 mt-6 animate-pulse uppercase">
               FETCHING WORKOUTS...
             </p>
          </div>
        ) : hasError ? (
           <div className="text-center py-20 min-h-[400px] flex flex-col items-center justify-center border border-dashed border-neutral-800 rounded-2xl">
             <p className="text-red-500 font-bold uppercase mb-4">Could not load the library.</p>
             <button onClick={() => window.location.reload()} className="btn bg-[#ccff00] text-black border-none rounded-full px-8 hover:bg-[#b3e600] font-bold">
               Try Again
             </button>
           </div>
        ) : workouts.length === 0 ? (
           <div className="text-center py-20 text-neutral-500 uppercase font-bold">
             No workouts found.
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Library;