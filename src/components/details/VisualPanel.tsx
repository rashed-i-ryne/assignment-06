import Image from "next/image";

const VisualPanel = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#18181b] border border-[#27272a] shadow-2xl">
        <Image
          src={image}
          alt={name}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default VisualPanel;