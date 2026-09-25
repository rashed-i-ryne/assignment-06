"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
  id: number | string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  calories:number,
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
  removeFromPlan: (id: string | number) => void;
  saveWorkout: (workout: Workout) => void;
  unsaveWorkout: (id: string | number) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage asynchronously to avoid React's synchronous cascading render warning
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

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(todaysPlan));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
    }
  }, [todaysPlan, savedWorkouts, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todaysPlan.length >= 5) {
      return { success: false, message: "Your plan is full (Max 5 workouts)." };
    }
    // Convert both IDs to strings for a safe comparison
    if (todaysPlan.some((w) => String(w.id) === String(workout.id))) {
      return { success: false, message: "Workout is already in your plan." };
    }
    setTodaysPlan([...todaysPlan, workout]);
    return { success: true, message: "Added to today's plan!" };
  };

  const removeFromPlan = (id: string | number) => {
    // Convert both IDs to strings to bypass number vs string strict inequality
    setTodaysPlan(todaysPlan.filter((w) => String(w.id) !== String(id)));
  };

  const saveWorkout = (workout: Workout) => {
    if (!savedWorkouts.some((w) => String(w.id) === String(workout.id))) {
      setSavedWorkouts([...savedWorkouts, workout]);
    }
  };

  const unsaveWorkout = (id: string | number) => {
    // Convert both IDs to strings
    setSavedWorkouts(savedWorkouts.filter((w) => String(w.id) !== String(id)));
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
      }}
    >
      {children}
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