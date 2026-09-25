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

export interface HistoryItem {
  id: string | number;
  name: string;
  completedAt: string;
  duration: number;
  calories: number;
}

interface WorkoutContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];
  customWorkouts: Workout[];
  history: HistoryItem[];
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: string | number, workoutName?: string) => void;
  saveWorkout: (workout: Workout) => void;
  unsaveWorkout: (id: string | number, workoutName?: string) => void;
  addCustomWorkout: (workout: Omit<Workout, "id">) => void;
  markAsDone: (workout: Workout) => void;
  clearHistory: () => void;
  deleteCustomWorkout: (id: string | number) => void;
  showToast: (message: string, workoutName: string, type?: "success" | "error") => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [customWorkouts, setCustomWorkouts] = useState<Workout[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
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
    setToastInfo({ isVisible: true, message, workoutName, type });
  };

  const hideToast = () => {
    setToastInfo((prev) => ({ ...prev, isVisible: false }));
  };

  // Load from localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const localPlan = localStorage.getItem("fitlog_plan");
      const localSaved = localStorage.getItem("fitlog_saved");
      const localCustom = localStorage.getItem("fitlog_custom");
      const localHistory = localStorage.getItem("fitlog_history");

      if (localPlan) try { setTodaysPlan(JSON.parse(localPlan)); } catch (e) {}
      if (localSaved) try { setSavedWorkouts(JSON.parse(localSaved)); } catch (e) {}
      if (localCustom) try { setCustomWorkouts(JSON.parse(localCustom)); } catch (e) {}
      if (localHistory) try { setHistory(JSON.parse(localHistory)); } catch (e) {}

      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(todaysPlan));
      localStorage.setItem("fitlog_saved", JSON.stringify(savedWorkouts));
      localStorage.setItem("fitlog_custom", JSON.stringify(customWorkouts));
      localStorage.setItem("fitlog_history", JSON.stringify(history));
    }
  }, [todaysPlan, savedWorkouts, customWorkouts, history, isLoaded]);

  const addToPlan = (workout: Workout) => {
    if (todaysPlan.length >= 5) {
      showToast("Your plan is full (Max 5 workouts).", "", "error");
      return { success: false, message: "Your plan is full (Max 5 workouts)." };
    }
    if (todaysPlan.some((w) => String(w.id) === String(workout.id))) {
      showToast("is already in your plan", workout.name, "error");
      return { success: false, message: "Workout is already in your plan." };
    }
    setTodaysPlan([...todaysPlan, workout]);
    showToast("is added to your plan successfully!", workout.name, "success");
    return { success: true, message: "Added to today's plan!" };
  };

  const removeFromPlan = (id: string | number, workoutName?: string) => {
    const target = todaysPlan.find((w) => String(w.id) === String(id));
    const name = workoutName || target?.name || "Workout";
    setTodaysPlan(todaysPlan.filter((w) => String(w.id) !== String(id)));
    showToast("is removed from your Todays Plan", name, "error");
  };

  const saveWorkout = (workout: Workout) => {
    if (!savedWorkouts.some((w) => String(w.id) === String(workout.id))) {
      setSavedWorkouts([...savedWorkouts, workout]);
      showToast("is saved successfully!", workout.name, "success");
    } else {
      showToast("is already saved", workout.name, "error");
    }
  };

  const unsaveWorkout = (id: string | number, workoutName?: string) => {
    const target = savedWorkouts.find((w) => String(w.id) === String(id));
    const name = workoutName || target?.name || "Workout";
    setSavedWorkouts(savedWorkouts.filter((w) => String(w.id) !== String(id)));
    showToast("is removed from saved workouts", name, "error");
  };

  const addCustomWorkout = (workoutData: Omit<Workout, "id">) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: `custom-${Date.now()}`,
    };
    setCustomWorkouts([newWorkout, ...customWorkouts]);
    showToast("is created and added to library!", newWorkout.name, "success");
  };

  const markAsDone = (workout: Workout) => {
    removeFromPlan(workout.id, workout.name);
    const historyEntry: HistoryItem = {
      id: workout.id,
      name: workout.name,
      completedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      duration: Number(workout.duration) || 0,
      calories: Number(workout.caloriesBurned) || Number(workout.calories) || 0,
    };
    setHistory([historyEntry, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
    showToast("Workout history has been reset", "", "error");
  };

  const deleteCustomWorkout = (id: string | number) => {
    const target = customWorkouts.find((w) => String(w.id) === String(id));
    setCustomWorkouts(customWorkouts.filter((w) => String(w.id) !== String(id)));
    setTodaysPlan(todaysPlan.filter((w) => String(w.id) !== String(id)));
    setSavedWorkouts(savedWorkouts.filter((w) => String(w.id) !== String(id)));
    showToast("is deleted successfully", target?.name || "Custom Workout", "error");
  };

  return (
    <WorkoutContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,
        customWorkouts,
        history,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        unsaveWorkout,
        addCustomWorkout,
        markAsDone,
        clearHistory,
        deleteCustomWorkout,
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