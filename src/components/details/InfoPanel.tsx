import { Workout } from "@/context/WorkoutContext";

const InfoPanel = ({ workout }: { workout: Workout }) => {
  return (
    <div className="space-y-6">
      {/* Title & Description at the very top */}
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight text-white mb-2">
          {workout.name}
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed">
          {workout.description || "A compound lift designed to build strength and push your fitness limits."}
        </p>
      </div>

      {/* Muscle Group Badges */}
      <div className="flex flex-wrap gap-2">
        {workout.muscleGroups?.map((group) => (
          <span
            key={group}
            className="bg-[#ccff00] text-black text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider"
          >
            {group}
          </span>
        ))}
      </div>

      {/* Stats Table Card */}
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden divide-y divide-[#27272a]">
        {[
          { label: "EQUIPMENT", value: workout.equipment },
          { label: "DIFFICULTY", value: workout.difficulty },
          { label: "SETS", value: workout.sets?.toString() },
          { label: "REPS", value: workout.reps?.toString() },
          { label: "DURATION", value: `${workout.duration} min` },
          { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
          { label: "RATING", value: workout.rating },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center justify-between px-6 py-3.5 text-sm">
            <span className="text-[11px] font-bold text-zinc-500 tracking-wider">
              {stat.label}
            </span>
            <span className="font-semibold text-white capitalize">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;