"use client";

import { useWorkout } from "@/context/WorkoutContext";
import WorkoutCard from "./WorkoutCard";
import { Sparkles } from "lucide-react";

const CustomWorkoutsList = () => {
  const { customWorkouts } = useWorkout();

  if (customWorkouts.length === 0) {
    return null; 
  }

  return (
    <section className="container mx-auto px-4 py-12 max-w-[1400px]">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-[#ccff00]" />
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">
          Your Custom Lifts ({customWorkouts.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {customWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default CustomWorkoutsList;
