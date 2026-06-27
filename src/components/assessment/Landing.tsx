import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, Compass, ListChecks, Lock, Star, Shield, Heart } from "lucide-react";
import { PandaBg } from "./PandaBg";
import { PandaHeroIllustration } from "./PandaHeroIllustration";
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
  { icon: Shield, title: "Private & Secure", desc: "Your information is safe and never shared." },
  { icon: Heart, title: "Built for You", desc: "Personalized to your unique background." },
];

export const Landing = ({ onStart }: Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <PandaBg dense />

      {/* Header (logo only, kept light) */}
      <header className="relative px-5 sm:px-10 pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <img src={pandaLogo} alt="Panda VA" className="h-10 sm:h-12 object-contain" />
          <p className="hidden sm:block text-[11px] uppercase tracking-[0.28em] font-semibold text-primary/80">
            Prepare · Present · Get Hired
          </p>
        </div>
      </header>

      <main className="relative px-5 sm:px-10 pt-6 sm:pt-10 pb-16">
        <div className="mx-auto max-w-7xl grid gap-10 lg:gap-12 lg:grid-cols-12 items-center">
          {/* LEFT — Hero illustration */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex justify-center lg:justify-start">
            <PandaHeroIllustration className="w-[78%] sm:w-[60%] lg:w-full max-w-[440px]" priority />
          </div>

          {/* CENTER — Main content */}
          <div className="lg:col-span-5 order-1 lg:order-2 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Free Career Path Assessment
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-balance text-foreground"
            >
              Discover Your Best
              <br />
              <span className="font-script text-5xl sm:text-6xl lg:text-7xl text-gradient inline-block mt-1">
                VA Career Path
              </span>
              <Heart className="inline-block h-5 w-5 ml-1 text-primary-glow fill-primary-glow/40 -mt-6" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-muted-foreground text-balance max-w-xl mx-auto lg:mx-0"
            >
              A free 2-minute assessment that matches your experience, strengths, and goals to
              the Virtual Assistant career path where you're most likely to thrive.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-7"
            >
              <button
                onClick={onStart}
                className="group inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-lg px-7 py-5 shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-transform w-full sm:w-auto"
              >
                <Sparkles className="h-5 w-5" />
                Start My Free Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-3 flex items-center justify-center lg:justify-start gap-1.5 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" />
                Takes only 2 minutes • 100% Free • No credit card
              </p>
            </motion.div>

            {/* Benefit list (compact, shown on mobile + desktop center) */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 grid sm:grid-cols-2 gap-3 text-left"
            >
              {benefits.map((b) => (
                <li
                  key={b.text}
                  className="glass rounded-2xl p-3.5 flex items-center gap-3"
                >
                  <span className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-sm text-foreground">{b.text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT — Trust + Testimonial */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 order-3 space-y-4"
          >
            <div className="glass-strong rounded-3xl p-5">
              <p className="text-sm font-bold text-foreground">Trusted by aspiring VAs</p>
              <ul className="mt-4 space-y-3">
                {trustItems.map((t) => (
                  <li key={t.title} className="flex items-start gap-3">
                    <span className="h-9 w-9 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                      <t.icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{t.title}</p>
                      <p className="text-[11px] leading-snug text-muted-foreground">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-5">
  <p className="text-3xl font-bold text-primary">2 Minutes</p>
  <p className="text-sm text-muted-foreground">
    Complete the assessment and discover your ideal VA path.
  </p>
</div>
          </motion.aside>
        </div>
      </main>

      <footer className="relative px-6 pb-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Panda VA · Prepare · Present · Get Hired
      </footer>
    </div>
  );
};