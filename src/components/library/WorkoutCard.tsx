import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react"; 
import { Workout } from "@/context/WorkoutContext";
import Image from "next/image";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="flex flex-col bg-[#18181b] rounded-2xl overflow-hidden border border-[#27272a] hover:border-zinc-600 hover:shadow-2xl transition-all duration-300 group h-full"
    >
      {/* Top Image with Bulletproof Fallback */}
      <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
        {workout.image && String(workout.image).trim().length > 5 ? (
          <Image
            src={String(workout.image).trim()}
            alt={workout.name || "Workout"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center border border-neutral-800">
            <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col grow">

        {/* Title */}
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1 mt-2 group-hover:text-zinc-300 transition-colors line-clamp-1">
          {workout.name}
        </h2>

        {/* Equipment Text (No Icon) */}
        <p className="text-zinc-400 text-sm mb-5 truncate">
          {workout.equipment}
        </p>

        {/* Stats Row */}
        <div className="mt-auto pt-4 border-t border-[#27272a] flex items-center gap-5 text-sm text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-zinc-400" />
            {workout.duration} min
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-zinc-400" />
            {/* Note: Depending on your API, this might need to be workout.caloriesBurned */}
            {workout.calories || workout.caloriesBurned} kcal
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-zinc-400" />
            {workout.rating}
          </div>
        </div>
        
      </div>
    </Link>
  );
};

export default WorkoutCard;