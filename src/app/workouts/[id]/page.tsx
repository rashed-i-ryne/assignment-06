"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/context/WorkoutContext";
import VisualPanel from "@/components/details/VisualPanel";
import InfoPanel from "@/components/details/InfoPanel";
import Instructions from "@/components/details/Instructions";
import ActionButtons from "@/components/details/ActionButtons";

const WorkoutDetailsPage = () => {
  const params = useParams();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workouts = await getAllWorkouts();
        // Force strict string comparison
        const searchId = String(params?.id).trim();
        const found = workouts.find((w) => String(w.id).trim() === searchId);

        if (found) {
          setWorkout(found);
        }
      } catch (err) {
        console.error("Failed to fetch workout details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    );
  }

  // This is the NEW error screen. If you see the yellow button again, the file wasn't saved!
  if (!workout) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
         <h1 className="text-4xl text-white font-black uppercase mb-4">Cache Cleared - Not Found</h1>
         <p className="text-neutral-400 mb-8">Could not locate a workout with ID: {params?.id}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <VisualPanel image={workout.image} name={workout.name} />
        <div className="flex flex-col">
          <InfoPanel workout={workout} />
          <Instructions instructions={workout.instructions} />
          <ActionButtons workout={workout} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;