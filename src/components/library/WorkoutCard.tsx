import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react"; 
import { Workout } from "@/context/WorkoutContext";
import Image from "next/image";

const WorkoutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="flex flex-col bg-[#18181b] rounded-2xl overflow-hidden border border-[#27272a] hover:border-zinc-600 hover:shadow-2xl transition-all duration-300 group h-full"
    >
      {/* Top Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col grow">
        
        {/* Badges (Moved below the image) */}
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.category?.map((group) => (
            <span
              key={group}
              className="bg-[#ccff00] text-black text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2 className="text-xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-zinc-300 transition-colors line-clamp-1">
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
            {workout.calories} kcal
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