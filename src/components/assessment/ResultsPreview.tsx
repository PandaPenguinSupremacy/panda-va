import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, AlertTriangle, Info, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { z } from "zod";
import type { Recommendation } from "@/lib/assessment";
import { PandaBg } from "./PandaBg";
import pandaMascot from "@/assets/panda-mascot.png";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(60),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

interface Props {
  recommendation: Recommendation;
  onSubmit: (data: { firstName: string; email: string }) => Promise<void> | void;
  loading?: boolean;
}

export const ResultsPreview = ({ recommendation, onSubmit, loading }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ firstName?: string; email?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ firstName, email });
    if (!parsed.success) {
      const fld = parsed.error.flatten().fieldErrors;
      setErrors({ firstName: fld.firstName?.[0], email: fld.email?.[0] });
      return;
    }
    setErrors({});
    await onSubmit({ firstName: parsed.data.firstName, email: parsed.data.email });
  };

  return (
    <div className="relative min-h-screen px-5 py-5 overflow-hidden">
      <PandaBg dense />
      <div className="relative max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3"
        >
          <img src={pandaMascot} alt="Panda VA" className="h-16 w-16 mx-auto object-contain animate-float" />
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-primary mt-3">
            <Sparkles className="h-4 w-4" /> Your Personalized Match
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-balance">
            Your Personalized Career Report Is Ready
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Prepare · Present · Get Hired</p>
        </motion.div>

        {/* Recommended path card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-[2rem] glass-strong overflow-hidden"
        >
          <div className="gradient-primary text-primary-foreground p-4 sm:p-5">
            <p className="text-sm font-semibold opacity-90 uppercase tracking-wider">Recommended Career Path</p>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-0.5">{recommendation.path}</h2>
            <p className="mt-2 opacity-95">{recommendation.tagline}</p>
          </div>

          <div className="p-4 sm:p-5 grid gap-3">
            {recommendation.overrode && recommendation.statedInterests.length > 0 && (
              <div className="flex items-start gap-3 rounded-2xl bg-primary-soft/70 border border-primary/20 p-4">
                <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  You leaned toward{" "}
                  <span className="font-semibold">{recommendation.statedInterests.join(", ")}</span>,
                  but based on your full profile we believe{" "}
                  <span className="font-semibold">{recommendation.path}</span> is a stronger first move.
                </p>
              </div>
            )}

            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                <Sparkles className="h-4 w-4" /> Why this fits you
              </div>
              <p className="text-foreground leading-relaxed">{recommendation.narrative}</p>
            </section>

            <section>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-3">
                <Trophy className="h-4 w-4" /> Your strength highlights
              </div>
              <ul className="grid sm:grid-cols-2 gap-2">
                {recommendation.strengths.slice(0, 4).map((s) => (
                  <li key={s} className="flex items-start gap-2 rounded-2xl bg-primary-mist/70 p-3 text-sm font-medium">
                    <span className="text-primary mt-0.5">✓</span> {s}
                  </li>
                ))}
              </ul>
            </section>

            {recommendation.challenges.length > 0 && (
              <section>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-2">
                  <AlertTriangle className="h-4 w-4" /> What may be holding you back
                </div>
                <p className="text-foreground text-sm leading-relaxed">
                  {recommendation.challenges[0]}
                </p>
              </section>
            )}
          </div>
        </motion.div>

        {/* Inline email form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-4 rounded-[2rem] glass-strong p-4 sm:p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold leading-tight">Where should we send your complete personalized report?</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Free — because it's personalized just for you.</p>
            </div>
          </div>

          <div className="grid gap-2 mt-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Maria"
                className="w-full rounded-2xl border-2 border-border bg-white/80 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                maxLength={60}
                disabled={loading}
              />
              {errors.firstName && <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-2xl border-2 border-border bg-white/80 px-4 py-2.5 outline-none focus:border-primary transition-colors"
                maxLength={255}
                disabled={loading}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 rounded-3xl gradient-primary text-primary-foreground font-semibold text-base px-6 py-3 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
              ) : (
                <>Send My Full Report <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              100% Free • No spam • Unsubscribe anytime
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};