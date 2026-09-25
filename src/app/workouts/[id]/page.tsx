"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAllWorkouts } from "@/lib/api";
import { Workout, useWorkout } from "@/context/WorkoutContext";
import VisualPanel from "@/components/details/VisualPanel";
import InfoPanel from "@/components/details/InfoPanel";
import Instructions from "@/components/details/Instructions";
import ActionButtons from "@/components/details/ActionButtons";

const WorkoutDetailsPage = () => {
  const params = useParams();
  const { customWorkouts } = useWorkout();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchId = params?.id ? String(params.id).trim() : "";
    if (!searchId) return;

    const fetchWorkout = async () => {
      try {
        let foundCustom = customWorkouts.find((w) => String(w.id).trim() === searchId);

        if (!foundCustom && typeof window !== "undefined") {
          const localCustom = localStorage.getItem("fitlog_custom");
          if (localCustom) {
            try {
              const parsed = JSON.parse(localCustom);
              foundCustom = parsed.find((w: Workout) => String(w.id).trim() === searchId);
            } catch (e) {}
          }
        }

        if (foundCustom) {
          setWorkout(foundCustom);
          setLoading(false);
          return;
        }

        const workouts = await getAllWorkouts();
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
  }, [params?.id, customWorkouts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    );
  }

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