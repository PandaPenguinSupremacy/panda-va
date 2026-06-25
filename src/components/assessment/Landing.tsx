import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Compass, ListChecks, Lock, Star, Shield, Heart } from "lucide-react";
import { PandaBg } from "./PandaBg";
import pandaMascot from "@/assets/panda-mascot.png";
import pandaLogo from "@/assets/panda-logo-new.png";

interface Props {
  onStart: () => void;
}

const benefits = [
  { icon: Compass, text: "Discover the VA path that fits you best" },
  { icon: Target, text: "Identify what's holding you back" },
  { icon: Sparkles, text: "Get personalized next steps" },
  { icon: ListChecks, text: "Receive a tailored action plan" },
];

const trustItems = [
  { icon: Star, title: "Beginner-friendly", desc: "Perfect for those just getting started." },
  { icon: Shield, title: "Private & Secure", desc: "Your information is safe and will never be shared." },
  { icon: Heart, title: "Built for You", desc: "Personalized results based on your unique background." },
];

export const Landing = ({ onStart }: Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PandaBg dense />

      <main className="relative px-5 pt-5 pb-8 sm:pt-7">
        <div className="mx-auto w-full max-w-xl text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto"
          >
            <img src={pandaLogo} alt="Panda VA" className="h-10 sm:h-12 mx-auto object-contain" />
            <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-primary/80">
              Prepare · Present · Get Hired
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl sm:text-4xl font-extrabold leading-[1.1] text-balance text-foreground"
          >
            Discover Your Best
            <br />
            <span className="font-script text-4xl sm:text-5xl text-gradient inline-block mt-1">
              VA Career Path
            </span>
            <Heart className="inline-block h-5 w-5 ml-1 text-primary-glow fill-primary-glow/40 -mt-6" />
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-muted-foreground text-balance max-w-md mx-auto"
          >
            Take this free assessment to discover which Virtual Assistant career path best matches your
            experience, strengths, interests, and goals.
          </motion.p>

          {/* Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative mx-auto mt-3 w-[200px] sm:w-[240px]"
          >
            <img
              src={pandaMascot}
              alt="Friendly Panda VA mascot with headset"
              className="w-full h-auto drop-shadow-2xl animate-float"
              width={1024}
              height={1024}
            />
          </motion.div>

          {/* Feature cards */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 grid gap-2 text-left"
          >
            {benefits.map((b, i) => (
              <motion.li
                key={b.text}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass rounded-2xl p-3 flex items-center gap-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="h-9 w-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 shadow-sm">
                  <b.icon className="h-4 w-4" />
                </span>
                <span className="font-semibold text-sm text-foreground">{b.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4"
          >
            <button
              onClick={onStart}
              className="group inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-base px-7 py-4 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform w-full"
            >
              <Sparkles className="h-5 w-5" />
              Start My Free Assessment
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              Takes only 2 minutes • 100% Free
            </p>
          </motion.div>

          {/* Trust */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-5 glass-strong rounded-[2rem] p-4"
          >
            <p className="font-semibold text-sm text-foreground">Trusted by aspiring VAs like you</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {trustItems.map((t) => (
                <div key={t.title}>
                  <t.icon className="h-5 w-5 mx-auto text-primary fill-primary/10" />
                  <p className="mt-1 text-xs font-semibold">{t.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>

            <figure className="mt-3 rounded-2xl bg-primary-mist/60 p-3 text-left">
              <blockquote className="text-xs italic text-foreground">
                <span className="text-primary text-xl leading-none mr-1">“</span>
                This assessment helped me finally understand what path is right for me and what I should do next!
              </blockquote>
              <figcaption className="mt-1.5 text-xs text-primary font-semibold">– Ariane T.</figcaption>
            </figure>
          </motion.section>
        </div>
      </main>

      <footer className="relative px-6 pb-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Panda VA · Prepare · Present · Get Hired
      </footer>
    </div>
  );
};
