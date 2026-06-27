import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { PandaBg } from "./PandaBg";
import { PandaContextIllustration } from "./PandaContextIllustration";

interface Props {
  onComplete: () => void;
  durationMs?: number;
}

const steps = [
  "Analyzing your strengths",
  "Matching ideal VA niches",
  "Identifying growth opportunities",
  "Evaluating your readiness",
  "Building your personalized report",
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
      className="relative flex flex-col items-center justify-center overflow-hidden bg-background px-6"
      style={{ height: "100dvh" }}
    >
      <PandaBg />

      {/* Large illustration — "experience" scene: panda at laptop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[min(220px,50vw)] sm:w-[min(260px,40vw)]"
        style={{ filter: "drop-shadow(0 12px 28px hsl(270 80% 70% / 0.2))" }}
      >
        <PandaContextIllustration
          category="experience"
          opacity={1}
          atmospheric={false}
        />
      </motion.div>

      {/* Text + steps */}
      <div className="relative z-10 w-full max-w-sm text-center mt-2">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xl sm:text-2xl font-bold text-foreground"
        >
          Analyzing your responses…
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-1 text-sm text-muted-foreground"
        >
          Our Panda VA Coach is identifying your ideal career path.
        </motion.p>

        {/* Thin progress bar */}
        <div className="mt-5 h-1 w-full rounded-full bg-border/40 overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            animate={{ width: `${percent}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs font-semibold text-primary tabular-nums">{percent}%</p>

        {/* Steps */}
        <ul className="mt-4 space-y-2 text-left">
          {steps.map((label, i) => {
            const isDone   = i < done;
            const isActive = i === done && percent < 100;
            const isPending = i > done;
            return (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isPending ? 0.35 : 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span className={`
                  flex h-5 w-5 items-center justify-center rounded-full shrink-0 transition-colors
                  ${isDone ? "bg-primary text-white" : isActive ? "bg-primary/20 text-primary" : "bg-border/40 text-muted-foreground"}
                `}>
                  {isDone ? (
                    <Check className="h-3 w-3" />
                  ) : isActive ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span className={`text-sm ${isDone ? "text-foreground font-medium" : isActive ? "text-foreground" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-5 text-xs text-muted-foreground">Usually takes less than 10 seconds</p>
      </div>
    </div>
  );
};