import { ArrowDownAZ } from "lucide-react";

interface SortDropdownProps {
  sortOption: "duration" | "calories" | "rating";
  setSortOption: (val: "duration" | "calories" | "rating") => void;
}

const SortDropdown = ({ sortOption, setSortOption }: SortDropdownProps) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowDownAZ className="w-4 h-4 text-zinc-400" />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value as "duration" | "calories" | "rating")}
        className="bg-[#18181b] border border-[#27272a] text-white text-sm font-bold rounded-lg focus:ring-[#ccff00] focus:border-[#ccff00] block w-full p-2.5 outline-none cursor-pointer hover:border-zinc-500 transition-colors"
      >
        <option value="duration" className="bg-[#18181b] text-white">Sort by Duration</option>
        <option value="calories" className="bg-[#18181b] text-white">Sort by Calories</option>
        <option value="rating" className="bg-[#18181b] text-white">Sort by Rating</option>
      </select>
    </div>
  );
};

export default SortDropdown;