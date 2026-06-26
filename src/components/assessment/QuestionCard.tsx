import { motion } from "framer-motion";
import type { Question, AnswerValue } from "@/lib/assessment";
import { Check, ArrowRight } from "lucide-react";

interface Props {
  question: Question;
  value?: AnswerValue;
  onAnswer: (v: AnswerValue) => void;
  onContinue: () => void;
}

const isSelectedSingle = (value: AnswerValue | undefined, id: string) => value === id;
const isSelectedMulti  = (value: AnswerValue | undefined, id: string) =>
  Array.isArray(value) && value.includes(id);

/**
 * Returns Tailwind classes tuned to the number of options.
 * Desktop sizing is always the same (controlled by lg: prefixes).
 * Only mobile/sm gets compressed for the no-scroll requirement.
 *
 *  ≤ 5  options → comfortable   (py-3, text-sm, gap-2, emoji-xl)
 *  6–8  options → compact       (py-2, text-xs, gap-1.5, emoji-lg)
 *  9–11 options → dense         (py-1.5, text-xs, gap-1, emoji-base, no emoji padding)
 * 12+   options → ultra-dense   (py-1, text-[11px], gap-0.5, no emoji)
 */
function getDensity(count: number) {
  if (count <= 5) {
    return {
      gap:        "gap-2",
      itemPx:     "px-3 lg:px-4",
      itemPy:     "py-2.5 lg:py-3",
      text:       "text-sm lg:text-base",
      emoji:      "text-xl lg:text-2xl",
      emojiShow:  true,
      iconSize:   "h-5 w-5 lg:h-6 lg:w-6",
      checkSize:  "h-3 w-3 lg:h-4 lg:w-4",
      titleText:  "text-lg sm:text-xl lg:text-2xl",
      subText:    "text-xs sm:text-sm",
      titleMb:    "mb-1.5",
      subMb:      "mb-1.5",
      listMt:     "mt-2.5",
    };
  }
  if (count <= 8) {
    return {
      gap:        "gap-1.5",
      itemPx:     "px-3 lg:px-4",
      itemPy:     "py-2 lg:py-3",
      text:       "text-xs sm:text-sm lg:text-base",
      emoji:      "text-lg lg:text-2xl",
      emojiShow:  true,
      iconSize:   "h-4 w-4 lg:h-6 lg:w-6",
      checkSize:  "h-3 w-3 lg:h-4 lg:w-4",
      titleText:  "text-base sm:text-lg lg:text-2xl",
      subText:    "text-[11px] sm:text-xs",
      titleMb:    "mb-1",
      subMb:      "mb-1",
      listMt:     "mt-2",
    };
  }
  if (count <= 11) {
    return {
      gap:        "gap-1",
      itemPx:     "px-2.5 lg:px-4",
      itemPy:     "py-1.5 lg:py-3",
      text:       "text-[11px] sm:text-xs lg:text-base",
      emoji:      "text-base lg:text-2xl",
      emojiShow:  true,
      iconSize:   "h-4 w-4 lg:h-6 lg:w-6",
      checkSize:  "h-2.5 w-2.5 lg:h-4 lg:w-4",
      titleText:  "text-sm sm:text-base lg:text-2xl",
      subText:    "text-[10px] sm:text-xs",
      titleMb:    "mb-0.5",
      subMb:      "mb-0.5",
      listMt:     "mt-1.5",
    };
  }
  // 12+ options — ultra-dense
  return {
    gap:        "gap-0.5",
    itemPx:     "px-2 lg:px-4",
    itemPy:     "py-1 lg:py-3",
    text:       "text-[11px] lg:text-base",
    emoji:      "text-sm lg:text-2xl",
    emojiShow:  false,   // hide emoji on mobile to save space
    iconSize:   "h-3.5 w-3.5 lg:h-6 lg:w-6",
    checkSize:  "h-2.5 w-2.5 lg:h-4 lg:w-4",
    titleText:  "text-sm lg:text-2xl",
    subText:    "text-[10px]",
    titleMb:    "mb-0.5",
    subMb:      "mb-0.5",
    listMt:     "mt-1",
  };
}

export const QuestionCard = ({ question, value, onAnswer, onContinue }: Props) => {
  const optionCount = question.options?.length ?? 0;
  const d = getDensity(optionCount);

  const handleMultiToggle = (id: string) => {
    const current = Array.isArray(value) ? [...value] : [];
    const idx = current.indexOf(id);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else {
      if (question.maxSelect && current.length >= question.maxSelect) return;
      current.push(id);
    }
    onAnswer(current);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      {/* Title */}
      <h2 className={`${d.titleText} font-bold text-balance ${d.titleMb} text-foreground leading-snug`}>
        {question.title}
      </h2>

      {/* Subtext */}
      {question.subtext && (
        <p className={`text-muted-foreground ${d.subMb} ${d.subText}`}>
          {question.subtext}
        </p>
      )}

      {/* Scale type */}
      {question.type === "scale" ? (
        <ScaleInput
          value={typeof value === "number" ? value : 0}
          labels={question.scaleLabels}
          onSelect={(n) => {
            onAnswer(n);
            setTimeout(onContinue, 280);
          }}
        />
      ) : (
        <div className={`grid ${d.gap} ${d.listMt}`}>
          {question.options?.map((opt, i) => {
            const selected =
              question.type === "single"
                ? isSelectedSingle(value, opt.id)
                : isSelectedMulti(value, opt.id);

            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025, duration: 0.2 }}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  if (question.type === "single") {
                    onAnswer(opt.id);
                    setTimeout(onContinue, 260);
                  } else {
                    handleMultiToggle(opt.id);
                  }
                }}
                className={`group relative flex items-center gap-2.5 lg:gap-4 w-full text-left rounded-2xl border-2 ${d.itemPx} ${d.itemPy} transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary-soft shadow-glow"
                    : "glass border-white/60 hover:border-primary/40"
                }`}
              >
                {/* Emoji — hidden on mobile for ultra-dense */}
                {opt.emoji && (
                  <span className={`${d.emoji} shrink-0 ${!d.emojiShow ? "hidden lg:inline" : ""}`}>
                    {opt.emoji}
                  </span>
                )}

                {/* Label */}
                <span className={`flex-1 font-semibold ${d.text} text-foreground leading-tight`}>
                  {opt.label}
                </span>

                {/* Check circle */}
                <span
                  className={`flex ${d.iconSize} items-center justify-center rounded-full border-2 shrink-0 transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/70"
                  }`}
                >
                  {selected && <Check className={d.checkSize} />}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Multi-select continue button */}
      {question.type === "multi" && (
        <div className="mt-2 lg:mt-3">
          <button
            disabled={!Array.isArray(value) || value.length === 0}
            onClick={onContinue}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-sm lg:text-base px-6 py-2.5 lg:py-3 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            Continue
            <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 transition-transform group-hover:translate-x-1" />
          </button>
          {question.maxSelect && (
            <p className="mt-1 text-center text-xs text-muted-foreground">
              {Array.isArray(value) ? value.length : 0} / {question.maxSelect} selected
            </p>
          )}
        </div>
      )}
    </motion.div>
  );
};

// ─── Scale input (unchanged behaviour, slightly tighter mobile) ───────────
interface ScaleProps {
  value: number;
  labels?: { min: string; max: string };
  onSelect: (n: number) => void;
}

const ScaleInput = ({ value, labels, onSelect }: ScaleProps) => (
  <div className="mt-3 lg:mt-4">
    <div className="grid grid-cols-5 gap-2 lg:gap-2">
      {[1, 2, 3, 4, 5].map((n) => {
        const selected = value === n;
        return (
          <motion.button
            key={n}
            whileTap={{ scale: 0.92 }}
            whileHover={{ y: -2 }}
            onClick={() => onSelect(n)}
            className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-lg lg:text-xl font-bold transition-all ${
              selected
                ? "border-primary bg-primary text-primary-foreground shadow-glow scale-105"
                : "glass border-white/60 text-primary hover:border-primary/40"
            }`}
          >
            {n}
          </motion.button>
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