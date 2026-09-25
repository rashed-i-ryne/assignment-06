import HeroSection from "@/components/heroSection/HeroSection";
import Library from "@/components/library/Library";
import CreateWorkoutModal from "@/components/modals/CreateWorkoutModal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#121215] text-neutral-50 font-sans">
      <main className="min-h-screen w-full flex flex-col">
        <HeroSection />

        <Library limitApi={9} limitCustom={3} />

        <div className="container mx-auto px-4 pt-6 pb-4 max-w-[1400px] flex justify-center">
          <CreateWorkoutModal />
        </div>

        <div className="container mx-auto px-4 pb-20 max-w-[1400px] flex justify-center">
          <Link
            href="/workouts"
            className="btn btn-outline border-neutral-700 text-white rounded-full px-8 hover:bg-neutral-800 hover:border-neutral-600 uppercase font-bold flex items-center gap-2"
          >
            See All Workouts <ArrowRight className="w-4 h-4 text-[#ccff00]" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
