import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PandaBg } from "./PandaBg";
import pandaMascot from "@/assets/panda-mascot.png";

interface Props {
  onComplete: () => void;
  durationMs?: number;
}

const steps = [
  "Reviewing your experience",
  "Identifying transferable skills",
  "Matching your strengths",
  "Evaluating communication readiness",
  "Building your personalized roadmap",
];

export const Processing = ({ onComplete, durationMs = 7000 }: Props) => {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setPercent(p);
      setDone(Math.min(steps.length, Math.floor((p / 100) * steps.length)));
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 500);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onComplete]);

  return (
    <div
      className="relative flex items-center justify-center px-5 overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <PandaBg dense />

      {/* Atmospheric mascot behind content — bottom right, low opacity */}
      <div
        aria-hidden
        className="pointer-events-none select-none absolute"
        style={{
          bottom: "-2%",
          right: "-6%",
          width: "38%",
          maxWidth: "280px",
          opacity: 0.09,
          filter: "blur(0.5px)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 90%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 90%)",
          zIndex: 0,
        }}
      >
        <img src={pandaMascot} alt="" className="w-full h-auto object-contain" draggable={false} />
      </div>

      <div className="relative z-10 w-full max-w-sm text-center">
        {/* Mascot — small, floating, with glow */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mx-auto mb-2"
          style={{ width: 96, height: 96 }}
        >
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsl(270 95% 82% / 0.5) 0%, transparent 70%)",
              transform: "scale(1.5)",
            }}
          />
          <img
            src={pandaMascot}
            alt="Panda VA analyzing"
            className="w-full h-full object-contain drop-shadow-xl animate-float relative z-10"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-extrabold"
        >
          Analyzing Your Responses…
        </motion.h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Our Panda VA Coach is finding your strongest career path.
        </p>

        <div className="mt-4 glass-strong rounded-3xl p-4 text-left">
          <div className="flex items-end justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Progress
            </span>
            <span className="text-2xl font-extrabold text-gradient">{percent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-primary-soft overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full gradient-primary"
              animate={{ width: `${percent}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          <ul className="space-y-1.5">
            {steps.map((label, i) => {
              const isDone = i < done;
              const isActive = i === done && percent < 100;
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-1.5 transition-colors ${
                    isDone || percent >= 100
                      ? "bg-primary-soft/70"
                      : isActive
                      ? "bg-primary-soft/40"
                      : "opacity-45"
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                    {isDone || percent >= 100 ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : isActive ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/50" />
                    )}
                  </span>
                  <span className="font-medium text-sm">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Usually takes less than 10 seconds
        </p>
      </div>
    </div>
  );
};