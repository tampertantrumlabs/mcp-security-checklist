export function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-tamper-red/20 blur-[140px] animate-pulse-slow"
      />
      <div
        className="absolute top-1/3 -right-40 h-[520px] w-[520px] rounded-full bg-ember-orange/15 blur-[160px] animate-float"
      />
      <div
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-warm-amber/10 blur-[140px] animate-pulse-slow"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
