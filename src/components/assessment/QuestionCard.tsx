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

const isSelectedSingle = (value: AnswerValue | undefined, id: string) => value === id;
const isSelectedMulti = (value: AnswerValue | undefined, id: string) =>
  Array.isArray(value) && value.includes(id);

export const QuestionCard = ({ question, value, encouragement, onAnswer, onContinue }: Props) => {
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
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-medium text-primary"
      >
        {encouragement}
      </motion.p>

      <h2 className="text-2xl sm:text-3xl font-bold text-balance mb-2 text-foreground">
        {question.title}
      </h2>
      {question.subtext && (
        <p className="text-muted-foreground mb-4 text-sm">{question.subtext}</p>
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
        <div className="grid gap-3 mt-6">
          {question.options?.map((opt, i) => {
            const selected =
              question.type === "single"
                ? isSelectedSingle(value, opt.id)
                : isSelectedMulti(value, opt.id);
            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.22 }}
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
                className={`group relative flex items-center gap-4 w-full text-left rounded-3xl border-2 px-5 py-4 sm:py-5 transition-all duration-200 ${
                  selected
                    ? "border-primary bg-primary-soft shadow-glow"
                    : "glass border-white/60 hover:border-primary/40"
                }`}
              >
                {opt.emoji && <span className="text-2xl shrink-0">{opt.emoji}</span>}
                <span className="flex-1 font-semibold text-base sm:text-lg text-foreground">
                  {opt.label}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 shrink-0 transition-colors ${
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border bg-white/70"
                  }`}
                >
                  {selected && <Check className="h-4 w-4" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      )}

      {question.type === "multi" && (
        <div className="mt-6">
          <button
            disabled={!Array.isArray(value) || value.length === 0}
            onClick={onContinue}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-lg px-6 py-4 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:hover:scale-100"
          >
            Continue
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          {question.maxSelect && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
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
    <div className="mt-8">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <motion.button
              key={n}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(n)}
              className={`aspect-square rounded-2xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
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
        <div className="mt-3 flex justify-between text-xs text-muted-foreground">
          <span>{labels.min}</span>
          <span>{labels.max}</span>
        </div>
      )}
    </div>
  );
};
