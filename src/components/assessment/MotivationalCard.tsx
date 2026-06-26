import { motion } from "framer-motion";

interface Props {
  label: string;
  quote: string;
  className?: string;
}

/** "Panda Tip" motivational card shown on question pages. */
export const MotivationalCard = ({ label, quote, className = "" }: Props) => {
  return (
    <motion.aside
      key={`${label}-${quote}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className={`pointer-events-none select-none ${className}`}
      aria-label={`Panda tip: ${quote}`}
    >
      <div className="flex items-start gap-3 rounded-2xl bg-white/55 backdrop-blur-sm border border-white/60 px-4 py-3 shadow-sm">
        <span className="text-xl leading-none mt-0.5" aria-hidden>🐼</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-primary/80">
            Panda Tip · {label}
          </p>
          <p className="mt-0.5 text-sm text-foreground/85 italic leading-snug">
            “{quote}”
          </p>
        </div>
      </div>
    </motion.aside>
  );
};
