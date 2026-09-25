import Link from "next/link";
import { Search } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-[#27272a] rounded-2xl bg-[#121215]">
      <div className="w-16 h-16 bg-[#18181b] border border-[#27272a] rounded-full flex items-center justify-center mb-4 shadow-sm">
        <Search className="w-8 h-8 text-zinc-400" />
      </div>
      <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">
        Nothing Here Yet
      </h3>
      <p className="text-zinc-400 max-w-sm mb-6 text-sm">
        You haven&apos;t added any workouts to this list. Browse the library to find your next challenge.
      </p>
      <Link 
        href="/#library" 
        className="bg-[#ccff00] text-black px-6 py-3 rounded-full font-bold hover:bg-[#b3e600] transition-colors shadow-md text-sm"
      >
        BROWSE LIBRARY
      </Link>
    </div>
  );
};

export default EmptyState;