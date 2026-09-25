import { Workout } from "@/context/WorkoutContext";

const MetricsSummary = ({ todaysPlan = [] }: { todaysPlan: Workout[] }) => {
  const totalDuration = todaysPlan.reduce((acc, w) => acc + (w.duration || 0), 0);
  const totalCalories = todaysPlan.reduce((acc, w) => acc + (w.caloriesBurned || 0), 0);
  const totalWorkouts = todaysPlan.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm font-medium mb-1">Exercises</p>
        <h3 className="text-4xl font-black text-[#ccff00]">{totalWorkouts}</h3>
      </div>

      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm font-medium mb-1">Minutes</p>
        <h3 className="text-4xl font-black text-white">{totalDuration}</h3>
      </div>

      <div className="bg-[#121215] border border-neutral-800 rounded-2xl p-6">
        <p className="text-neutral-400 text-sm font-medium mb-1">Calories</p>
        <h3 className="text-4xl font-black text-white">{totalCalories}</h3>
      </div>
    </div>
  );
};

export default MetricsSummary;