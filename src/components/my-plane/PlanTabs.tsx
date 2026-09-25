import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Link from "next/link";
import { Clock, Flame, Star, X, Check } from "lucide-react";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
}

const PlanTabs = ({ activeTab, setActiveTab }: PlanTabsProps) => {
  const { todaysPlan, savedWorkouts, removeFromPlan, unsaveWorkout } = useWorkout();
  
  // State for Sorting and Toast Notifications
  const [sortBy, setSortBy] = useState("duration");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const currentList = activeTab === "plan" ? todaysPlan : savedWorkouts;

  // 1. Sort Logic
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "calories") {
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0); // Highest calories first
    }
    return (b.duration || 0) - (a.duration || 0); // Highest duration first
  });

  // 2. Mark as Done Logic
  const handleMarkAsDone = (id: string | number) => {
    removeFromPlan(String(id));
    setToastMsg("Workout marked as complete!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  // 3. Remove Logic
  const handleRemove = (id: string | number) => {
    if (activeTab === "plan") {
      removeFromPlan(String(id));
    } else {
      unsaveWorkout(String(id));
    }
  };

  return (
    <div className="w-full relative">
      {/* Tab Controls & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-[#121215] p-1 rounded-full border border-neutral-800 inline-flex">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "plan" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
            }`}
          >
            Today's Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "saved" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-white"
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

      {/* List / Empty State Rendering */}
      {sortedList.length === 0 ? (
        <div className="border border-dashed border-neutral-800 rounded-2xl p-16 sm:p-24 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black text-white uppercase mb-2 tracking-tight">Nothing here yet</h3>
          <p className="text-neutral-400 mb-8">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="btn bg-[#ccff00] text-black border-none rounded-full px-8 hover:bg-[#b3e600] uppercase font-bold">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedList.map((workout) => (
            <div key={workout.id} className="card flex-col sm:flex-row bg-[#121215] border border-neutral-800 rounded-2xl p-4 items-center gap-6">
              <figure className="w-full sm:w-40 h-28 sm:h-20 rounded-xl overflow-hidden shrink-0">
                <img src={workout.image} alt={workout.name} className="object-cover w-full h-full" />
              </figure>
              
              <div className="flex-1 w-full">
                <h2 className="text-white uppercase font-black text-xl leading-tight">{workout.name}</h2>
                <p className="text-neutral-400 text-sm mb-2">{workout.equipment}</p>
                
                <div className="flex gap-4 text-xs font-medium">
                  <span className="flex items-center gap-1 text-neutral-300"><Clock className="w-3 h-3" /> {workout.duration} min</span>
                  <span className="flex items-center gap-1 text-[#ccff00]"><Flame className="w-3 h-3" /> {workout.caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1 text-neutral-300"><Star className="w-3 h-3" /> {workout.rating}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                {/* Note: Ensure you have a dynamic route at src/app/workouts/[id]/page.tsx for this to work */}
                <Link href={`/workouts/${workout.id}`} className="btn btn-outline btn-sm border-neutral-700 text-white rounded-full hover:bg-neutral-800 hover:border-neutral-600 font-normal">
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

      {/* DaisyUI Toast for 'Mark as Done' */}
      {toastMsg && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert bg-[#121215] border border-neutral-800 text-white rounded-xl shadow-2xl">
            <Check className="w-5 h-5 text-[#ccff00]" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanTabs;