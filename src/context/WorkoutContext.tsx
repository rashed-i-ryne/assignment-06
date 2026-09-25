"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Toast from "@/components/ui/Toast";

export interface Workout {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  calories: number;
  sets: number;
  reps: number | string;
  rating: number;
  description?: string;
  instructions: string[];
}

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: string | number, workoutName?: string) => void;
  saveWorkout: (workout: Workout) => void;
  unsaveWorkout: (id: string | number, workoutName?: string) => void;
  showToast: (message: string, workoutName: string, type?: "success" | "error") => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [toastInfo, setToastInfo] = useState<{
    isVisible: boolean;
    message: string;
    workoutName: string;
    type: "success" | "error";
  }>({
    isVisible: false,
    message: "",
    workoutName: "",
    type: "success",
  });

  const showToast = (message: string, workoutName: string, type: "success" | "error" = "success") => {
    setToastInfo({
      isVisible: true,
      message,
      workoutName,
      type,
    });
  };

  const hideToast = () => {
    setToastInfo((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const localPlan = localStorage.getItem("fitlog_plan");
      const localSaved = localStorage.getItem("fitlog_saved");
      
      if (localPlan) {
        try { 
          setTodaysPlan(JSON.parse(localPlan)); 
        } catch (e) {
          if (process.env.NODE_ENV === "development") {
            console.error("Failed to parse localPlan from localStorage:", e);
          }
        }
      }

      if (localSaved) {
        try { 
          setSavedWorkouts(JSON.parse(localSaved)); 
        } catch (e) {
          if (process.env.NODE_ENV === "development") {
            console.error("Failed to parse localSaved from localStorage:", e);
          }
        }
      }
      
      setIsLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(todaysPlan));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    }
  }, [todaysPlan, savedWorkouts, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todaysPlan.length >= 5) {
      showToast("Your plan is full (Max 5 workouts).", "", "error");
      return { success: false, message: "Your plan is full (Max 5 workouts)." };
    }
    if (todaysPlan.some((w) => String(w.id) === String(workout.id))) {
      showToast("Already in your plan:", workout.name, "error");
      return { success: false, message: "Workout is already in your plan." };
    }
    setTodaysPlan([...todaysPlan, workout]);
    showToast("Added to your plan successfully:", workout.name, "success");
    return { success: true, message: "Added to today's plan!" };
  };

  const removeFromPlan = (id: string | number, workoutName?: string) => {
    const target = todaysPlan.find((w) => String(w.id) === String(id));
    const name = workoutName || target?.name || "Workout";
    
    setTodaysPlan(todaysPlan.filter((w) => String(w.id) !== String(id)));
    showToast("Removed from the plan:", name, "error");
  };

  const saveWorkout = (workout: Workout) => {
    if (!savedWorkouts.some((w) => String(w.id) === String(workout.id))) {
      setSavedWorkouts([...savedWorkouts, workout]);
      showToast("Saved successfully:", workout.name, "success");
    } else {
      showToast("Already saved:", workout.name, "error");
    }
  };

  const unsaveWorkout = (id: string | number, workoutName?: string) => {
    const target = savedWorkouts.find((w) => String(w.id) === String(id));
    const name = workoutName || target?.name || "Workout";

    setSavedWorkouts(savedWorkouts.filter((w) => String(w.id) !== String(id)));
    showToast("Removed from saved workouts:", name, "error");
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        unsaveWorkout,
        showToast,
      }}
    >
      {children}
      <Toast
        message={toastInfo.message}
        workoutName={toastInfo.workoutName}
        type={toastInfo.type}
        isVisible={toastInfo.isVisible}
        onClose={hideToast}
      />
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
};