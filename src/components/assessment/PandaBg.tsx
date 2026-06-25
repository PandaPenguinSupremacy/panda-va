import { Sparkles, Heart } from "lucide-react";

/** Decorative pastel purple background: blobs, sparkles, hearts. */
export const PandaBg = ({ dense = false }: { dense?: boolean }) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10" aria-hidden>
      {/* Soft gradient mesh base */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Drifting blobs */}
      <div
        className="absolute -top-32 -left-20 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, hsl(270 95% 85% / 0.9), transparent 65%)" }}
      />
      <div
        className="absolute -top-20 -right-24 h-[380px] w-[380px] rounded-full opacity-55 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, hsl(250 95% 88% / 0.9), transparent 65%)", animationDelay: "2s" }}
      />
      <div
        className="absolute -bottom-32 left-1/3 h-[460px] w-[460px] rounded-full opacity-50 blur-3xl animate-blob"
        style={{ background: "radial-gradient(circle, hsl(280 95% 90% / 0.8), transparent 65%)", animationDelay: "5s" }}
      />

      {/* Floating sparkles + hearts */}
      <Sparkles className="absolute top-[18%] left-[8%] h-5 w-5 text-primary/40 animate-sparkle" />
      <Sparkles className="absolute top-[30%] right-[12%] h-4 w-4 text-primary-glow/50 animate-sparkle" style={{ animationDelay: "0.7s" }} />
      <Heart className="absolute top-[55%] left-[6%] h-4 w-4 text-primary-glow/40 fill-primary-glow/30 animate-float" />
      <Heart className="absolute top-[15%] right-[20%] h-5 w-5 text-primary/30 fill-primary/20 animate-float-slower" />
      {dense && (
        <>
          <Sparkles className="absolute bottom-[20%] right-[8%] h-5 w-5 text-primary/40 animate-sparkle" style={{ animationDelay: "1.3s" }} />
          <Heart className="absolute bottom-[30%] left-[14%] h-3 w-3 text-primary-glow/40 fill-primary-glow/30 animate-float" style={{ animationDelay: "1s" }} />
          <Sparkles className="absolute top-[70%] left-[40%] h-3 w-3 text-primary/30 animate-sparkle" style={{ animationDelay: "2s" }} />
        </>
      )}
    </div>
  );
};
