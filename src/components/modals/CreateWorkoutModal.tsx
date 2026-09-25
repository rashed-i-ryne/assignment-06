"use client";

import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { Plus, X } from "lucide-react";

const CreateWorkoutModal = () => {
  const { addCustomWorkout } = useWorkout();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    equipment: "",
    duration: 20,
    caloriesBurned: 150,
    difficulty: "Intermediate",
    muscleGroups: "Chest, Arms",
    sets: 3,
    reps: "10-12",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
    instructions: "1. Prepare your setup.\n2. Maintain proper posture.\n3. Execute with controlled movement.\n4. Complete all sets.",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addCustomWorkout({
      name: formData.name.toUpperCase(),
      equipment: formData.equipment || "Bodyweight",
      duration: Number(formData.duration),
      caloriesBurned: Number(formData.caloriesBurned),
      calories: Number(formData.caloriesBurned),
      difficulty: formData.difficulty,
      muscleGroups: formData.muscleGroups.split(",").map((s) => s.trim()),
      sets: Number(formData.sets),
      reps: formData.reps,
      rating: Number(formData.rating),
      image: formData.image,
      instructions: formData.instructions.split("\n").filter((s) => s.trim().length > 0),
    });

    setIsOpen(false);
    setFormData({
      name: "",
      equipment: "",
      duration: 20,
      caloriesBurned: 150,
      difficulty: "Intermediate",
      muscleGroups: "Chest, Arms",
      sets: 3,
      reps: "10-12",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
      instructions: "1. Prepare your setup.\n2. Maintain proper posture.\n3. Execute with controlled movement.\n4. Complete all sets.",
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn bg-[#ccff00] text-black border-none rounded-full px-6 hover:bg-[#b3e600] font-bold uppercase text-sm flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Create Custom Lift
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#121215] border border-neutral-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl my-8">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-black text-white uppercase mb-1">Create Custom Lift</h3>
            <p className="text-neutral-400 text-sm mb-6">Add your own personalized exercise to your workout library.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Workout Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weighted Pull-ups"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Equipment</label>
                  <input
                    type="text"
                    placeholder="e.g. Pull-up Bar, Belt"
                    value={formData.equipment}
                    onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                    className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Muscle Groups</label>
                  <input
                    type="text"
                    placeholder="Back, Biceps"
                    value={formData.muscleGroups}
                    onChange={(e) => setFormData({ ...formData, muscleGroups: e.target.value })}
                    className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Duration (min)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Calories</label>
                  <input
                    type="number"
                    value={formData.caloriesBurned}
                    onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
                    className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Sets</label>
                  <input
                    type="number"
                    value={formData.sets}
                    onChange={(e) => setFormData({ ...formData, sets: Number(e.target.value) })}
                    className="input input-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase text-neutral-400 font-bold mb-1 block">Instructions (One per line)</label>
                <textarea
                  rows={3}
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  className="textarea textarea-bordered w-full bg-neutral-900 border-neutral-800 text-white rounded-xl focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn bg-[#ccff00] text-black border-none rounded-full w-full hover:bg-[#b3e600] uppercase font-bold mt-2"
              >
                Save Custom Workout
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateWorkoutModal;