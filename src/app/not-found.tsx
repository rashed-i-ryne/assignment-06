import Link from "next/link";
import { Dumbbell } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-20 h-20 bg-[#18181b] border border-[#27272a] rounded-full flex items-center justify-center mb-6">
        <Dumbbell className="w-10 h-10 text-zinc-400" />
      </div>
      <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-4">
        Workout Not Found
      </h2>
      <p className="text-zinc-400 max-w-md mb-8">
        We couldn&apos;t find the workout you&apos;re looking for. It might have been removed, or the link is incorrect.
      </p>
      <Link 
        href="/" 
        className="bg-[#ccff00] text-black px-8 py-3.5 rounded-full font-bold hover:bg-[#b3e600] transition-colors shadow-md"
      >
        RETURN TO LIBRARY
      </Link>
    </div>
  );
};

export default NotFound;