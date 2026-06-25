import { motion } from "framer-motion";
import { Check, Facebook, Home } from "lucide-react";
import { PandaBg } from "./PandaBg";
import pandaMascot from "@/assets/panda-mascot.png";

interface Props {
  firstName: string;
  onHome: () => void;
}

const checklist = [
  "Your recommended VA career path",
  "Why this path matches your background",
  "Your unique strengths & challenges",
  "A personalized step-by-step action plan",
  "Tools, skills, and platforms to start with",
];

export const ThankYou = ({ firstName, onHome }: Props) => {
  return (
    <div className="relative min-h-screen px-6 py-10 flex items-center overflow-hidden">
      <PandaBg dense />
      <div className="relative max-w-xl mx-auto w-full text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="mx-auto mb-2 w-fit relative"
        >
          <img src={pandaMascot} alt="Panda VA" className="h-44 w-44 object-contain drop-shadow-2xl animate-float" />
          <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
            <Check className="h-6 w-6" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-extrabold"
        >
          Thank you{firstName ? `, ${firstName}` : ""}! 🎉
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-muted-foreground"
        >
          Your personalized VA career path report is on its way to your inbox.
          Check your email in the next few minutes (don't forget the promotions tab!).
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 glass-strong rounded-[2rem] p-6 text-left"
        >
          <p className="font-semibold mb-4">What's inside your report:</p>
          <ul className="space-y-3">
            {checklist.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="h-6 w-6 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm sm:text-base">{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-col gap-3"
        >
          <a
            href="https://www.facebook.com/pandavaofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-lg px-6 py-4 shadow-glow hover:scale-[1.01] transition-transform"
          >
            <Facebook className="h-5 w-5" /> Follow Panda VA on Facebook
          </a>
          <button
            onClick={onHome}
            className="inline-flex items-center justify-center gap-2 rounded-3xl glass border-2 border-white/60 font-semibold px-6 py-4 hover:border-primary/40 transition-colors"
          >
            <Home className="h-5 w-5" /> Return Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};
