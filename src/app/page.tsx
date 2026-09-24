import HeroSection from "@/components/heroSection/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full flex flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
