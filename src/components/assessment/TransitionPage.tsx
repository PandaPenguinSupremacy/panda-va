import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PandaBg } from "./PandaBg";
import pandaMascot from "@/assets/panda-mascot.png";
import pandaLogo from "@/assets/panda-logo-new.png";
import { ArrowRight, Sparkles, Brain, Target } from "lucide-react";

interface Props {
  variant: "halfway" | "almost";
  onContinue: () => void;
}

const CONTENT = {
  halfway: {
    badge: "Halfway There",
    icon: Brain,
    heading: "Great progress!",
    subheading: "We're analyzing your experience and identifying your strongest VA strengths.",
    bullets: [
      "Your background is already standing out",
      "We're mapping your skills to real VA roles",
      "A clearer picture is forming — keep going",
    ],
    cta: "Continue Assessment",
    color: "from-violet-500 to-purple-600",
    progressPct: 50,
  },
  almost: {
    badge: "Almost There",
    icon: Target,
    heading: "Looking promising!",
    subheading: "We're narrowing down the VA paths that best fit your background and interests.",
    bullets: [
      "Your unique strengths are coming into focus",
      "We're matching you to the highest-fit roles",
      "Your personalized report is nearly ready",
    ],
    cta: "See My Results",
    color: "from-purple-500 to-indigo-600",
    progressPct: 80,
  },
};

const AnalysisDot = ({ delay }: { delay: number }) => (
  <motion.span
    className="inline-block h-2 w-2 rounded-full bg-primary"
    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration: 1.2, repeat: Infinity, delay }}
  />
);

export const TransitionPage = ({ variant, onContinue }: Props) => {
  const c = CONTENT[variant];
  const Icon = c.icon;
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(c.progressPct), 120);
    return () => clearTimeout(t);
  }, [c.progressPct]);

  return (
    /**
     * Hard viewport lock — no scroll ever.
     * height: 100dvh  overflow: hidden  on the root shell.
     * The card uses negative margin-top to visually "pull up" into the
     * mascot zone, eliminating the empty lavender gap.
     */
    <div
      className="relative flex flex-col overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <PandaBg dense />

      {/* ── Logo bar — pinned, minimal height ── */}
      <div className="shrink-0 relative px-5 pt-4 pb-0 flex items-center justify-center z-10">
        <img src={pandaLogo} alt="Panda VA" className="h-8 object-contain" />
      </div>

      {/* ── Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="shrink-0 flex justify-center pt-3 pb-0 relative z-10"
      >
        <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest">
          <Sparkles className="h-3.5 w-3.5" />
          {c.badge}
        </span>
      </motion.div>

      {/* ── Mascot section — atmospheric, fills remaining upper space ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="relative flex justify-center items-end shrink-0"
        style={{ paddingTop: "16px", paddingBottom: "0px", minHeight: "160px" }}
      >
        {/* Subtle radial glow behind mascot — integrates into background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 90%, hsl(270 95% 80% / 0.35) 0%, transparent 70%)",
          }}
        />
        {/* Pulse rings */}
        <motion.div
          className="absolute rounded-full border border-primary/20"
          style={{ width: 148, height: 148, bottom: 0, left: "50%", transform: "translateX(-50%)" }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full border border-primary/10"
          style={{ width: 188, height: 188, bottom: 0, left: "50%", transform: "translateX(-50%)" }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        />
        {/* Mascot — sized to leave room for card below */}
        <img
          src={pandaMascot}
          alt="Panda VA"
          className="relative z-10 object-contain drop-shadow-xl animate-float"
          style={{ height: "140px", width: "140px" }}
        />
      </motion.div>

      {/* ── Card — pulls up with negative margin to overlap mascot zone ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.12 }}
        className="relative z-10 flex-1 flex flex-col px-4 overflow-hidden"
        style={{ marginTop: "-24px" }}
      >
        <div className="glass-strong rounded-3xl p-5 flex flex-col gap-3 h-full overflow-hidden">

          {/* Icon + heading */}
          <div className="flex items-center gap-3 shrink-0">
            <span className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white shadow-glow shrink-0`}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-extrabold text-foreground leading-tight">{c.heading}</h2>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{c.subheading}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="shrink-0">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Analysis progress</span>
              <span className="font-semibold text-primary">{c.progressPct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-primary-soft overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${barWidth}%` }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>

          {/* Insight bullets */}
          <ul className="space-y-2 shrink-0">
            {c.bullets.map((bullet, i) => (
              <motion.li
                key={bullet}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                className="flex items-start gap-2.5 text-sm text-foreground"
              >
                <span className="mt-0.5 h-5 w-5 rounded-full bg-primary-soft flex items-center justify-center shrink-0">
                  <span className="text-primary text-xs font-bold">✓</span>
                </span>
                {bullet}
              </motion.li>
            ))}
          </ul>

          {/* Analyzing indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
            <span>Analyzing responses</span>
            <span className="flex items-center gap-1">
              <AnalysisDot delay={0} />
              <AnalysisDot delay={0.3} />
              <AnalysisDot delay={0.6} />
            </span>
          </div>

          {/* Spacer pushes CTA to bottom */}
          <div className="flex-1" />

          {/* CTA */}
          <button
            onClick={onContinue}
            className="group w-full shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base px-6 py-3.5 shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            {c.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Bottom safe-area padding */}
      <div className="shrink-0 h-4" />
    </div>
  );
};