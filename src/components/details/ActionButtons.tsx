"use client";

import { useWorkout, Workout } from "@/context/WorkoutContext";
import { CalendarPlus, CalendarCheck, Bookmark, BookmarkCheck } from "lucide-react";

interface WorkoutActionButtonsProps {
  workout: Workout;
}

const WorkoutActionButtons = ({ workout }: WorkoutActionButtonsProps) => {
  const { todaysPlan, savedWorkouts, addToPlan, removeFromPlan, saveWorkout, unsaveWorkout } = useWorkout();
  const isInPlan = todaysPlan.some((w) => String(w.id) === String(workout.id));
  const isSaved = savedWorkouts.some((w) => String(w.id) === String(workout.id));

  const handlePlanToggle = () => {
    if (isInPlan) {
      removeFromPlan(workout.id, workout.name);
    } else {
      addToPlan(workout);
    }
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveWorkout(workout.id, workout.name);
    } else {
      saveWorkout(workout);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full">
      <button 
        onClick={handlePlanToggle} 
        className={`btn flex-1 rounded-full border-none font-bold uppercase transition-colors ${
          isInPlan 
            ? "bg-neutral-800 text-[#ccff00] hover:bg-neutral-700" 
            : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
        }`}
      >
        {isInPlan ? (
          <>
            <CalendarCheck className="w-5 h-5" /> Added to Plan
          </>
        ) : (
          <>
            <CalendarPlus className="w-5 h-5" /> Add to today&apos;s plan 
          </>
        )}
      </button>
      <button 
        onClick={handleSaveToggle} 
        className={`btn flex-1 rounded-full font-bold uppercase transition-colors ${
          isSaved 
            ? "bg-neutral-800 text-[#ccff00] border-neutral-700" 
            : "btn-outline border-neutral-700 text-white hover:bg-neutral-800 hover:border-neutral-600"
        }`}
      >
        {isSaved ? (
          <>
            <BookmarkCheck className="w-5 h-5 text-[#ccff00]" /> Saved
          </>
        ) : (
          <>
            <Bookmark className="w-5 h-5" /> Save for later
          </>
        )}
      </button>
    </div>
  );
};

export default WorkoutActionButtons;