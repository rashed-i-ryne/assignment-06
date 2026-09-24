import Link from "next/link";
import Image from "next/image";
import bannerImage from "@/assets/banner.png";

const HeroSection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Dark Container Wrapper */}
        <div className="bg-[#121215] rounded-4xl p-8 md:p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-zinc-800">
          {/* Left Content */}
          <div className="space-y-8 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-black uppercase leading-[1.05] tracking-tight text-white">
              Train with intent. <br className="hidden lg:block" /> Log every
              set.
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="inline-block bg-[#ccff00] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#b8e600] transition-colors text-sm uppercase tracking-wide"
            >
              Browse Workouts
            </Link>
          </div>

          {/* Right Hero Image */}
          <div className="relative w-full md:w-1/2 h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center">
            <Image
              src={bannerImage}
              alt="3D Anatomical Athlete Training"
              fill
              className="object-contain object-center md:object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
