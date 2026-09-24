import { Workout } from "@/context/WorkoutContext";
import { Dumbbell, Flame, Clock } from "lucide-react";

const MetricsSummary = ({ todaysPlan }: { todaysPlan: Workout[] }) => {
  const totalDuration = todaysPlan.reduce((acc, w) => acc + (w.duration || 0), 0);
  const totalCalories = todaysPlan.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);
  const totalWorkouts = todaysPlan.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-[#111] border border-neutral-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-[#1a2205] p-3 rounded-xl text-[#ccff00]">
          <Dumbbell className="w-6 h-6" />
        </div>
        <div>
          <p className="text-neutral-400 text-sm font-medium">Workouts in Plan</p>
          <h3 className="text-2xl font-black text-white">{totalWorkouts} / 5</h3>
        </div>
      </div>

      <div className="bg-[#111] border border-neutral-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-blue-950/50 p-3 rounded-xl text-blue-400">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <p className="text-neutral-400 text-sm font-medium">Total Duration</p>
          <h3 className="text-2xl font-black text-white">{totalDuration} mins</h3>
        </div>
      </div>

      <div className="bg-[#111] border border-neutral-800 rounded-2xl p-5 flex items-center gap-4">
        <div className="bg-orange-950/50 p-3 rounded-xl text-orange-400">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <p className="text-neutral-400 text-sm font-medium">Est. Calories</p>
          <h3 className="text-2xl font-black text-white">{totalCalories} kcal</h3>
        </div>
      </div>
    </div>
  );
};

export default MetricsSummary;