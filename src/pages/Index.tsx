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
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { Landing } from "@/components/assessment/Landing";
import { Processing } from "@/components/assessment/Processing";
import { ResultsPreview } from "@/components/assessment/ResultsPreview";
import { ThankYou } from "@/components/assessment/ThankYou";
import { PandaBg } from "@/components/assessment/PandaBg";
import { TransitionPage } from "@/components/assessment/TransitionPage";
import { MotivationalCard } from "@/components/assessment/MotivationalCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import pandaLogo from "@/assets/panda-logo-new.png";
import { PandaHeroIllustration } from "@/components/assessment/PandaHeroIllustration";

type Stage =
  | "landing"
  | "questions"
  | "transition-6"
  | "transition-12"
  | "processing"
  | "results"
  | "thanks";

const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passedQ6, setPassedQ6]   = useState(false);
  const [passedQ12, setPassedQ12] = useState(false);

  // Viewport lock for all assessment stages
  useEffect(() => {
    const lock = stage !== "landing" && stage !== "results" && stage !== "thanks";
    const els = [
      document.documentElement,
      document.body,
      document.getElementById("root"),
    ].filter(Boolean) as HTMLElement[];
    if (lock) {
      els.forEach((el) => { el.style.height = "100%"; el.style.overflow = "hidden"; });
    } else {
      els.forEach((el) => { el.style.height = ""; el.style.overflow = ""; });
    }
    return () => { els.forEach((el) => { el.style.height = ""; el.style.overflow = ""; }); };
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

  const handleStart = () => { setStage("questions"); setIndex(0); setPassedQ6(false); setPassedQ12(false); };

  const handleAnswer = (value: AnswerValue) => {
    setAnswers((a) => ({ ...a, [questions[index].id]: value }));
  };

  const handleContinue = () => {
    const currentQ = questions[index];
    const next = getNextQuestionIndex(index, { ...answers });

    if (!passedQ6 && currentQ.id === "q6") {
      setPassedQ6(true); setIndex(next); setStage("transition-6"); return;
    }
    if (!passedQ12 && currentQ.id === "q12") {
      setPassedQ12(true); setIndex(next); setStage("transition-12"); return;
    }
    if (next >= questions.length) { setStage("processing"); return; }
    setIndex(next);
  };

  const handleBack = () => {
    if (index === 0) { setStage("landing"); return; }
    setIndex(getPrevQuestionIndex(index, answers));
  };

  const handleSubmitEmail = async ({ firstName: fn, email }: { firstName: string; email: string }) => {
    setSubmitting(true);
    try {
      const submissionData = { first_name: fn, email, answers_json: answers, recommended_path: recommendation.path };
      const { error } = await supabase.from("assessment_submissions").insert(submissionData);
      if (error) throw error;
      await fetch("https://hook.us2.make.com/m0yo0uge2nxnjdwrncpl6e14f3i5455c", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      setFirstName(fn); clearState(); setStage("thanks");
    } catch (err) {
      console.error(err); toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    clearState(); setAnswers({}); setIndex(0); setFirstName("");
    setPassedQ6(false); setPassedQ12(false); setStage("landing");
  };

  const total    = getTotalActiveQuestions(answers);
  const position = getActiveQuestionPosition(index, answers);
  const currentQ = questions[index];
  
  return (
    <AnimatePresence mode="wait">

      {/* ── Landing ─────────────────────────────────────────────────── */}
      {stage === "landing" && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Landing onStart={handleStart} />
        </motion.div>
      )}

      {/* ── Questions ────────────────────────────────────────────────
          Layout:
          ┌─────────────────────────────────────────────────────┐
          │  Logo (left)               Q {n} of {total} (right) │ ← 56px header
          ├─────────────────────────────────────────────────────┤
          │                                                     │
          │  [Category illustration — atmospheric, left/bg]    │
          │                   [Question + options  — right]     │
          │                                                     │
          ├─────────────────────────────────────────────────────┤
          │  Panda Tip card (subtle footer band)                │ ← 56px footer
          └─────────────────────────────────────────────────────┘
          Mobile: stacked, illustration behind content, no scroll
      ────────────────────────────────────────────────────────── */}
      {stage === "questions" && (
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative flex flex-col overflow-hidden bg-background"
          style={{ height: "100dvh" }}
        >
          {/* Pastel blob background */}
          <PandaBg />

          {/* ── Header ── */}
          <header className="shrink-0 relative z-20 flex items-center justify-between px-5 sm:px-8 h-14"
            style={{ background: "linear-gradient(to bottom, hsl(var(--background)/0.92) 50%, transparent)" }}>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                aria-label="Go back"
                className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/8 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <img src={pandaLogo} alt="Panda VA" className="h-7 object-contain opacity-80" />
            </div>
            {/* Progress text only — no bar */}
            <p className="text-xs font-medium text-muted-foreground tabular-nums">
              Question <span className="text-foreground font-semibold">{position}</span> of {total}
            </p>
          </header>

          {/* ── Main content area ── */}
          <div className="relative flex-1 min-h-0 flex">

            {/* Atmospheric illustration — left side on desktop, full-bg on mobile */}
            {/* Desktop: absolute left column, blended */}
            <div
  className="hidden lg:flex absolute inset-y-0 left-0 w-[50%] items-end justify-center pointer-events-none"
  aria-hidden
>
  <div
    className="
      absolute inset-0
      bg-gradient-to-r
      from-primary/10
      via-transparent
      to-transparent
      blur-3xl
    "
  />

  <PandaHeroIllustration
    questionId={currentQ.id}
    className="w-[90%] max-w-[700px]"
  />
</div>

            {/* Mobile: atmospheric behind content */}
            <div
  className="
    lg:hidden
    absolute
    bottom-0
    left-0
    w-full
    pointer-events-none
    opacity-20
  "
>
  <PandaHeroIllustration
    questionId={currentQ.id}
    className="w-[80%] mx-auto"
  />
</div>

            {/* Question content — right on desktop, centered on mobile */}
            <div className="relative z-10 w-full flex items-center justify-end lg:justify-end">
              <div className="w-full lg:w-[58%] xl:w-[55%] px-5 sm:px-8 lg:pr-10 xl:pr-16 overflow-y-auto max-h-full py-4">
                <AnimatePresence mode="wait">
                  <QuestionCard
                    key={currentQ.id}
                    question={currentQ}
                    value={answers[currentQ.id]}
                    encouragement={getEncouragement(position, total)}
                    onAnswer={handleAnswer}
                    onContinue={handleContinue}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          
        </motion.div>
      )}

      {/* ── Transition pages ─────────────────────────────────────── */}
      {stage === "transition-6" && (
        <motion.div key="t6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}>
          <TransitionPage variant="halfway" onContinue={() => setStage("questions")} />
        </motion.div>
      )}
      {stage === "transition-12" && (
        <motion.div key="t12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}>
          <TransitionPage variant="almost" onContinue={() => setStage("questions")} />
        </motion.div>
      )}

      {/* ── Processing ───────────────────────────────────────────── */}
      {stage === "processing" && (
        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ height: "100dvh", overflow: "hidden" }}>
          <Processing onComplete={() => setStage("results")} durationMs={7000} />
        </motion.div>
      )}

      {/* ── Results (scrollable) ─────────────────────────────────── */}
      {stage === "results" && (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultsPreview recommendation={recommendation} onSubmit={handleSubmitEmail} loading={submitting} />
        </motion.div>
      )}

      {/* ── Thanks (scrollable) ──────────────────────────────────── */}
      {stage === "thanks" && (
        <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ThankYou firstName={firstName} onHome={resetAll} />
        </motion.div>
      )}

    </AnimatePresence>
  );
};

export default Index;