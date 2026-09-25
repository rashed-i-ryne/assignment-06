"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import PlanTabs from "@/components/my-plane/PlanTabs";
import MetricsSummary from "@/components/my-plane/MetricsSummary";

const PlanContent = () => {
  const { todaysPlan, savedWorkouts } = useWorkout();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Derive active tab directly from the URL query parameter
  const tabParam = searchParams.get("tab");
  const activeTab: "plan" | "saved" = tabParam === "saved" ? "saved" : "plan";

  // Update the URL when switching tabs
  const setActiveTab = (tab: "plan" | "saved") => {
    router.push(`/my-plan?tab=${tab}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2">
          MY PLAN
        </h1>
        <p className="text-neutral-400 text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>
      
      {/* Metrics Summary */}
      <MetricsSummary 
        todaysPlan={todaysPlan} 
        savedWorkouts={savedWorkouts} 
        activeTab={activeTab} 
      />

      {/* Plan Tabs */}
      <div className="mt-8">
        <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

const MyPlanPage = () => {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
        </div>
      }
    >
      <PlanContent />
    </Suspense>
  );
};

export default MyPlanPage;