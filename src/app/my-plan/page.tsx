"use client";

import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import PlanTabs from "@/components/my-plane/PlanTabs";
import MetricsSummary from "@/components/my-plane/MetricsSummary";

const MyPlanPage = () => {
  const { todaysPlan } = useWorkout();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 text-white">
        My Plan & Saved Lifts
      </h1>
      
      {/* Metrics Summary Overview */}
      <MetricsSummary todaysPlan={todaysPlan} />

      {/* Tabs for Today's Plan vs Saved Workouts */}
      <div className="mt-8">
        <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default MyPlanPage;