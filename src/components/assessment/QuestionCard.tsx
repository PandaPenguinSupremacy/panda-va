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
const isSelectedMulti = (value: AnswerValue | undefined, id: string) =>
  Array.isArray(value) && value.includes(id);

export const QuestionCard = ({ question, value, onAnswer, onContinue }: Props) => {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      {/* Question title — tighter on mobile */}
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-balance mb-1 text-foreground leading-snug">
        {question.title}
      </h2>
      {question.subtext && (
        <p className="text-muted-foreground mb-2 text-xs sm:text-sm">{question.subtext}</p>
      )}

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
        <div className="grid gap-1.5 sm:gap-2 mt-2 sm:mt-3">
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
                className={`group relative flex items-center gap-3 w-full text-left rounded-2xl border-2 px-3 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary-soft shadow-glow"
                    : "glass border-white/60 hover:border-primary/40"
                }`}
              >
                {opt.emoji && (
                  <span className="text-xl sm:text-2xl shrink-0">{opt.emoji}</span>
                )}
                <span className="flex-1 font-semibold text-xs sm:text-sm lg:text-base text-foreground">
                  {opt.label}
                </span>
                <span
                  className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full border-2 shrink-0 transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white/70"
                  }`}
                >
                  {selected && <Check className="h-3 w-3 sm:h-4 sm:w-4" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {question.type === "multi" && (
        <div className="mt-2.5 sm:mt-3">
          <button
            disabled={!Array.isArray(value) || value.length === 0}
            onClick={onContinue}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-sm sm:text-base px-6 py-2.5 sm:py-3 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            Continue
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
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

interface ScaleProps {
  value: number;
  labels?: { min: string; max: string };
  onSelect: (n: number) => void;
}

const ScaleInput = ({ value, labels, onSelect }: ScaleProps) => {
  return (
    <div className="mt-3 sm:mt-4">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <motion.button
              key={n}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(n)}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-lg sm:text-xl font-bold transition-all ${
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
        <div className="mt-1.5 sm:mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{labels.min}</span>
          <span>{labels.max}</span>
        </div>
      )}
    </div>
  );
};