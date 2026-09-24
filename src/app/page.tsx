import HeroSection from "@/components/heroSection/HeroSection";
import Library from "@/components/library/Library";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full flex flex-col">
        <HeroSection />
        <Library />
      </main>
    </div>
  );
}
