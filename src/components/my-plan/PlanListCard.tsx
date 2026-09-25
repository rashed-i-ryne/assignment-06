import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowRight, Clock, Flame } from "lucide-react";
import { Workout } from "@/context/WorkoutContext";

interface PlanListCardProps {
  workout: Workout;
  onComplete: (id: string) => void;
  onRemove: (id: string) => void;
}

const PlanListCard = ({ workout, onComplete, onRemove }: PlanListCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-[#18181b] rounded-2xl border border-[#27272a] hover:border-zinc-700 transition-all group items-center">
      <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-xl overflow-hidden bg-[#121215] border border-[#27272a]">
        <Image 
          src={workout.image} 
          alt={workout.name} 
          fill
          className="object-cover" 
        />
      </div>
      
      <div className="grow min-w-0 flex flex-col justify-center w-full text-center sm:text-left">
        <h4 className="font-black text-lg uppercase tracking-tight text-white truncate mb-1">
          {workout.name}
        </h4>
        <p className="text-sm font-medium text-zinc-400 mb-3">{workout.equipment}</p>
        
        <div className="flex items-center justify-center sm:justify-start gap-4 text-xs font-bold text-zinc-300">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#ccff00]" /> {workout.duration}m</span>
          <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-orange-500" /> {workout.caloriesBurned} kcal</span>
        </div>
      </div>

      <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
        <Link 
          href={`/workout/${workout.id}`}
          className="grow sm:flex-none flex items-center justify-center gap-2 bg-[#27272a] hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
        >
          VIEW <ArrowRight className="w-3.5 h-3.5 hidden sm:block" />
        </Link>
        <div className="flex gap-2 grow sm:flex-none">
          <button 
            onClick={() => onComplete(String(workout.id))}
            className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-[#121215] border border-[#27272a] text-[#ccff00] hover:bg-[#ccff00] hover:text-black rounded-lg transition-colors"
            title="Mark as Done"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onRemove(String(workout.id))}
            className="flex-1 sm:flex-none flex items-center justify-center p-2 bg-[#121215] border border-[#27272a] text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanListCard;