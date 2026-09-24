"use client";

import { useEffect, useState } from 'react';
import { getAllWorkouts } from '@/lib/api';
import { Workout } from '@/context/WorkoutContext';
import WorkoutCard from './WorkoutCard';

const Library = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error("Failed to load workouts:", err);
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
        {/* Header Section: text-center for mobile, md:text-left for desktop */}
        <div className="text-center md:text-left mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 text-black">
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