"use client";

import { useState } from "react";
import { useWorkout, Workout } from "@/context/WorkoutContext";
import { CalendarPlus, Bookmark } from "lucide-react";

// Assuming you pass the specific `workout` object into this component
const WorkoutActionButtons = ({ workout }: { workout: Workout }) => {
  const { todaysPlan, savedWorkouts, addToPlan, saveWorkout } = useWorkout();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdd = () => {
    const exists = todaysPlan.some((w) => w.id === workout.id);
    if (exists) {
      showToast("Already added to Today's Plan!");
    } else {
      addToPlan(workout);
      showToast("Successfully added to plan!");
    }
  };

  const handleSave = () => {
    const exists = savedWorkouts.some((w) => w.id === workout.id);
    if (exists) {
      showToast("Workout is already saved!");
    } else {
      saveWorkout(workout);
      showToast("Successfully saved for later!");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <>
      <div className="flex gap-4 mt-8">
        <button 
          onClick={handleAdd} 
          className="btn flex-1 bg-[#ccff00] text-black border-none rounded-full hover:bg-[#b3e600] font-bold"
        >
          <CalendarPlus className="w-5 h-5" /> Add to today's plan
        </button>
        <button 
          onClick={handleSave} 
          className="btn flex-1 btn-outline border-neutral-700 text-white rounded-full hover:bg-neutral-800"
        >
          <Bookmark className="w-5 h-5" /> Save for later
        </button>
      </div>

      {/* DaisyUI Toast */}
      {toastMessage && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-[#121215] border border-neutral-800 text-white rounded-xl shadow-2xl">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutActionButtons;