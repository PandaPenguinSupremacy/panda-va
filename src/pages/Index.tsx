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
  getRecommendation,
} from "@/lib/assessment";
import { loadState, saveState, clearState } from "@/lib/storage";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { Landing } from "@/components/assessment/Landing";
import { TransitionPage } from "@/components/assessment/TransitionPage";
import { Processing } from "@/components/assessment/Processing";
import { ResultsPreview } from "@/components/assessment/ResultsPreview";
import { ThankYou } from "@/components/assessment/ThankYou";
import { PandaBg } from "@/components/assessment/PandaBg";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import pandaLogo from "@/assets/panda-logo-new.png";
import pandaMascot from "@/assets/panda-mascot.png";

type Stage =
  | "landing"
  | "questions"
  | "transition-6"
  | "transition-12"
  | "processing"
  | "results"
  | "thanks";

/**
 * Atmospheric ghost panda — blended into the question page background.
 * Opacity 0.10–0.12, heavy blur, gradient mask so it fades away at bottom.
 * Positioned behind and slightly above the question card.
 * This is purely decorative; screen readers skip it.
 */
const AtmosphericPanda = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute select-none"
    style={{
      top: "60px",
      right: "-60px",
      opacity: 0.11,
      filter: "blur(1.5px)",
      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)",
      zIndex: 0,
    }}
  >
    <img
      src={pandaMascot}
      alt=""
      className="w-64 h-64 object-contain"
      draggable={false}
    />
  </div>
);

const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passedQ6, setPassedQ6] = useState(false);
  const [passedQ12, setPassedQ12] = useState(false);

  /**
   * Enforce no-scroll on html/body/#root for all non-landing stages.
   * Landing is a scrollable page by design (long content).
   * All assessment stages must be fully viewport-locked.
   */
  useEffect(() => {
    const needsLock = stage !== "landing";
    const els = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ].filter(Boolean) as HTMLElement[];

    if (needsLock) {
      els.forEach((el) => {
        el.style.height = "100%";
        el.style.overflow = "hidden";
      });
    } else {
      els.forEach((el) => {
        el.style.height = "";
        el.style.overflow = "";
      });
    }

    return () => {
      els.forEach((el) => {
        el.style.height = "";
        el.style.overflow = "";
      });
    };
  }, [stage]);

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
    setPassedQ6(false);
    setPassedQ12(false);
  };

  const handleAnswer = (value: AnswerValue) => {
    const q = questions[index];
    setAnswers((a) => ({ ...a, [q.id]: value }));
  };

  const handleContinue = () => {
    const currentQ = questions[index];
    const next = getNextQuestionIndex(index, { ...answers });

    if (!passedQ6 && currentQ.id === "q6") {
      setPassedQ6(true);
      setIndex(next);
      setStage("transition-6");
      return;
    }
    if (!passedQ12 && currentQ.id === "q12") {
      setPassedQ12(true);
      setIndex(next);
      setStage("transition-12");
      return;
    }
    if (next >= questions.length) {
      setStage("processing");
      return;
    }
    setIndex(next);
  };

  const handleBack = () => {
    if (index === 0) {
      setStage("landing");
      return;
    }
    setIndex(getPrevQuestionIndex(index, answers));
  };

  const handleSubmitEmail = async ({
    firstName: fn,
    email,
  }: {
    firstName: string;
    email: string;
  }) => {
    setSubmitting(true);
    try {
      const submissionData = {
        first_name: fn,
        email,
        answers_json: answers,
        recommended_path: recommendation.path,
      };

      const { error } = await supabase
        .from("assessment_submissions")
        .insert(submissionData);
      if (error) throw error;

      const makeResponse = await fetch(
        "https://hook.us2.make.com/m0yo0uge2nxnjdwrncpl6e14f3i5455c",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        }
      );
      console.log("Make response status:", makeResponse.status);
      const makeText = await makeResponse.text();
      console.log("Make response body:", makeText);

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
    setPassedQ6(false);
    setPassedQ12(false);
    setStage("landing");
  };

  const total = getTotalActiveQuestions(answers);
  const position = getActiveQuestionPosition(index, answers);

  return (
    <AnimatePresence mode="wait">
      {/* ── Landing (scrollable) ────────────────────────────────────────── */}
      {stage === "landing" && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Landing onStart={handleStart} />
        </motion.div>
      )}

      {/* ── Questions ─────────────────────────────────────────────────────
          Viewport-locked (100dvh, overflow:hidden).
          Atmospheric panda is blended behind content (opacity ~0.11, blur).
          Mobile: header pinned, only option list scrolls if needed.
          Desktop: max-w-[720px] centered, vertically centered content.
      ──────────────────────────────────────────────────────────────────── */}
      {stage === "questions" && (
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative overflow-hidden"
          style={{ height: "100dvh" }}
        >
          <PandaBg />
          {/* Atmospheric panda ghost — integrated into background */}
          <AtmosphericPanda />

          {/* ── Mobile layout ── */}
          <div className="flex flex-col h-full lg:hidden">
            {/* Pinned header */}
            <div className="shrink-0 px-4 pt-3 pb-2 relative z-20 bg-gradient-to-b from-background/90 to-background/0 backdrop-blur">
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={handleBack}
                  aria-label="Back"
                  className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 text-primary" />
                </button>
                <img src={pandaLogo} alt="Panda VA" className="h-9 w-auto" />
              </div>
              <ProgressBar current={position} total={total} />
            </div>

            {/* Question content — fills remaining space; only this scrolls if needed */}
            <div className="flex-1 overflow-y-auto px-4 pt-2 pb-4 relative z-10">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={questions[index].id}
                  question={questions[index]}
                  value={answers[questions[index].id]}
                  onAnswer={handleAnswer}
                  onContinue={handleContinue}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* ── Desktop layout: max-w-[720px], vertically centered ── */}
          <div className="hidden lg:flex lg:flex-col h-full overflow-hidden">
            {/* Sticky header */}
            <div className="shrink-0 relative z-20 max-w-[720px] mx-auto w-full px-6 pt-5 pb-3">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleBack}
                  aria-label="Back"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 text-primary" />
                </button>
                <img src={pandaLogo} alt="Panda VA" className="h-12 w-auto" />
              </div>
              <ProgressBar current={position} total={total} />
            </div>

            {/* Vertically centered question area */}
            <div className="flex-1 flex items-center justify-center px-6 overflow-hidden">
              <div className="w-full max-w-[720px] relative z-10">
                <AnimatePresence mode="wait">
                  <QuestionCard
                    key={questions[index].id}
                    question={questions[index]}
                    value={answers[questions[index].id]}
                    onAnswer={handleAnswer}
                    onContinue={handleContinue}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Transition pages (both 100dvh, no-scroll) ─────────────────── */}
      {stage === "transition-6" && (
        <motion.div
          key="transition-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}
        >
          <TransitionPage variant="halfway" onContinue={() => setStage("questions")} />
        </motion.div>
      )}
      {stage === "transition-12" && (
        <motion.div
          key="transition-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}
        >
          <TransitionPage variant="almost" onContinue={() => setStage("questions")} />
        </motion.div>
      )}

      {/* ── Processing ────────────────────────────────────────────────── */}
      {stage === "processing" && (
        <motion.div
          key="processing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}
        >
          <Processing onComplete={() => setStage("results")} durationMs={7000} />
        </motion.div>
      )}

      {/* ── Results (scrollable — long form content) ───────────────────── */}
      {stage === "results" && (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ResultsPreview
            recommendation={recommendation}
            onSubmit={handleSubmitEmail}
            loading={submitting}
          />
        </motion.div>
      )}

      {/* ── Thank You (scrollable — long checklist) ────────────────────── */}
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