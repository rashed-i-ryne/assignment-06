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
      {/* 1. Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>
      
      {/* 2. Metrics Summary - Must pass the todaysPlan prop to calculate data */}
      <MetricsSummary todaysPlan={todaysPlan} />

      {/* 3. Plan Tabs - Renders the actual list of saved/added workouts */}
      <div className="mt-8">
        <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default MyPlanPage;