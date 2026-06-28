import { motion } from "framer-motion";

import pandaGoals from "@/assets/panda-goals.png";
import pandaLearning from "@/assets/panda-learning.png";
import pandaOverwhelmed from "@/assets/panda-overwhelmed.png";
import pandaInterview from "@/assets/panda-interview.png";
import pandaProblem from "@/assets/panda-problem-solving.png";
import pandaCelebrate from "@/assets/panda-celebrating.png";

interface Props {
  questionId?: string;
  className?: string;
  priority?: boolean;
}

const getPandaImage = (questionId?: string) => {
  if (!questionId) return pandaGoals;

  switch (questionId) {
    case "q1":
    case "q2":
      return pandaGoals;

    case "q3":
    case "q4":
      return pandaLearning;

    case "q5":
    case "q6":
      return pandaOverwhelmed;

    case "q7":
    case "q8":
      return pandaInterview;

    case "q9":
    case "q10":
      return pandaProblem;

    default:
      return pandaCelebrate;
  }
};

export const PandaHeroIllustration = ({
  questionId,
  className = "",
  priority = false,
}: Props) => {
  const image = getPandaImage(questionId);

  return (
    <motion.div
      key={questionId}
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, hsl(270 95% 82% / 0.55), transparent 65%)",
        }}
      />

      <motion.img
  src={image}
  alt="Panda VA mascot"
  loading={priority ? "eager" : "lazy"}
  decoding="async"
  className="
    w-full
    h-auto
    object-cover
    select-none
    drop-shadow-[0_40px_80px_rgba(124,58,237,0.15)]

    [mask-image:radial-gradient(circle at center,black 55%,transparent 95%)]
[-webkit-mask-image:radial-gradient(circle at center,black 55%,transparent 95%)]
  "
/>

      {/* Soft background glow */}
      <div
        className="
          absolute inset-0
          rounded-full
          blur-[120px]
          bg-primary/10
          -z-10
        "
      />
    </motion.div>
  );
};