"use client";

import { useWorkout } from "@/context/WorkoutContext";
import PlanTabs from "../../components/my-plan/PlanTabs";
import MetricsSummary from "../../components/my-plan/MetricsSummary";

const MyPlanPage = () => {
  const { todaysPlan } = useWorkout();

  return (
    <div className="container mx-auto px-4 py-12 max-w-[1400px]">
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 text-white">
        My Plan & Saved Lifts
      </h1>
      
      {/* Metrics Summary Overview */}
      <MetricsSummary todaysPlan={todaysPlan} />

      {/* Tabs for Today's Plan vs Saved Workouts */}
      <div className="mt-8">
        <PlanTabs />
      </div>
    </div>
  );
};

export default MyPlanPage;