interface PlanTabsProps {
  activeTab: "plan" | "saved";
  setActiveTab: (tab: "plan" | "saved") => void;
}

const PlanTabs = ({ activeTab, setActiveTab }: PlanTabsProps) => {
  return (
    <div className="flex gap-2 p-1 bg-[#18181b] border border-[#27272a] rounded-xl mb-6 md:mb-0 md:w-max">
      <button
        onClick={() => setActiveTab("plan")}
        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
          activeTab === "plan" 
            ? "bg-[#ccff00] text-black shadow-sm" 
            : "text-zinc-400 hover:text-white"
        }`}
      >
        Today&apos Plan
      </button>
      <button
        onClick={() => setActiveTab("saved")}
        className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
          activeTab === "saved" 
            ? "bg-[#ccff00] text-black shadow-sm" 
            : "text-zinc-400 hover:text-white"
        }`}
      >
        Saved
      </button>
    </div>
  );
};

export default PlanTabs;