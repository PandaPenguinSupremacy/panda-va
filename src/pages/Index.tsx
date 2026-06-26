import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
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

// ─── Right panel content keyed by question id ─────────────────────────────
const PANEL_CONTENT: Record<string, { tip: string; label: string }> = {
  q1:  { label: "Your Journey Starts Here",   tip: "Every successful VA started exactly where you are right now." },
  q2:  { label: "Your Background Matters",    tip: "Your previous work experience is more valuable than you think." },
  q3:  { label: "Experience = Assets",        tip: "Even 0 years of experience is a starting point, not a barrier." },
  q4:  { label: "Find Your Flow",             tip: "The best VA niche is built around tasks that energize you." },
  q5:  { label: "Know Your Limits",           tip: "Avoiding what drains you is smart strategy, not weakness." },
  q6:  { label: "Work Your Way",              tip: "The right client relationship style makes everything easier." },
  q7:  { label: "Your Superpower",            tip: "The right VA niche can dramatically shorten your learning curve." },
  q8:  { label: "Communication Is Key",       tip: "Confidence grows with every client interaction — start anywhere." },
  q9:  { label: "Write With Confidence",      tip: "Clear writing is a skill you can build with daily practice." },
  q10: { label: "Show Up Boldly",             tip: "Clients hire VAs they connect with — video presence matters." },
  q11: { label: "Tools You Already Know",     tip: "You're closer to client-ready than you realize." },
  q12: { label: "Online Experience",          tip: "Many successful VAs started with zero remote experience." },
  q13: { label: "Your Professional Profile",  tip: "A polished profile is your 24/7 job application." },
  q14: { label: "Your Application History",   tip: "Consistency beats perfection when job hunting." },
  q15: { label: "Reading the Market",         tip: "Low reply rates are a pitch problem — not a skills problem." },
  q16: { label: "Your Biggest Block",         tip: "Naming your challenge is the first step to solving it." },
  q17: { label: "Time Is Capital",            tip: "Even 10 hours a week can land your first VA client." },
  q18: { label: "Your Dream Niche",           tip: "Your instincts about what excites you are usually right." },
};

const DEFAULT_PANEL = { label: "Almost There!", tip: "Consistency beats perfection." };

const MOTIVATIONAL_TIPS = [
  "Every successful VA started as a beginner.",
  "Many successful VAs started with zero remote experience.",
  "Your previous work experience is valuable.",
  "Consistency beats perfection.",
  "The right VA niche can dramatically shorten your learning curve.",
  "A clear niche makes you 3× more likely to land your first client.",
  "You're closer to client-ready than you think.",
];

// ─── Desktop Right Panel ──────────────────────────────────────────────────
const RightPanel = ({
  questionId,
  tipIndex,
}: {
  questionId?: string;
  tipIndex: number;
}) => {
  const content = questionId
    ? PANEL_CONTENT[questionId] ?? DEFAULT_PANEL
    : DEFAULT_PANEL;

  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative h-full px-10 py-12 overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 -right-16 h-[350px] w-[350px] rounded-full opacity-60 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, hsl(270 95% 85% / 0.9), transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 -left-10 h-[300px] w-[300px] rounded-full opacity-50 blur-3xl animate-blob"
          style={{ background: "radial-gradient(circle, hsl(280 95% 88% / 0.8), transparent 65%)", animationDelay: "3s" }}
        />
        <Sparkles className="absolute top-[12%] right-[18%] h-5 w-5 text-primary/40 animate-sparkle" />
        <Heart className="absolute bottom-[20%] left-[12%] h-4 w-4 text-primary-glow/40 fill-primary-glow/30 animate-float" />
        <Sparkles className="absolute bottom-[35%] right-[10%] h-4 w-4 text-primary/30 animate-sparkle" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* Panda illustration */}
      <motion.div
        key={questionId}
        initial={{ opacity: 0, scale: 0.88, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-8"
      >
        {/* Pulse ring */}
        <motion.div
          className="absolute rounded-full border border-primary/20"
          style={{ width: 220, height: 220 }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={pandaMascot}
          alt="Panda VA mascot"
          className="w-56 h-56 object-contain drop-shadow-2xl animate-float"
        />
      </motion.div>

      {/* Label badge */}
      <motion.div
        key={`label-${questionId}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest mb-5"
      >
        <Sparkles className="h-3.5 w-3.5" />
        {content.label}
      </motion.div>

      {/* Motivational tip card */}
      <motion.div
        key={`tip-${tipIndex}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45 }}
        className="glass-strong rounded-3xl p-5 text-center max-w-xs w-full"
      >
        <p className="text-sm font-semibold text-foreground leading-relaxed">
          <span className="text-primary text-lg mr-1">"</span>
          {content.tip}
          <span className="text-primary text-lg ml-1">"</span>
        </p>
      </motion.div>

      {/* Dot indicators for tips */}
      <div className="flex gap-1.5 mt-4">
        {MOTIVATIONAL_TIPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === tipIndex % MOTIVATIONAL_TIPS.length
                ? "w-4 bg-primary"
                : "w-1.5 bg-primary/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────
const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passedQ6, setPassedQ6] = useState(false);
  const [passedQ12, setPassedQ12] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

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

  // Rotate tips every 8s while on questions stage
  useEffect(() => {
    if (stage !== "questions") return;
    const interval = setInterval(() => setTipIndex((t) => t + 1), 8000);
    return () => clearInterval(interval);
  }, [stage]);

  // Advance tip when question changes
  useEffect(() => {
    setTipIndex((t) => t + 1);
  }, [index]);

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
  const currentQuestionId = questions[index]?.id;

  return (
    <AnimatePresence mode="wait">
      {/* ── Landing ── */}
      {stage === "landing" && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Landing onStart={handleStart} />
        </motion.div>
      )}

      {/* ── Questions — split-screen on desktop ── */}
      {stage === "questions" && (
        <motion.div
          key="questions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative min-h-screen overflow-hidden"
        >
          <PandaBg />

          {/* Split layout wrapper */}
          <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">

            {/* ── Left: Questions ── */}
            <div className="relative flex flex-col lg:overflow-y-auto lg:max-h-screen">
              {/* Sticky header */}
              <div className="sticky top-0 z-20 px-4 sm:px-5 pt-3 pb-2 bg-gradient-to-b from-background/90 to-background/0 backdrop-blur">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="h-9 w-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4 text-primary" />
                  </button>
                  <img src={pandaLogo} alt="Panda VA" className="h-10 sm:h-12 w-auto" />
                  <div className="flex-1" />
                </div>
                <ProgressBar current={position} total={total} />
              </div>

              {/* Mobile-only mini tip */}
              <div className="lg:hidden px-4 sm:px-5 pt-2 pb-1">
                <motion.p
                  key={`mobile-tip-${tipIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-primary/70 font-medium text-center italic"
                >
                  "{PANEL_CONTENT[currentQuestionId]?.tip ?? DEFAULT_PANEL.tip}"
                </motion.p>
              </div>

              {/* Question card */}
              <div className="flex-1 px-4 sm:px-5 pt-3 pb-8 lg:pb-12">
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

            {/* ── Right: Branded panel (desktop only) ── */}
            <div className="hidden lg:block relative bg-gradient-to-br from-primary-soft/60 to-background border-l border-primary/10">
              <RightPanel questionId={currentQuestionId} tipIndex={tipIndex} />
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Transitions ── */}
      {stage === "transition-6" && (
        <motion.div key="transition-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TransitionPage variant="halfway" onContinue={() => setStage("questions")} />
        </motion.div>
      )}

      {stage === "transition-12" && (
        <motion.div key="transition-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TransitionPage variant="almost" onContinue={() => setStage("questions")} />
        </motion.div>
      )}

      {/* ── Processing ── */}
      {stage === "processing" && (
        <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Processing onComplete={() => setStage("results")} durationMs={7000} />
        </motion.div>
      )}

      {/* ── Results ── */}
      {stage === "results" && (
        <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ResultsPreview
            recommendation={recommendation}
            onSubmit={handleSubmitEmail}
            loading={submitting}
          />
        </motion.div>
      )}

      {/* ── Thanks ── */}
      {stage === "thanks" && (
        <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ThankYou firstName={firstName} onHome={resetAll} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;