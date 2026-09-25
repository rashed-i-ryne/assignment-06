import Image from "next/image";
import logoImage from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-12 mt-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          <Image
            src={logoImage}
            alt="FitLog Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          FITLOG
        </div>
        <p className="text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
