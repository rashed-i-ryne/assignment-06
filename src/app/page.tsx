import HeroSection from "@/components/heroSection/HeroSection";
import Library from "@/components/library/Library";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#121215] text-neutral-50 font-sans">
      <main className="min-h-screen w-full flex flex-col">
        <HeroSection />
        <Library />
      </main>
    </div>
  );
};

export default Home;