import { Workout } from '@/context/WorkoutContext';

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog';

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return res.json();
};

export const getWorkoutById = async (id: string | number): Promise<Workout> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  
  const workouts: Workout[] = await res.json();
  // Safe comparison matching both sides as strings
  const workout = workouts.find((w) => String(w.id) === String(id));
  
  if (!workout) {
    throw new Error('Workout not found');
  }
  
  return workout;
};