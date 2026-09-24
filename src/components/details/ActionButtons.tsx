"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, CalendarPlus, Check } from "lucide-react";
import { Workout, useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/ui/Toast";

const ActionButtons = ({ workout }: { workout: Workout }) => {
  const { todaysPlan, savedWorkouts, addToPlan, saveWorkout, unsaveWorkout } = useWorkout();
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ isVisible: true, message, type });
  };

  const isAdded = todaysPlan.some((w) => w.id === workout.id);
  const isSaved = savedWorkouts.some((w) => w.id === workout.id);
  const isPlanFull = todaysPlan.length >= 5;

  const handleAddToPlan = () => {
    if (isAdded) return;
    const result = addToPlan(workout);
    showToast(result.message, result.success ? "success" : "error");
  };

  const handleSaveToggle = () => {
    if (isSaved) {
      unsaveWorkout(String(workout.id));
      showToast("Removed from saved workouts.");
    } else {
      saveWorkout(workout);
      showToast("Saved for later!");
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mt-8">
        <button
          onClick={handleAddToPlan}
          disabled={isAdded || (isPlanFull && !isAdded)}
          className={`flex-3 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all text-sm ${
            isAdded 
              ? "bg-[#ccff00] text-black cursor-default" 
              : isPlanFull
              ? "bg-[#27272a] text-zinc-500 cursor-not-allowed"
              : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
          }`}
        >
          {isAdded ? <Check className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4" />}
          {isAdded ? "ADDED TO PLAN" : "Add to today's plan"}
        </button>

        <button
          onClick={handleSaveToggle}
          className={`flex-[1.2] flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-semibold border transition-colors text-sm bg-[#18181b] ${
            isSaved 
              ? "border-[#ccff00] text-[#ccff00]" 
              : "border-[#27272a] text-white hover:border-zinc-500"
          }`}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4 text-[#ccff00]" /> : <Bookmark className="w-4 h-4" />}
          {isSaved ? "Saved" : "Save for later"}
        </button>
      </div>

      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />
    </>
  );
};

export default ActionButtons;