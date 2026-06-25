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
      const d = Math.min(steps.length, Math.floor((p / 100) * steps.length) + (p >= 100 ? 0 : 0));
      setDone(d);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onComplete, 500);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, onComplete]);

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden">
      <PandaBg dense />
      <div className="relative w-full max-w-md text-center">
        <motion.img
          src={pandaMascot}
          alt="Panda VA coach analyzing"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-44 h-44 mx-auto object-contain drop-shadow-2xl animate-float"
        />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-3xl sm:text-4xl font-extrabold"
        >
          Analyzing Your Responses…
        </motion.h1>
        <p className="mt-2 text-muted-foreground text-balance">
          Our Panda VA Career Coach is identifying your strongest career path.
        </p>

        <div className="mt-6 glass-strong rounded-3xl p-6 text-left">
          <div className="flex items-end justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Progress</span>
            <span className="text-3xl font-extrabold text-gradient">{percent}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-primary-soft overflow-hidden mb-5">
            <motion.div
              className="h-full rounded-full gradient-primary"
              animate={{ width: `${percent}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
          <ul className="space-y-3">
            {steps.map((label, i) => {
              const isDone = i < done;
              const isActive = i === done && percent < 100;
              return (
                <li
                  key={label}
                  className={`flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors ${
                    isDone || percent >= 100 ? "bg-primary-soft/70" : isActive ? "bg-primary-soft/40" : "opacity-50"
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                    {isDone || percent >= 100 ? (
                      <Check className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-primary-foreground/60" />
                    )}
                  </span>
                  <span className="font-medium text-sm sm:text-base">{label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">Usually takes less than 10 seconds</p>
      </div>
    </div>
  );
};
