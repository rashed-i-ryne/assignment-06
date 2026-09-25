"use client";

import { useWorkout } from "@/context/WorkoutContext";
import { Flame, Trophy, CheckCircle2, Trash2 } from "lucide-react";

const WorkoutHistoryLog = () => {
  const { history, clearHistory } = useWorkout();
  const streakCount = history.length > 0 ? Math.min(history.length, 7) : 0;

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all workout history and your streak?")) {
      clearHistory();
    }
  };

  return (
    <div className="mt-12 bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#ccff00]" /> Workout History & Streak
          </h3>
          <p className="text-neutral-400 text-sm">Track your completed training sessions over time.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-5 py-2.5 rounded-full">
            <Flame className="w-5 h-5 text-[#ccff00] animate-pulse" />
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              {streakCount} Session Streak
            </span>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleReset}
              className="btn btn-outline btn-sm border-neutral-700 text-neutral-400 hover:text-red-400 hover:border-red-500 rounded-full"
              title="Reset History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {history.length === 0 ? (
        <div className="border border-dashed border-neutral-800 rounded-2xl p-8 text-center text-neutral-500 text-sm">
          No completed workouts recorded yet. Finish a workout from Today&apos;s Plan to log it here!
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
          {history.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center justify-between bg-neutral-900/80 border border-neutral-800/80 p-4 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
                <div>
                  <h4 className="text-white font-bold uppercase text-sm">{item.name}</h4>
                  <p className="text-neutral-400 text-xs">{item.completedAt}</p>
                </div>
              </div>

              <div className="flex gap-4 text-xs font-medium text-neutral-300">
                <span>⏱️ {item.duration} min</span>
                <span className="text-[#ccff00]">🔥 {item.calories} kcal</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutHistoryLog;