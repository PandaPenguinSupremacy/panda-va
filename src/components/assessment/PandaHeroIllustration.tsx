import { motion } from "framer-motion";
import pandaHero from "@/assets/panda-hero.png";

interface Props {
  className?: string;
  priority?: boolean;
}

/**
 * Premium full-body Panda VA mascot illustration: panda at desk with laptop and headset.
 * Composed with a soft lavender ambient glow so it sits naturally inside the pastel background.
 */
export const PandaHeroIllustration = ({ className = "", priority = false }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {/* Lavender ambient glow / floor shadow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, hsl(270 95% 82% / 0.55), transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="absolute left-1/2 bottom-[6%] -translate-x-1/2 h-6 w-3/5 rounded-full blur-2xl opacity-50"
        style={{ background: "radial-gradient(ellipse, hsl(262 60% 40% / 0.4), transparent 70%)" }}
        aria-hidden
      />

      <motion.img
        src={pandaHero}
        alt="Panda VA mascot sitting at a desk with a laptop and headset, ready to help"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={1024}
        height={1365}
        className="relative w-full h-auto select-none drop-shadow-[0_30px_40px_rgba(124,58,237,0.25)] animate-float"
      />
    </motion.div>
  );
};