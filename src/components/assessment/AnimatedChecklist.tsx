import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface Props {
  items: string[];
  onComplete?: () => void;
  stepMs?: number;
}

export const AnimatedChecklist = ({ items, onComplete, stepMs = 900 }: Props) => {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= items.length) {
      const t = setTimeout(() => onComplete?.(), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), stepMs);
    return () => clearTimeout(t);
  }, [done, items.length, onComplete, stepMs]);

  return (
    <ul className="space-y-4 max-w-md mx-auto w-full">
      {items.map((label, i) => {
        const isDone = i < done;
        const isActive = i === done;
        return (
          <motion.li
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              isDone
                ? "border-primary/30 bg-primary-soft/40"
                : isActive
                ? "border-primary bg-primary-soft"
                : "border-border bg-card opacity-60"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
              {isDone ? (
                <Check className="h-4 w-4" />
              ) : isActive ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-primary-foreground/60" />
              )}
            </span>
            <span className="font-medium">{label}</span>
          </motion.li>
        );
      })}
    </ul>
  );
};
