import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import {
  questions,
  type Answers,
  type AnswerValue,
  getNextQuestionIndex,
  getPrevQuestionIndex,
  getTotalActiveQuestions,
  getActiveQuestionPosition,
  getEncouragement,
  getStageQuote,
  getRecommendation,
} from "@/lib/assessment";
import { loadState, saveState, clearState } from "@/lib/storage";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { Landing } from "@/components/assessment/Landing";
import { Processing } from "@/components/assessment/Processing";
import { ResultsPreview } from "@/components/assessment/ResultsPreview";
import { ThankYou } from "@/components/assessment/ThankYou";
import { PandaBg } from "@/components/assessment/PandaBg";
import { MotivationalCard } from "@/components/assessment/MotivationalCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import pandaLogo from "@/assets/panda-logo-new.png";

type Stage =
  | "landing"
  | "questions"
  | "processing"
  | "results"
  | "thanks";

const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hitHalfway, setHitHalfway] = useState(false);

  useEffect(() => {
    const s = loadState();
    if (s && Object.keys(s.answers).length > 0) {
      setAnswers(s.answers);
      setIndex(Math.min(s.index, questions.length - 1));
    }
  }, []);

  useEffect(() => {
    if (stage === "questions") saveState({ answers, index });
  }, [answers, index, stage]);

  const recommendation = useMemo(() => getRecommendation(answers), [answers]);

  const handleStart = () => {
    setStage("questions");
    setIndex(0);
    setHitHalfway(false);
  };

  const handleAnswer = (value: AnswerValue) => {
    const q = questions[index];
    setAnswers((a) => ({ ...a, [q.id]: value }));
  };

  const handleContinue = () => {
  const next = getNextQuestionIndex(index, { ...answers });

  if (next >= questions.length) {
    setStage("processing");
    return;
  }

  setIndex(next);
};

const handleBack = () => {
    if (index === 0) {
      setStage("landing");

      const total = getTotalActiveQuestions(answers);
      const position = getActiveQuestionPosition(index, answers);

      return;
    }
    setIndex(getPrevQuestionIndex(index, answers));
  };

  const handleSubmitEmail = async ({ firstName: fn, email }: { firstName: string; email: string }) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("assessment_submissions").insert({
        first_name: fn,
        email,
        answers_json: answers,
        recommended_path: recommendation.path,
      });
      if (error) throw error;
      setFirstName(fn);
      clearState();
      setStage("thanks");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    clearState();
    setAnswers({});
    setIndex(0);
    setFirstName("");
    setHitHalfway(false);
    setStage("landing");
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "landing" && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Landing onStart={handleStart} />
        </motion.div>
      )}

      {stage === "questions" && (
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative h-dvh overflow-hidden flex flex-col"
        >
          <PandaBg mascot mascotPosition="bottom-left" />

          {/* Header: logo + progress */}
          <div className="relative z-20 w-full bg-gradient-to-b from-background/90 to-background/0 backdrop-blur">
            <div className="max-w-2xl mx-auto px-5 pt-4 pb-4">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleBack}
                  aria-label="Back"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 text-primary" />
                </button>
                <img src={pandaLogo} alt="Panda VA" className="h-7 object-contain" />
                <div className="flex-1" />
              </div>
              <ProgressBar current={position} total={total} />
            </div>
          </div>

          {/* Question area — scrolls internally only if a single question's content exceeds viewport */}
          <div className="relative flex-1 min-h-0 overflow-y-auto">
            <div className="max-w-2xl mx-auto px-5 pt-6 pb-6">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={questions[index].id}
                  question={questions[index]}
                  value={answers[questions[index].id]}
                  encouragement={getEncouragement(position, total)}
                  onAnswer={handleAnswer}
                  onContinue={handleContinue}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Motivational "Panda Tip" — blended footer band */}
          <div className="relative z-10 px-5 pb-5 pt-2 bg-gradient-to-t from-background/85 to-transparent">
            <div className="max-w-2xl mx-auto">
              <MotivationalCard {...getStageQuote(position, total)} />
            </div>
          </div>
        </motion.div>
      )}

            {stage === "processing" && (
        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Processing onComplete={() => setStage("results")} durationMs={7000} />
        </motion.div>
      )}

      {stage === "results" && (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultsPreview
            recommendation={recommendation}
            onSubmit={handleSubmitEmail}
            loading={submitting}
          />
        </motion.div>
      )}

            {stage === "thanks" && (
        <motion.div
          key="thanks"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ThankYou firstName={firstName} onHome={resetAll} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
