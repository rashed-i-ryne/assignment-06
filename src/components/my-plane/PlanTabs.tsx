"use client";

import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Clock, Flame, Star, X, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
}

const PlanTabs = ({ activeTab, setActiveTab }: PlanTabsProps) => {
  const { todaysPlan, savedWorkouts, removeFromPlan, unsaveWorkout } =
    useWorkout();
  const [sortBy, setSortBy] = useState("duration");
  const currentList = activeTab === "plan" ? todaysPlan : savedWorkouts;
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "calories") {
      return (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0);
    }
    return (Number(b.duration) || 0) - (Number(a.duration) || 0);
  });


  const handleMarkAsDone = (id: string | number) => {
    const targetWorkout = todaysPlan.find((w) => String(w.id) === String(id));
    removeFromPlan(String(id), targetWorkout?.name);
  };

  const handleRemove = (id: string | number) => {
    if (activeTab === "plan") {
      const targetWorkout = todaysPlan.find((w) => String(w.id) === String(id));
      removeFromPlan(String(id), targetWorkout?.name);
    } else {
      const targetWorkout = savedWorkouts.find(
        (w) => String(w.id) === String(id),
      );
      unsaveWorkout(String(id), targetWorkout?.name);
    }
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-[#121215] p-1 rounded-full border border-neutral-800 inline-flex">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-3 text-neutral-400 text-sm">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm bg-[#121215] border-neutral-800 text-white rounded-full focus:outline-none"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="border border-dashed border-neutral-800 rounded-2xl p-16 sm:p-24 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">
            Nothing here yet
          </h3>
          <p className="text-neutral-400 mb-8">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="btn bg-[#ccff00] text-black border-none rounded-full px-8 hover:bg-[#b3e600] uppercase font-bold"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => (
            <div
              key={workout.id}
              className="card flex-col sm:flex-row bg-[#121215] border border-neutral-800 rounded-2xl p-4 items-center gap-6"
            >
              <figure className="relative w-full sm:w-40 h-28 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-neutral-900">
                {workout.image && String(workout.image).trim().length > 5 ? (
                  <Image
                    src={String(workout.image).trim()}
                    alt={workout.name || "Workout"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 160px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 border border-neutral-800">
                    <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest">
                      No Image
                    </span>
                  </div>
                )}
              </figure>

              <div className="flex-1 w-full">
                <h2 className="text-white uppercase font-black text-xl leading-tight">
                  {workout.name}
                </h2>
                <p className="text-neutral-400 text-sm mb-2">
                  {workout.equipment}
                </p>

                <div className="flex gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Clock className="w-3 h-3" /> {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1 text-[#ccff00]">
                    <Flame className="w-3 h-3" /> {workout.caloriesBurned} kcal
                  </span>
                  <span className="flex items-center gap-1 text-neutral-300">
                    <Star className="w-3 h-3" /> {workout.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                <Link
                  href={`/workouts/${workout.id}`}
                  className="btn btn-outline btn-sm border-neutral-700 text-white rounded-full hover:bg-neutral-800 hover:border-neutral-600 font-normal"
                >
                  View Details
                </Link>

                {activeTab === "plan" && (
                  <button
                    onClick={() => handleMarkAsDone(workout.id)}
                    className="btn btn-sm bg-[#ccff00] text-black border-none rounded-full hover:bg-[#b3e600]"
                  >
                    <Check className="w-4 h-4" /> Mark as Done
                  </button>
                )}

                <button
                  onClick={() => handleRemove(workout.id)}
                  className="btn btn-ghost btn-circle btn-sm text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanTabs;
