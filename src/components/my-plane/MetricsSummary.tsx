import React from "react";
import { Workout } from "@/context/WorkoutContext";

interface MetricsSummaryProps {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  activeTab: "plan" | "saved";
}

const MetricsSummary = ({ todaysPlan, savedWorkouts, activeTab }: MetricsSummaryProps) => {
  // Choose which list to calculate based on the active tab
  const currentList = activeTab === "plan" ? todaysPlan : savedWorkouts;

  const totalExercises = currentList.length;
  const totalMinutes = currentList.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = currentList.reduce((acc, curr) => acc + (Number(curr.caloriesBurned) || Number(curr.calories) || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm mb-1">Exercises</p>
        <h3 className="text-4xl font-black text-[#ccff00]">{totalExercises}</h3>
      </div>
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm mb-1">Minutes</p>
        <h3 className="text-4xl font-black text-white">{totalMinutes}</h3>
      </div>
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm mb-1">Calories</p>
        <h3 className="text-4xl font-black text-white">{totalCalories}</h3>
      </div>
    </div>
  );
};

export default MetricsSummary;