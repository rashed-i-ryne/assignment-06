import { Workout } from '@/context/WorkoutContext';

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog';

export const getAllWorkouts = async (): Promise<Workout[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  
  const data = await res.json();
  // Safely return the array whether the API sends a raw array or wraps it in an object
  return Array.isArray(data) ? data : data.data || data.workouts || [];
};

export const getWorkoutById = async (id: string | number): Promise<Workout> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  
  const data = await res.json();
  const workouts: Workout[] = Array.isArray(data) ? data : data.data || data.workouts || [];
  
  // Safely decode the ID just in case the URL encodes spaces or special characters
  const searchId = decodeURIComponent(String(id));
  const workout = workouts.find((w) => String(w.id) === searchId);
  
  if (!workout) {
    throw new Error('Workout not found');
  }
  
  return workout;
};