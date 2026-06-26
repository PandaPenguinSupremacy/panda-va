import { motion } from "framer-motion";
import {
  ArrowRight, Sparkles, Target, Compass, ListChecks, Lock,
  Star, Shield, Heart, Zap, TrendingUp, Quote, CheckCircle2, Users
} from "lucide-react";
import { PandaBg } from "./PandaBg";
import pandaLogo from "@/assets/panda-logo-new.png";

interface Props {
  onStart: () => void;
}

// ─── Mobile-only data ───────────────────────────────────────────────────────
const benefits = [
  { icon: Compass,    text: "Discover the VA path that fits you best" },
  { icon: Target,     text: "Identify what's holding you back" },
  { icon: Sparkles,   text: "Get personalized next steps" },
  { icon: ListChecks, text: "Receive a tailored action plan" },
];

const trustItems = [
  { icon: Star,   title: "Beginner-friendly", desc: "Perfect for those just getting started." },
  { icon: Shield, title: "Private & Secure",  desc: "Your information is safe and will never be shared." },
  { icon: Heart,  title: "Built for You",     desc: "Personalized results based on your unique background." },
];

// ─── Desktop-only data ────────────────────────────────────────────────────
const desktopBenefitCards = [
  { icon: Sparkles,   label: "Personalized",      sub: "Just for you" },
  { icon: Zap,        label: "Quick & Easy",       sub: "Takes only 2–3 mins" },
  { icon: TrendingUp, label: "Actionable Results", sub: "Clear next steps" },
];

const whatYouGet = [
  { icon: Compass,    text: "Discover the VA path that fits you best" },
  { icon: Target,     text: "Identify what's holding you back" },
  { icon: Sparkles,   text: "Get personalized next steps" },
  { icon: ListChecks, text: "Receive a tailored action plan" },
];

// ─── Stagger helpers ──────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut", delay },
});

// ─── Decorative SVG orb — replaces panda on landing hero ─────────────────
const HeroOrb = () => (
  <div className="relative flex items-center justify-center w-full h-full">
    {/* Outer soft ring */}
    <motion.div
      className="absolute rounded-full border border-primary/15"
      style={{ width: 340, height: 340 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    />
    {/* Middle ring */}
    <motion.div
      className="absolute rounded-full border border-primary/10"
      style={{ width: 250, height: 250 }}
      animate={{ rotate: -360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    />
    {/* Inner glow core */}
    <div
      className="absolute rounded-full"
      style={{
        width: 180,
        height: 180,
        background: "radial-gradient(circle, hsl(270 95% 85% / 0.55) 0%, hsl(260 90% 90% / 0.2) 60%, transparent 80%)",
      }}
    />
    {/* Floating sparkle dots on orbit */}
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.div
        key={i}
        className="absolute h-2.5 w-2.5 rounded-full bg-primary/40"
        style={{
          top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 125}px - 5px)`,
          left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 125}px - 5px)`,
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
    {/* Center logo mark */}
    <motion.div
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 flex items-center justify-center h-20 w-20 rounded-full gradient-primary shadow-glow"
    >
      <Sparkles className="h-9 w-9 text-white" />
    </motion.div>
  </div>
);

export const Landing = ({ onStart }: Props) => {
  return (
    <div className="relative overflow-hidden">
      <PandaBg dense />

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP LAYOUT  (lg and above — 3 columns, 100vh, no scroll)
      ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex h-screen w-full overflow-hidden relative">

        {/* ── Top-left logo watermark ── */}
        <div className="absolute top-5 left-6 z-20 flex items-center gap-2">
          <img src={pandaLogo} alt="Panda VA" className="h-9 object-contain" />
        </div>

        {/* ── Top-right dot grid decoration ── */}
        <div className="absolute top-4 right-6 z-10 opacity-30">
          <svg width="110" height="90" viewBox="0 0 110 90" fill="none">
            {Array.from({ length: 6 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 15 + 7}
                  cy={row * 15 + 7}
                  r="2"
                  fill="hsl(270 80% 65%)"
                />
              ))
            )}
          </svg>
        </div>

        {/* ══ LEFT COLUMN — 30% — Decorative orb (no panda) ═══════════════ */}
        <div className="relative flex flex-col justify-center items-center w-[30%] shrink-0 overflow-hidden">
          {/* Large radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 55%, hsl(270 95% 82% / 0.45) 0%, transparent 70%)",
            }}
          />

          {/* Decorative orb replaces panda */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative z-10"
            style={{ width: 340, height: 340 }}
          >
            <HeroOrb />
          </motion.div>

          {/* 100% Free badge */}
          <motion.div
            {...fadeUp(0.6)}
            className="absolute bottom-8 left-6 z-10 flex items-center gap-3 glass-strong rounded-2xl px-4 py-3 max-w-[200px]"
          >
            <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm text-foreground leading-tight">100% Free</p>
              <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                No signup required<br />Get results instantly
              </p>
            </div>
          </motion.div>
        </div>

        {/* ══ CENTER COLUMN — 40% — Hero content ══════════════════════════ */}
        <div className="flex flex-col justify-center items-center px-8 xl:px-12 w-[40%] shrink-0 text-center">

          {/* Tagline pill */}
          <motion.p
            {...fadeUp(0.15)}
            className="text-[11px] font-bold tracking-[0.22em] uppercase text-primary/80 mb-4 px-4 py-1.5 rounded-full glass border border-primary/20"
          >
            Prepare • Present • Get Hired
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.22)}
            className="text-4xl xl:text-5xl font-extrabold leading-[1.08] text-foreground mb-1"
          >
            Discover Your Best
          </motion.h1>
          <motion.div {...fadeUp(0.28)} className="mb-4 flex items-center justify-center gap-1.5">
            <span className="font-script text-5xl xl:text-6xl text-gradient leading-tight">
              VA Career Path
            </span>
            <Heart className="h-5 w-5 text-primary-glow fill-primary-glow/40 mb-1 shrink-0" />
          </motion.div>

          {/* Supporting text */}
          <motion.p
            {...fadeUp(0.33)}
            className="text-sm xl:text-base text-muted-foreground text-balance max-w-sm mb-6"
          >
            Take this free assessment to discover which Virtual Assistant career path
            best matches your experience, strengths, interests, and goals.
          </motion.p>

          {/* 3 benefit mini-cards */}
          <motion.div
            {...fadeUp(0.38)}
            className="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-6"
          >
            {desktopBenefitCards.map((b) => (
              <div
                key={b.label}
                className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1.5"
              >
                <span className="h-8 w-8 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <b.icon className="h-4 w-4" />
                </span>
                <p className="font-bold text-xs text-foreground leading-tight">{b.label}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{b.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA button */}
          <motion.button
            onClick={onStart}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.44 }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.975 }}
            className="group w-full max-w-sm inline-flex items-center justify-center gap-3 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg px-8 py-4 shadow-glow transition-transform mb-3"
          >
            <Sparkles className="h-5 w-5 shrink-0" />
            Start My Free Assessment
            <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Under-CTA trust line */}
          <motion.p
            {...fadeUp(0.5)}
            className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-5"
          >
            <Lock className="h-3.5 w-3.5" />
            Takes only 2–3 minutes • 100% Free
          </motion.p>

          {/* Social proof avatars */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {["hsl(270,70%,75%)", "hsl(290,70%,72%)", "hsl(250,70%,78%)", "hsl(275,65%,70%)"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 rounded-full border-2 border-background flex items-center justify-center text-white text-[10px] font-bold"
                    style={{ background: color }}
                  >
                    {["M", "A", "J", "R"][i]}
                  </div>
                )
              )}
            </div>
            <p className="text-xs text-muted-foreground text-left leading-snug">
              Join <span className="font-bold text-foreground">5,000+</span> aspiring VAs<br />
              who've found their perfect path.
            </p>
          </motion.div>
        </div>

        {/* ══ RIGHT COLUMN — 30% — What You'll Get + Testimonial ═════════ */}
        <div className="flex flex-col justify-center px-6 xl:px-8 w-[30%] shrink-0 gap-3">

          {/* Section label */}
          <motion.div
            {...fadeUp(0.2)}
            className="flex items-center gap-2 text-primary font-bold text-sm mb-1"
          >
            <Sparkles className="h-4 w-4" />
            What you'll get
          </motion.div>

          {/* What You'll Get cards */}
          <div className="flex flex-col gap-2">
            {whatYouGet.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: 0.25 + i * 0.07 }}
                className="glass rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <span className="h-8 w-8 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="font-semibold text-sm text-foreground leading-snug">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
            className="glass-strong rounded-3xl p-4 mt-1"
          >
            <div className="h-8 w-8 rounded-xl bg-primary-soft flex items-center justify-center mb-3">
              <Quote className="h-4 w-4 text-primary" />
            </div>

            <p className="text-sm italic text-foreground leading-relaxed mb-3">
              This assessment helped me finally understand what path is right for me
              and what I should do next.
            </p>

            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                A
              </div>
              <div>
                <p className="font-bold text-sm text-foreground leading-tight">– Ariane T.</p>
                <p className="text-xs text-muted-foreground">Aspiring Virtual Assistant</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE / TABLET LAYOUT  (below lg)
          — panda mascot removed; decorative elements only
      ════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden">
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

            {/* Decorative orb — replaces the panda mascot image on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative mx-auto mt-4 mb-1"
              style={{ width: 180, height: 180 }}
            >
              <HeroOrb />
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
                  <span className="text-primary text-xl leading-none mr-1">"</span>
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
    </div>
  );
};