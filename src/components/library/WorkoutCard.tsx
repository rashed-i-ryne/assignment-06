"use client";

import Link from "next/link";
import { Clock, Flame, Star, Trash2 } from "lucide-react";
import { Workout, useWorkout } from "@/context/WorkoutContext";
import Image from "next/image";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const { deleteCustomWorkout } = useWorkout();
  const isCustom = String(workout.id).startsWith("custom-");

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${workout.name}"?`)) {
      deleteCustomWorkout(workout.id);
    }
  };

  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="flex flex-col bg-[#18181b] rounded-2xl overflow-hidden border border-[#27272a] hover:border-zinc-600 hover:shadow-2xl transition-all duration-300 group h-full relative"
    >
      {isCustom && (
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-red-600/90 hover:bg-red-600 text-white p-2 rounded-full transition-colors z-20 shadow-lg"
          title="Delete Custom Workout"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
        {workout.image && String(workout.image).trim().length > 5 ? (
          <Image
            src={String(workout.image).trim()}
            alt={workout.name || "Workout"}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-neutral-800">
            <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest">
              No Image
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col grow">
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1 mt-2 group-hover:text-zinc-300 transition-colors line-clamp-1">
          {workout.name}
        </h2>

        <p className="text-zinc-400 text-sm mb-5 truncate">
          {workout.equipment || "Custom Equipment"}
        </p>

        <div className="mt-auto pt-4 border-t border-[#27272a] flex items-center gap-5 text-sm text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-zinc-400" />
            {workout.duration || 0} min
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-zinc-400" />
            {workout.calories || workout.caloriesBurned || 0} kcal
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-zinc-400" />
            {workout.rating || 5.0}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;