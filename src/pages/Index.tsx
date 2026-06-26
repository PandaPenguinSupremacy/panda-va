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
 * AtmosphericPanda
 * Blended into the question page background.
 * Positioned bottom-left (like reference image), very low opacity,
 * with blur and a gradient mask so it fades into the background.
 * Purely decorative — pointer-events none, aria-hidden.
 */
const AtmosphericPanda = () => (
  <div
    aria-hidden
    className="pointer-events-none select-none absolute"
    style={{
      bottom: "0%",
      left: "-5%",
      width: "42%",
      maxWidth: "340px",
      opacity: 0.12,
      filter: "blur(0.4px)",
      maskImage:
        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 85%)",
      WebkitMaskImage:
        "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, transparent 85%)",
      zIndex: 0,
    }}
  >
    <img
      src={pandaMascot}
      alt=""
      className="w-full h-auto object-contain"
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
   * Viewport lock: all assessment stages (everything except landing)
   * must never scroll. We set overflow:hidden + height:100% on
   * html / body / #root and restore on cleanup.
   */
  useEffect(() => {
    const shouldLock = stage !== "landing";
    const targets = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ].filter(Boolean) as HTMLElement[];

    if (shouldLock) {
      targets.forEach((el) => {
        el.style.height = "100%";
        el.style.overflow = "hidden";
      });
    } else {
      targets.forEach((el) => {
        el.style.height = "";
        el.style.overflow = "";
      });
    }
    return () => {
      targets.forEach((el) => {
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

      {/* ── Landing — scrollable, no lock ───────────────────────────── */}
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

      {/* ── Questions ────────────────────────────────────────────────────
          Layout spec:
            ┌─────────────────────────────────────┐
            │ Logo + Progress (pinned)            │
            ├─────────────────────────────────────┤
            │ [atmospheric panda ghost bg]        │
            │ Question text                       │
            │ □ option  □ option  □ option        │
            │ "Your background matters."          │
            └─────────────────────────────────────┘
          Mobile: header pinned, content fills rest, only options scroll
          Desktop: max-w-[720px] centered, vertically centered content
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
          {/* Pastel blob background */}
          <PandaBg />

          {/* Atmospheric panda — bottom-left ghost, opacity 0.12, blended */}
          <AtmosphericPanda />

          {/* ── MOBILE ── */}
          <div className="flex flex-col h-full lg:hidden">
            {/* Pinned header */}
            <div
              className="shrink-0 px-4 pt-3 pb-2 relative z-20"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--background) / 0.92) 60%, transparent)",
                backdropFilter: "blur(6px)",
              }}
            >
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

            {/* Question content — only this area may scroll */}
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

          {/* ── DESKTOP — max-w-720, vertically centered ── */}
          <div className="hidden lg:flex lg:flex-col h-full overflow-hidden">
            {/* Pinned header */}
            <div
              className="shrink-0 relative z-20"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--background) / 0.88) 60%, transparent)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="max-w-[720px] mx-auto px-6 pt-5 pb-3">
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
            </div>

            {/* Vertically centered question — no scroll */}
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

      {/* ── Transition pages — 100dvh locked ────────────────────────── */}
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

      {/* ── Processing — 100dvh locked ───────────────────────────────── */}
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

      {/* ── Results — scrollable (long form content) ─────────────────── */}
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

      {/* ── Thank You — scrollable (long checklist) ──────────────────── */}
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