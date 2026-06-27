import { motion } from "framer-motion";
import type { Question, AnswerValue } from "@/lib/assessment";
import { Check, ArrowRight } from "lucide-react";

interface Props {
  question: Question;
  value?: AnswerValue;
  encouragement: string;
  onAnswer: (v: AnswerValue) => void;
  onContinue: () => void;
}

const isSelectedSingle = (v: AnswerValue | undefined, id: string) => v === id;
const isSelectedMulti  = (v: AnswerValue | undefined, id: string) => Array.isArray(v) && v.includes(id);

/**
 * Density tiers — keeps all options on screen without scrolling on mobile.
 * Desktop sizing is consistent; mobile compresses.
 */
function getDensity(count: number) {
  if (count <= 4) return { gap: "gap-2.5", py: "py-3 lg:py-3.5", text: "text-sm lg:text-base", emoji: true,  titleSize: "text-2xl sm:text-3xl", subSize: "text-sm" };
  if (count <= 7) return { gap: "gap-2",   py: "py-2.5 lg:py-3", text: "text-sm",              emoji: true,  titleSize: "text-xl sm:text-2xl",  subSize: "text-sm" };
  if (count <= 10)return { gap: "gap-1.5", py: "py-2 lg:py-3",   text: "text-xs sm:text-sm",   emoji: true,  titleSize: "text-lg sm:text-2xl",  subSize: "text-xs sm:text-sm" };
  return           { gap: "gap-1",   py: "py-1.5 lg:py-2.5", text: "text-xs",              emoji: false, titleSize: "text-base sm:text-xl",  subSize: "text-xs" };
}

export const QuestionCard = ({ question, value, encouragement, onAnswer, onContinue }: Props) => {
  const optCount = question.options?.length ?? 0;
  const d = getDensity(optCount);

  const handleMultiToggle = (id: string) => {
    const current = Array.isArray(value) ? [...value] : [];
    const idx = current.indexOf(id);
    if (idx >= 0) { current.splice(idx, 1); }
    else {
      if (question.maxSelect && current.length >= question.maxSelect) return;
      current.push(id);
    }
    onAnswer(current);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      {/* Encouragement label — small, muted */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3 text-xs font-medium text-primary/70 tracking-wide uppercase"
      >
        {encouragement}
      </motion.p>

      {/* Question title — typography-first, no card */}
      <h2 className={`${d.titleSize} font-bold text-foreground leading-snug mb-2 text-balance`}>
        {question.title}
      </h2>
      {question.subtext && (
        <p className={`${d.subSize} text-muted-foreground mb-3 leading-relaxed`}>
          {question.subtext}
        </p>
      )}

      {/* Scale type */}
      {question.type === "scale" ? (
        <ScaleInput
          value={typeof value === "number" ? value : 0}
          labels={question.scaleLabels}
          onSelect={(n) => { onAnswer(n); setTimeout(onContinue, 280); }}
        />
      ) : (
        <div className={`grid ${d.gap} mt-2`}>
          {question.options?.map((opt, i) => {
            const selected = question.type === "single"
              ? isSelectedSingle(value, opt.id)
              : isSelectedMulti(value, opt.id);

            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
                onClick={() => {
                  if (question.type === "single") { onAnswer(opt.id); setTimeout(onContinue, 240); }
                  else handleMultiToggle(opt.id);
                }}
                className={`
                  group flex items-center gap-3 w-full text-left rounded-2xl
                  border px-4 ${d.py} transition-all duration-150
                  ${selected
                    ? "border-primary/60 bg-primary/8 shadow-sm"
                    : "border-border/50 bg-white/30 backdrop-blur-sm hover:border-primary/30 hover:bg-white/50"
                  }
                `}
              >
                {d.emoji && opt.emoji && (
                  <span className="text-lg shrink-0 leading-none">{opt.emoji}</span>
                )}
                <span className={`flex-1 font-medium ${d.text} text-foreground leading-snug`}>
                  {opt.label}
                </span>
                {/* Selection indicator */}
                <span className={`
                  flex h-5 w-5 items-center justify-center rounded-full border transition-all shrink-0
                  ${selected
                    ? "border-primary bg-primary text-white"
                    : "border-border/60 bg-white/50"
                  }
                `}>
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Multi-select continue */}
      {question.type === "multi" && (
        <div className="mt-3">
          <button
            disabled={!Array.isArray(value) || value.length === 0}
            onClick={onContinue}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground font-semibold text-sm px-6 py-3 shadow-glow hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Continue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          {question.maxSelect && (
            <p className="mt-1.5 text-center text-xs text-muted-foreground">
              {Array.isArray(value) ? value.length : 0} / {question.maxSelect} selected
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

// ─── Scale ────────────────────────────────────────────────────────────────────
interface ScaleProps {
  value: number;
  labels?: { min: string; max: string };
  onSelect: (n: number) => void;
}

const ScaleInput = ({ value, labels, onSelect }: ScaleProps) => (
  <div className="mt-4">
    <div className="flex gap-2 sm:gap-3">
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value === n;
        return (
          <button
            key={n}
            onClick={() => onSelect(n)}
            className={`
              flex-1 aspect-square rounded-2xl border-2 flex items-center justify-center
              text-lg font-bold transition-all duration-150
              ${selected
                ? "border-primary bg-primary text-white"
                : "border-border/50 bg-white/30 text-primary hover:border-primary/40 hover:bg-white/50"
              }
            `}
          >
            {n}
          </button>
        );
      })}
    </div>
    {labels && (
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
    )}
  </div>
);