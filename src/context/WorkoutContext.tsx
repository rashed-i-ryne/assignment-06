"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
  id: string;
  name: string;
  image: string;
  category: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: number;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
}

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: string) => void;
  saveWorkout: (workout: Workout) => void;
  unsaveWorkout: (id: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage asynchronously to avoid React's synchronous cascading render warning
  useEffect(() => {
    const timer = setTimeout(() => {
      const localPlan = localStorage.getItem("fitlog_plan");
      const localSaved = localStorage.getItem("fitlog_saved");
      
      if (localPlan) {
        try { setTodaysPlan(JSON.parse(localPlan)); } catch (e) {}
      }
      if (localSaved) {
        try { setSavedWorkouts(JSON.parse(localSaved)); } catch (e) {}
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
    if (todaysPlan.some((w) => w.id === workout.id)) {
      return { success: false, message: "Workout is already in your plan." };
    }
    setTodaysPlan([...todaysPlan, workout]);
    return { success: true, message: "Added to today's plan!" };
  };

  const removeFromPlan = (id: string) => {
    setTodaysPlan(todaysPlan.filter((w) => w.id !== id));
  };

  const saveWorkout = (workout: Workout) => {
    if (!savedWorkouts.some((w) => w.id === workout.id)) {
      setSavedWorkouts([...savedWorkouts, workout]);
    }
  };

  const unsaveWorkout = (id: string) => {
    setSavedWorkouts(savedWorkouts.filter((w) => w.id !== id));
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
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}