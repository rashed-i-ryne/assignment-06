"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import MetricsSummary from "@/components/my-plan/MetricsSummary";
import PlanTabs from "@/components/my-plan/PlanTabs";
import WorkoutHistoryLog from "@/components/my-plan/WorkoutHistoryLog";

const MyPlanContent = () => {
  const { todaysPlan, savedWorkouts } = useWorkout();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const activeTab: "plan" | "saved" = tabParam === "saved" ? "saved" : "plan";

  const handleTabChange = (tab: "plan" | "saved") => {
    router.replace(`/my-plan?tab=${tab}`, { scroll: false });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px] min-h-screen space-y-12">
      <div>
        <h1 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight mb-8 text-white">
          {activeTab === "plan" ? "My Plan" : "Saved Workouts"}
        </h1>
        
        <MetricsSummary 
          todaysPlan={todaysPlan} 
          savedWorkouts={savedWorkouts} 
          activeTab={activeTab} 
        />
      </div>
      <div>
        <PlanTabs activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>
      <div className="pt-8 border-t border-neutral-800 pb-12">
        <WorkoutHistoryLog />
      </div>
    </div>
  );
};

const MyPlanPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    }>
      <MyPlanContent />
    </Suspense>
  );
};

export default MyPlanPage;