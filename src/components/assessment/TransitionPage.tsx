import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PandaBg } from "./PandaBg";
import { PandaContextIllustration } from "./PandaContextIllustration";
import pandaLogo from "@/assets/panda-logo-new.png";

interface Props {
  variant: "halfway" | "almost";
  onContinue: () => void;
}

const CONTENT = {
  halfway: {
    badge:      "Halfway there ✦",
    heading:    "You're halfway there.",
    sub:        "Every answer helps us find your ideal VA path. Keep going — the best part is ahead.",
    cta:        "Continue",
    illustration: "experience" as const,  // panda at laptop — celebrating small progress
    progressPct: 50,
    countdownSec: 5,
  },
  almost: {
    badge:      "Almost done ✦",
    heading:    "We're building your report.",
    sub:        "Just a few more questions and we'll have your personalized career path ready.",
    cta:        "See my results",
    illustration: "skills" as const,     // panda studying — preparing final report
    progressPct: 80,
    countdownSec: 5,
  },
};

export const TransitionPage = ({ variant, onContinue }: Props) => {
  const c = CONTENT[variant];
  const [countdown, setCountdown] = useState(c.countdownSec);
  const [barPct, setBarPct] = useState(0);

  // Animate progress bar in
  useEffect(() => {
    const t = setTimeout(() => setBarPct(c.progressPct), 150);
    return () => clearTimeout(t);
  }, [c.progressPct]);

  // Auto-continue countdown
  useEffect(() => {
    if (countdown <= 0) { onContinue(); return; }
    const t = setTimeout(() => setCountdown((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onContinue]);

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-background"
      style={{ height: "100dvh" }}
    >
      <PandaBg />

      {/* Logo — top center */}
      <div className="shrink-0 flex items-center justify-center pt-5 pb-0 relative z-10">
        <img src={pandaLogo} alt="Panda VA" className="h-7 object-contain opacity-75" />
      </div>

      {/* Progress bar — thin, under logo */}
      <div className="shrink-0 px-10 sm:px-20 pt-4 pb-0 relative z-10">
        <div className="h-0.5 w-full rounded-full bg-border/50 overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <p className="mt-1.5 text-center text-xs text-muted-foreground">
          {c.progressPct}% complete
        </p>
      </div>

      {/* Center content — illustration + text, vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 gap-0">

        {/* Large illustration — at full opacity, no atmospheric mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-[min(260px,55vw)] sm:w-[min(300px,45vw)]"
          style={{
            filter: "drop-shadow(0 16px 32px hsl(270 80% 70% / 0.2))",
          }}
        >
          <PandaContextIllustration
            category={c.illustration}
            opacity={1}
            atmospheric={false}
          />
        </motion.div>

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70 mt-1"
        >
          {c.badge}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="mt-2 text-2xl sm:text-3xl font-bold text-foreground text-center text-balance leading-snug"
        >
          {c.heading}
        </motion.h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-2 text-sm text-muted-foreground text-center text-balance max-w-xs"
        >
          {c.sub}
        </motion.p>
      </div>

      {/* Bottom: CTA + countdown */}
      <div className="shrink-0 px-6 pb-8 pt-4 flex flex-col items-center gap-3 relative z-10">
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onContinue}
          className="w-full max-w-sm rounded-2xl gradient-primary text-primary-foreground font-semibold text-base px-6 py-3.5 hover:opacity-90 transition-opacity"
        >
          {c.cta}
        </motion.button>
        <p className="text-xs text-muted-foreground">
          Continuing automatically in <span className="font-semibold text-foreground tabular-nums">{countdown}s</span>
        </p>
      </div>
    </div>
  );
};