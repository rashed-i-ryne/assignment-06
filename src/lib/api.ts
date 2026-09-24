import { Workout } from '@/context/WorkoutContext';

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog';

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch workouts');
  
  const workouts: Workout[] = await res.json();
  const workout = workouts.find((w) => String(w.id) === String(id));
  
  if (!workout) {
    throw new Error('Workout not found');
  }
  
  return workout;
}