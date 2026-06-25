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

type Stage =
  | "landing"
  | "questions"
  | "transition-6"
  | "transition-12"
  | "processing"
  | "results"
  | "thanks";

const Index = () => {
  console.log("INDEX COMPONENT LOADED - VERSION 2");

const Index = () => {
  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [firstName, setFirstName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [passedQ6, setPassedQ6] = useState(false);
  const [passedQ12, setPassedQ12] = useState(false);

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

    // After Q6 — first transition
    if (!passedQ6 && currentQ.id === "q6") {
      setPassedQ6(true);
      setIndex(next);
      setStage("transition-6");
      return;
    }

    // After Q12 — second transition
    if (!passedQ12 && currentQ.id === "q12") {
      setPassedQ12(true);
      setIndex(next);
      setStage("transition-12");
      return;
    }

    // End of questions
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

    // Send lead to Make.com
    console.log("Sending to Make:", submissionData);

const makeResponse = await fetch(
  "https://hook.us2.make.com/m0yo0uge2nxnjdwrncpl6e14f3i5455c",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
          className="relative min-h-screen overflow-hidden"
        >
          <PandaBg />
          <div className="relative max-w-2xl mx-auto px-5 pt-6 pb-16">
            {/* Sticky header: logo + progress */}
            <div className="sticky top-0 z-20 -mx-5 px-5 pt-2 pb-3 bg-gradient-to-b from-background/85 to-background/0 backdrop-blur">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={handleBack}
                  aria-label="Back"
                  className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors shrink-0"
                >
                  <ArrowLeft className="h-4 w-4 text-primary" />
                </button>
                <img src={pandaLogo} alt="Panda VA" className="h-14 w-auto" />
                <div className="flex-1" />
              </div>
              <ProgressBar current={position} total={total} />
            </div>

            <div className="mt-8">
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
        </motion.div>
      )}

      {stage === "transition-6" && (
        <motion.div key="transition-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TransitionPage
            variant="halfway"
            onContinue={() => setStage("questions")}
          />
        </motion.div>
      )}

      {stage === "transition-12" && (
        <motion.div key="transition-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <TransitionPage
            variant="almost"
            onContinue={() => setStage("questions")}
          />
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
        <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ThankYou firstName={firstName} onHome={resetAll} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;