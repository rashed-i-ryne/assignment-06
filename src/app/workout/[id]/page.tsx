import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import VisualPanel from "@/components/details/VisualPanel";
import InfoPanel from "@/components/details/InfoPanel";
import Instructions from "@/components/details/Instructions";
import ActionButtons from "@/components/details/ActionButtons";

const WorkoutDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params;
  let workout;

  try {
    // Explicitly convert the ID parameter to a string to prevent strict type mismatch
    workout = await getWorkoutById(String(resolvedParams.id));
  } catch {
    notFound();
  }

  if (!workout) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
        <VisualPanel image={workout.image} name={workout.name} />
        <div className="flex flex-col">
          <InfoPanel workout={workout} />
          <Instructions instructions={workout.instructions} />
          <ActionButtons workout={workout} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;