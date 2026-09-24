const Instructions = ({ instructions }: { instructions: string[] }) => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-black uppercase tracking-tight text-white">
        Instructions
      </h3>
      <ol className="space-y-3">
        {instructions.map((step, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-zinc-400 leading-relaxed">
            <span className="font-semibold text-white shrink-0">{idx + 1}.</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Instructions;