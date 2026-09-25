"use client";

import { useEffect, useState } from "react";
import { getAllWorkouts } from "@/lib/api";
import { useWorkout, Workout } from "@/context/WorkoutContext";
import WorkoutCard from "@/components/library/WorkoutCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AllWorkoutsPage = () => {
  const { customWorkouts } = useWorkout();
  const [apiWorkouts, setApiWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllWorkouts();
        setApiWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load workouts", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const allWorkouts = [...customWorkouts, ...apiWorkouts];

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px] min-h-screen">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-[#ccff00] transition-colors mb-6 text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
          All Workouts Catalog
        </h1>
        <p className="text-neutral-400 text-base">
          Browse all available default and custom training exercises.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
        </div>
      ) : allWorkouts.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 uppercase font-bold">
          No workouts available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllWorkoutsPage;