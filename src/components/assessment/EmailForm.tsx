import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Loader2, Mail, ShieldCheck, ArrowRight } from "lucide-react";

const schema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(60),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

interface Props {
  onSubmit: (data: { firstName: string; email: string }) => Promise<void> | void;
  loading?: boolean;
}

export const EmailForm = ({ onSubmit, loading }: Props) => {
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
    <div className="min-h-screen gradient-soft px-6 py-6 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="mx-auto h-11 w-11 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground mb-3 shadow-glow">
            <Mail className="h-5 w-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-balance">
            Where should we send your personalized report?
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            We'll send your full VA career path breakdown straight to your inbox.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl bg-card border border-border shadow-elegant p-4 space-y-3"
        >
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Maria"
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 outline-none focus:border-primary transition-colors"
              maxLength={60}
              disabled={loading}
            />
            {errors.firstName && <p className="mt-1 text-sm text-destructive">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-2.5 outline-none focus:border-primary transition-colors"
              maxLength={255}
              disabled={loading}
            />
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-2xl gradient-primary text-primary-foreground font-semibold text-base px-6 py-3 shadow-glow hover:scale-[1.01] transition-transform disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send My Results
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground pt-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </motion.form>
      </div>
    </div>
  );
};
