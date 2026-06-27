import { motion, AnimatePresence } from "framer-motion";

/**
 * PandaContextIllustration
 *
 * Category-aware atmospheric SVG illustration.
 * Each category renders a different scene that emotionally reinforces the question topic.
 * All scenes share the same Panda VA face proportions (rounded head, oval eye patches,
 * dot eyes, small snout) and a soft 3-D colour palette (lavender shadows, white/cream body).
 *
 * Designed to be placed in the background:
 *   - low opacity (0.10–0.15)
 *   - gradient-masked edges
 *   - pointer-events: none
 * OR at full opacity as a hero illustration on transition pages.
 */

type Category =
  | "goals"
  | "experience"
  | "skills"
  | "tools"
  | "application"
  | "challenges"
  | "work-style"
  | "draining"
  | "default";

interface Props {
  category?: Category;
  /** 0–1 opacity; defaults to atmospheric (0.12) */
  opacity?: number;
  /** If true, wraps in gradient masks for edge-fade blending */
  atmospheric?: boolean;
  className?: string;
}

// ─── Shared palette ──────────────────────────────────────────────────────────
const P = {
  bodyWhite:  "#FAFAFA",
  patchBlack: "#1A1A2E",
  shadow:     "#C4B5FD",   // lavender shadow on white fur
  shadowDark: "#7C3AED",   // deep purple accent
  skin:       "#F9E4D4",   // panda snout/inner ear
  purple:     "#8B5CF6",
  purpleLight:"#DDD6FE",
  purplePale: "#EDE9FE",
  desk:       "#C4B5FD",
  laptop:     "#7C3AED",
  screen:     "#EDE9FE",
  hoodie:     "#7C3AED",
  hoodieShad: "#5B21B6",
};

// ─── Reusable panda head (scales from a 100x100 origin) ──────────────────────
const PandaHead = ({
  x = 0,
  y = 0,
  scale = 1,
  headset = false,
  expression = "smile",
}: {
  x?: number;
  y?: number;
  scale?: number;
  headset?: boolean;
  expression?: "smile" | "think" | "worry" | "cheer";
}) => {
  const s = scale;
  // head centre at (x, y)
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* Neck */}
      <ellipse cx={0} cy={52} rx={18} ry={14} fill={P.bodyWhite} />
      {/* Head */}
      <ellipse cx={0} cy={0} rx={40} ry={38} fill={P.bodyWhite} />
      {/* Ear shadow */}
      <ellipse cx={-32} cy={-28} rx={14} ry={13} fill={P.patchBlack} />
      <ellipse cx={32}  cy={-28} rx={14} ry={13} fill={P.patchBlack} />
      {/* Ear inner */}
      <ellipse cx={-32} cy={-28} rx={8}  ry={7}  fill={P.skin} />
      <ellipse cx={32}  cy={-28} rx={8}  ry={7}  fill={P.skin} />
      {/* Eye patches */}
      <ellipse cx={-16} cy={-6} rx={16} ry={14} fill={P.patchBlack} transform="rotate(-8, -16, -6)" />
      <ellipse cx={16}  cy={-6} rx={16} ry={14} fill={P.patchBlack} transform="rotate(8, 16, -6)" />
      {/* Eyes */}
      <circle cx={-16} cy={-6} r={6} fill="white" />
      <circle cx={16}  cy={-6} r={6} fill="white" />
      <circle cx={-14} cy={-5} r={3.5} fill={P.patchBlack} />
      <circle cx={18}  cy={-5} r={3.5} fill={P.patchBlack} />
      {/* Catchlights */}
      <circle cx={-13} cy={-7} r={1.2} fill="white" />
      <circle cx={19}  cy={-7} r={1.2} fill="white" />
      {/* Snout */}
      <ellipse cx={0} cy={14} rx={14} ry={11} fill={P.skin} />
      {/* Nose */}
      <ellipse cx={0} cy={9} rx={5} ry={3.5} fill={P.patchBlack} />
      {/* Mouth */}
      {expression === "smile" && (
        <path d="M -6 18 Q 0 24 6 18" fill="none" stroke={P.patchBlack} strokeWidth={1.8} strokeLinecap="round" />
      )}
      {expression === "think" && (
        <>
          <path d="M -4 17 Q 0 19 4 17" fill="none" stroke={P.patchBlack} strokeWidth={1.5} strokeLinecap="round" />
          {/* Raised eyebrow */}
          <path d="M -22 -18 Q -16 -22 -10 -18" fill="none" stroke={P.patchBlack} strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
      {expression === "worry" && (
        <>
          <path d="M -5 20 Q 0 16 5 20" fill="none" stroke={P.patchBlack} strokeWidth={1.5} strokeLinecap="round" />
          <path d="M -22 -20 Q -16 -16 -10 -20" fill="none" stroke={P.patchBlack} strokeWidth={1.5} strokeLinecap="round" />
          <path d="M 10 -20 Q 16 -16 22 -20" fill="none" stroke={P.patchBlack} strokeWidth={1.5} strokeLinecap="round" />
        </>
      )}
      {expression === "cheer" && (
        <>
          <path d="M -7 17 Q 0 25 7 17" fill="none" stroke={P.patchBlack} strokeWidth={2} strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx={-26} cy={8} rx={7} ry={4} fill="#F9A8D4" opacity={0.5} />
          <ellipse cx={26}  cy={8} rx={7} ry={4} fill="#F9A8D4" opacity={0.5} />
        </>
      )}
      {/* Headset */}
      {headset && (
        <>
          <path d="M -40 -10 Q -40 -50 0 -50 Q 40 -50 40 -10" fill="none" stroke={P.patchBlack} strokeWidth={4} strokeLinecap="round" />
          <rect x={-46} y={-16} width={12} height={18} rx={5} fill={P.patchBlack} />
          <rect x={34}  y={-16} width={12} height={18} rx={5} fill={P.patchBlack} />
          {/* Mic arm */}
          <path d="M 46 -2 Q 54 6 50 14" fill="none" stroke={P.patchBlack} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={50} cy={15} r={3} fill={P.patchBlack} />
        </>
      )}
    </g>
  );
};

// ─── Scene: GOALS — panda at a crossroads with signposts ─────────────────────
const SceneGoals = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ground */}
    <ellipse cx={200} cy={420} rx={180} ry={28} fill={P.purplePale} />
    {/* Path forks */}
    <path d="M 200 420 L 200 260" stroke={P.shadow} strokeWidth={8} strokeLinecap="round" />
    <path d="M 200 300 L 100 220" stroke={P.shadow} strokeWidth={6} strokeLinecap="round" />
    <path d="M 200 300 L 300 220" stroke={P.shadow} strokeWidth={6} strokeLinecap="round" />
    {/* Sign post */}
    <rect x={196} y={210} width={8} height={90} rx={4} fill={P.patchBlack} />
    {/* Signs */}
    <rect x={100} y={188} width={90} height={28} rx={8} fill={P.hoodie} />
    <text x={145} y={207} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">VA Path A</text>
    <rect x={210} y={188} width={90} height={28} rx={8} fill={P.purple} />
    <text x={255} y={207} textAnchor="middle" fill="white" fontSize={11} fontWeight="700">VA Path B</text>
    {/* Body */}
    <ellipse cx={200} cy={370} rx={42} ry={52} fill={P.hoodie} />
    <ellipse cx={200} cy={350} rx={32} ry={22} fill={P.hoodieShad} />
    {/* Arms — pointing at signs */}
    <path d="M 162 345 Q 130 320 108 310" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 238 345 Q 270 320 292 310" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    {/* Paws */}
    <circle cx={108} cy={310} r={13} fill={P.bodyWhite} />
    <circle cx={292} cy={310} r={13} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={290} scale={0.85} expression="think" />
    {/* Stars / sparkles */}
    {[[60, 80], [340, 60], [350, 200], [50, 200]].map(([sx, sy], i) => (
      <g key={i} transform={`translate(${sx},${sy})`}>
        <line x1={0} y1={-8} x2={0} y2={8} stroke={P.purple} strokeWidth={1.5} />
        <line x1={-8} y1={0} x2={8} y2={0} stroke={P.purple} strokeWidth={1.5} />
        <line x1={-5} y1={-5} x2={5} y2={5} stroke={P.purple} strokeWidth={1} />
        <line x1={5} y1={-5} x2={-5} y2={5} stroke={P.purple} strokeWidth={1} />
      </g>
    ))}
  </svg>
);

// ─── Scene: EXPERIENCE — panda at laptop, working ────────────────────────────
const SceneExperience = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Desk */}
    <rect x={40} y={330} width={320} height={18} rx={9} fill={P.desk} />
    <rect x={80} y={348} width={16} height={60} rx={6} fill={P.shadow} />
    <rect x={304} y={348} width={16} height={60} rx={6} fill={P.shadow} />
    {/* Laptop base */}
    <rect x={110} y={300} width={180} height={12} rx={6} fill={P.patchBlack} />
    {/* Laptop screen */}
    <rect x={118} y={210} width={164} height={96} rx={10} fill={P.patchBlack} />
    <rect x={123} y={215} width={154} height={86} rx={7} fill={P.screen} />
    {/* Screen lines (code/content) */}
    {[228, 238, 248, 258, 268, 278].map((sy, i) => (
      <rect key={i} x={132} y={sy} width={i % 3 === 2 ? 60 : 100 + (i % 2) * 30} height={5} rx={2.5} fill={P.purple} opacity={0.5} />
    ))}
    {/* Panda VA logo sticker on laptop */}
    <circle cx={205} cy={303} r={5} fill={P.hoodie} />
    {/* Mug */}
    <rect x={312} y={295} width={28} height={34} rx={8} fill={P.purpleLight} />
    <path d="M 340 305 Q 354 305 354 315 Q 354 325 340 325" stroke={P.purple} strokeWidth={3} fill="none" strokeLinecap="round" />
    {/* Steam */}
    <path d="M 320 290 Q 318 280 322 272" stroke={P.shadow} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.7} />
    <path d="M 328 288 Q 326 278 330 270" stroke={P.shadow} strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.7} />
    {/* Body */}
    <ellipse cx={200} cy={360} rx={44} ry={50} fill={P.hoodie} />
    <ellipse cx={200} cy={342} rx={32} ry={20} fill={P.hoodieShad} />
    {/* Arms on desk */}
    <path d="M 158 355 Q 148 340 145 330" stroke={P.hoodie} strokeWidth={24} strokeLinecap="round" fill="none" />
    <path d="M 242 355 Q 256 340 260 330" stroke={P.hoodie} strokeWidth={24} strokeLinecap="round" fill="none" />
    <ellipse cx={143} cy={328} rx={14} ry={10} fill={P.bodyWhite} />
    <ellipse cx={262} cy={328} rx={14} ry={10} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={290} scale={0.88} headset expression="smile" />
  </svg>
);

// ─── Scene: SKILLS — panda studying, taking notes ────────────────────────────
const SceneSkills = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Book stack */}
    {[
      { x: 60, y: 380, w: 80, h: 14, fill: P.hoodie },
      { x: 64, y: 366, w: 74, h: 14, fill: P.purple },
      { x: 68, y: 352, w: 68, h: 14, fill: P.shadow },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={3} fill={b.fill} />
    ))}
    {/* Open notebook */}
    <rect x={100} y={290} width={200} height={130} rx={10} fill="#F5F3FF" />
    <line x1={200} y1={290} x2={200} y2={420} stroke={P.shadow} strokeWidth={2} />
    <rect x={108} y={298} width={84} height={6} rx={3} fill={P.purpleLight} />
    <rect x={108} y={310} width={78} height={4} rx={2} fill={P.purpleLight} opacity={0.7} />
    <rect x={108} y={320} width={70} height={4} rx={2} fill={P.purpleLight} opacity={0.5} />
    <rect x={108} y={330} width={75} height={4} rx={2} fill={P.purpleLight} opacity={0.6} />
    <rect x={208} y={298} width={84} height={6} rx={3} fill={P.purple} opacity={0.5} />
    <rect x={208} y={310} width={60} height={4} rx={2} fill={P.purpleLight} opacity={0.7} />
    <rect x={208} y={320} width={72} height={4} rx={2} fill={P.purpleLight} opacity={0.5} />
    {/* Pencil */}
    <rect x={286} y={280} width={10} height={60} rx={4} fill="#FDE68A" transform="rotate(30, 291, 310)" />
    <path d="M 286 280 L 296 280 L 291 268 Z" fill="#F87171" transform="rotate(30, 291, 310)" />
    {/* Body */}
    <ellipse cx={200} cy={375} rx={44} ry={48} fill={P.hoodie} />
    <ellipse cx={200} cy={358} rx={32} ry={20} fill={P.hoodieShad} />
    {/* Arms — leaning on desk */}
    <path d="M 158 365 Q 148 345 142 335" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 242 365 Q 256 345 265 335" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <ellipse cx={140} cy={333} rx={13} ry={10} fill={P.bodyWhite} />
    <ellipse cx={267} cy={333} rx={13} ry={10} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={298} scale={0.88} expression="think" />
    {/* Floating skill bubbles */}
    {[
      { x: 52, y: 200, label: "Email" },
      { x: 318, y: 180, label: "Excel" },
      { x: 340, y: 280, label: "Canva" },
    ].map((b) => (
      <g key={b.label}>
        <rect x={b.x - 28} y={b.y - 14} width={56} height={26} rx={13} fill={P.purplePale} stroke={P.purpleLight} strokeWidth={1} />
        <text x={b.x} y={b.y + 5} textAnchor="middle" fill={P.shadowDark} fontSize={11} fontWeight="600">{b.label}</text>
      </g>
    ))}
  </svg>
);

// ─── Scene: TOOLS — panda organizing digital tools ───────────────────────────
const SceneTools = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Monitor */}
    <rect x={100} y={200} width={200} height={140} rx={12} fill={P.patchBlack} />
    <rect x={108} y={208} width={184} height={124} rx={8} fill={P.screen} />
    {/* App grid on screen */}
    {[0,1,2,3,4,5].map((i) => (
      <rect key={i} x={120 + (i % 3) * 56} y={220 + Math.floor(i/3) * 54} width={44} height={40} rx={8}
        fill={[P.hoodie, P.purple, P.shadow, "#34D399", "#60A5FA", P.purpleLight][i]} opacity={0.85} />
    ))}
    {/* Monitor stand */}
    <rect x={188} y={340} width={24} height={30} rx={6} fill={P.shadow} />
    <rect x={160} y={366} width={80} height={10} rx={5} fill={P.shadow} />
    {/* Body */}
    <ellipse cx={200} cy={395} rx={42} ry={44} fill={P.hoodie} />
    {/* Arms up, gesturing */}
    <path d="M 160 378 Q 130 340 118 310" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 240 378 Q 270 340 282 310" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <circle cx={116} cy={308} r={14} fill={P.bodyWhite} />
    <circle cx={284} cy={308} r={14} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={318} scale={0.85} expression="cheer" />
    {/* Floating tool labels */}
    {[
      { x: 52, y: 230, t: "Notion" },
      { x: 348, y: 220, t: "Slack" },
      { x: 50, y: 310, t: "Trello" },
      { x: 350, y: 310, t: "Asana" },
    ].map((b) => (
      <g key={b.t}>
        <rect x={b.x - 28} y={b.y - 13} width={56} height={24} rx={12} fill="white" opacity={0.7} stroke={P.purpleLight} strokeWidth={1} />
        <text x={b.x} y={b.y + 4} textAnchor="middle" fill={P.shadowDark} fontSize={10} fontWeight="600">{b.t}</text>
      </g>
    ))}
  </svg>
);

// ─── Scene: APPLICATION — panda checking emails / interview prep ──────────────
const SceneApplication = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Email envelope large */}
    <rect x={60} y={180} width={280} height={180} rx={16} fill={P.purplePale} stroke={P.purpleLight} strokeWidth={2} />
    <path d="M 60 196 L 200 290 L 340 196" fill="none" stroke={P.shadow} strokeWidth={3} strokeLinejoin="round" />
    {/* Email lines */}
    <rect x={90} y={310} width={220} height={8} rx={4} fill={P.purpleLight} />
    <rect x={90} y={324} width={180} height={6} rx={3} fill={P.purpleLight} opacity={0.6} />
    <rect x={90} y={336} width={200} height={6} rx={3} fill={P.purpleLight} opacity={0.4} />
    {/* Notification badge */}
    <circle cx={332} cy={187} r={16} fill="#EF4444" />
    <text x={332} y={193} textAnchor="middle" fill="white" fontSize={13} fontWeight="700">3</text>
    {/* Body peeking from bottom */}
    <ellipse cx={200} cy={408} rx={46} ry={36} fill={P.hoodie} />
    {/* Arms reaching up */}
    <path d="M 156 398 Q 130 360 108 330" stroke={P.hoodie} strokeWidth={24} strokeLinecap="round" fill="none" />
    <path d="M 244 398 Q 270 360 292 330" stroke={P.hoodie} strokeWidth={24} strokeLinecap="round" fill="none" />
    <circle cx={106} cy={328} r={14} fill={P.bodyWhite} />
    <circle cx={294} cy={328} r={14} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={335} scale={0.88} expression="smile" />
    {/* Stars */}
    {[[52, 140], [348, 140], [50, 380], [350, 380]].map(([sx, sy], i) => (
      <circle key={i} cx={sx} cy={sy} r={3} fill={P.purple} opacity={0.5} />
    ))}
  </svg>
);

// ─── Scene: CHALLENGES — panda solving a puzzle / obstacles ──────────────────
const SceneChallenges = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Large puzzle pieces */}
    <path d="M 80 240 L 80 160 L 160 160 L 160 180 Q 175 168 175 188 Q 175 208 160 200 L 160 240 Z" fill={P.purpleLight} stroke={P.shadow} strokeWidth={2} />
    <path d="M 160 240 L 160 200 Q 175 208 175 188 Q 175 168 160 180 L 160 160 L 240 160 L 240 240 Z" fill={P.shadow} stroke={P.purpleLight} strokeWidth={2} />
    {/* Panda looking at puzzle */}
    <ellipse cx={200} cy={390} rx={44} ry={44} fill={P.hoodie} />
    <ellipse cx={200} cy={374} rx={32} ry={20} fill={P.hoodieShad} />
    {/* Arms — one raised scratching head */}
    <path d="M 157 375 Q 134 345 118 320" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 243 375 Q 268 348 276 322" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <circle cx={276} cy={320} r={13} fill={P.bodyWhite} />
    <circle cx={116} cy={318} r={13} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={312} scale={0.88} expression="think" />
    {/* Lightbulb idea */}
    <circle cx={320} cy={220} r={28} fill="#FDE68A" opacity={0.9} />
    <rect x={313} y={248} width={14} height={8} rx={3} fill="#F59E0B" />
    <path d="M 308 220 Q 308 204 320 200 Q 332 204 332 220" fill="none" stroke="#F59E0B" strokeWidth={3} strokeLinecap="round" />
    {/* Lines radiating from bulb */}
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <line key={i}
        x1={320 + Math.cos(deg*Math.PI/180)*32}
        y1={220 + Math.sin(deg*Math.PI/180)*32}
        x2={320 + Math.cos(deg*Math.PI/180)*40}
        y2={220 + Math.sin(deg*Math.PI/180)*40}
        stroke="#FDE68A" strokeWidth={2} />
    ))}
    {/* Check mark on solved piece */}
    <circle cx={120} cy={200} r={16} fill="#34D399" />
    <path d="M 112 200 L 118 207 L 130 192" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── Scene: WORK-STYLE — panda in peaceful home office ───────────────────────
const SceneWorkStyle = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Window */}
    <rect x={60} y={140} width={100} height={120} rx={8} fill="#DBEAFE" stroke={P.purpleLight} strokeWidth={2} />
    <line x1={110} y1={140} x2={110} y2={260} stroke={P.purpleLight} strokeWidth={1.5} />
    <line x1={60}  y1={200} x2={160} y2={200} stroke={P.purpleLight} strokeWidth={1.5} />
    {/* Sun outside */}
    <circle cx={110} cy={170} r={18} fill="#FDE68A" opacity={0.8} />
    {/* Plant */}
    <rect x={310} y={330} width={20} height={30} rx={6} fill={P.shadow} />
    <ellipse cx={320} cy={330} rx={24} ry={20} fill="#4ADE80" opacity={0.8} />
    <ellipse cx={308} cy={320} rx={18} ry={15} fill="#4ADE80" opacity={0.7} />
    <ellipse cx={334} cy={318} rx={16} ry={14} fill="#4ADE80" opacity={0.7} />
    {/* Desk */}
    <rect x={80} y={335} width={240} height={14} rx={7} fill={P.desk} />
    {/* Laptop on desk */}
    <rect x={148} y={302} width={104} height={34} rx={6} fill={P.patchBlack} />
    <rect x={154} y={308} width={92} height={26} rx={4} fill={P.screen} />
    <rect x={162} y={336} width={76} height={8} rx={4} fill={P.patchBlack} />
    {/* Body - relaxed */}
    <ellipse cx={200} cy={382} rx={44} ry={46} fill={P.hoodie} />
    <path d="M 158 372 Q 148 352 148 340" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 242 372 Q 254 352 254 340" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <ellipse cx={148} cy={338} rx={13} ry={9} fill={P.bodyWhite} />
    <ellipse cx={254} cy={338} rx={13} ry={9} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={308} scale={0.85} expression="smile" />
    {/* Floating hearts (peaceful) */}
    {[[50, 290], [356, 250], [58, 380]].map(([hx, hy], i) => (
      <text key={i} x={hx} y={hy} fontSize={18} opacity={0.4}>♥</text>
    ))}
  </svg>
);

// ─── Scene: DRAINING — panda overwhelmed by too many tabs ────────────────────
const SceneDraining = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Chaotic browser with many tabs */}
    <rect x={60} y={160} width={280} height={160} rx={10} fill="#F5F3FF" stroke={P.shadow} strokeWidth={2} />
    {/* Many tabs */}
    {["📧", "📅", "💬", "📊", "📝", "🔔"].map((emoji, i) => (
      <g key={i}>
        <rect x={60 + i * 47} y={148} width={44} height={18} rx={4} fill={i === 0 ? P.hoodie : P.purplePale} stroke={P.purpleLight} strokeWidth={1} />
        <text x={82 + i * 47} y={162} textAnchor="middle" fontSize={9}>{emoji}</text>
      </g>
    ))}
    {/* Meeting popup */}
    <rect x={200} y={200} width={130} height={70} rx={8} fill="white" stroke="#EF4444" strokeWidth={2} />
    <text x={215} y={220} fill="#EF4444" fontSize={9} fontWeight="700">⚠ Meeting in 2 min</text>
    <rect x={210} y={230} width={100} height={22} rx={6} fill="#EF4444" />
    <text x={260} y={245} textAnchor="middle" fill="white" fontSize={10} fontWeight="600">Join Now</text>
    {/* Notification badges */}
    {[[85, 155], [132, 155], [178, 155]].map(([nx, ny], i) => (
      <g key={i}>
        <circle cx={nx} cy={ny} r={6} fill="#EF4444" />
        <text x={nx} y={ny + 3} textAnchor="middle" fill="white" fontSize={7} fontWeight="700">{i + 1}</text>
      </g>
    ))}
    {/* Panda looking frazzled */}
    <ellipse cx={200} cy={402} rx={44} ry={38} fill={P.hoodie} />
    <path d="M 158 392 Q 132 365 116 348" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <path d="M 242 392 Q 268 365 284 348" stroke={P.hoodie} strokeWidth={22} strokeLinecap="round" fill="none" />
    <circle cx={114} cy={346} r={13} fill={P.bodyWhite} />
    <circle cx={286} cy={346} r={13} fill={P.bodyWhite} />
    {/* Head — worried */}
    <PandaHead x={200} y={338} scale={0.85} expression="worry" />
    {/* Swirl/stress marks */}
    {[[62, 330], [342, 310], [50, 400]].map(([sx, sy], i) => (
      <path key={i} d={`M ${sx} ${sy} Q ${sx+10} ${sy-8} ${sx+6} ${sy+4}`} fill="none" stroke="#EF4444" strokeWidth={1.5} opacity={0.6} />
    ))}
  </svg>
);

// ─── Scene: DEFAULT — panda waving hello ─────────────────────────────────────
const SceneDefault = () => (
  <svg viewBox="0 0 400 440" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Simple standing panda */}
    <ellipse cx={200} cy={420} rx={160} ry={22} fill={P.purplePale} />
    {/* Body */}
    <ellipse cx={200} cy={360} rx={50} ry={62} fill={P.hoodie} />
    <ellipse cx={200} cy={335} rx={36} ry={24} fill={P.hoodieShad} />
    {/* Legs */}
    <rect x={168} y={406} width={28} height={22} rx={12} fill={P.patchBlack} />
    <rect x={204} y={406} width={28} height={22} rx={12} fill={P.patchBlack} />
    {/* Waving arm */}
    <path d="M 248 345 Q 280 310 296 286" stroke={P.hoodie} strokeWidth={26} strokeLinecap="round" fill="none" />
    <circle cx={298} cy={284} r={15} fill={P.bodyWhite} />
    {/* Other arm */}
    <path d="M 154 355 Q 132 348 122 358" stroke={P.hoodie} strokeWidth={24} strokeLinecap="round" fill="none" />
    <circle cx={120} cy={360} r={14} fill={P.bodyWhite} />
    {/* Head */}
    <PandaHead x={200} y={278} scale={1} expression="cheer" headset />
    {/* Panda VA text on hoodie */}
    <text x={200} y={368} textAnchor="middle" fill="white" fontSize={11} fontWeight="800" opacity={0.8}>PANDA</text>
    <text x={200} y={382} textAnchor="middle" fill="white" fontSize={10} fontWeight="600" opacity={0.7}>VA</text>
    {/* Sparkles */}
    {[[60, 80], [340, 60], [52, 220], [350, 200], [200, 60]].map(([sx, sy], i) => (
      <g key={i} transform={`translate(${sx},${sy})`} opacity={0.5}>
        <line x1={0} y1={-7} x2={0} y2={7} stroke={P.purple} strokeWidth={1.5} />
        <line x1={-7} y1={0} x2={7} y2={0} stroke={P.purple} strokeWidth={1.5} />
      </g>
    ))}
  </svg>
);

// ─── Category → scene map ────────────────────────────────────────────────────
const SCENES: Record<Category, React.ComponentType> = {
  goals:       SceneGoals,
  experience:  SceneExperience,
  skills:      SceneSkills,
  tools:       SceneTools,
  application: SceneApplication,
  challenges:  SceneChallenges,
  "work-style":SceneWorkStyle,
  draining:    SceneDraining,
  default:     SceneDefault,
};

// ─── Main component ───────────────────────────────────────────────────────────
export const PandaContextIllustration = ({
  category = "default",
  opacity = 0.12,
  atmospheric = true,
  className = "",
}: Props) => {
  const Scene = SCENES[category] ?? SCENES.default;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={category}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className={`pointer-events-none select-none ${className}`}
        style={
          atmospheric
            ? {
                maskImage:
                  "radial-gradient(ellipse 80% 90% at 40% 60%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 85%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 90% at 40% 60%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 85%)",
              }
            : undefined
        }
        aria-hidden
      >
        <Scene />
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Maps question IDs / categories to illustration category.
 * Call this from Index.tsx with the current question object.
 */
export function getIllustrationCategory(questionId: string, questionTitle: string): Category {
  const id = questionId.toLowerCase();
  const title = questionTitle.toLowerCase();

  if (title.includes("drain") || title.includes("overwhelm") || title.includes("frustrat")) return "draining";
  if (title.includes("goal") || title.includes("path") || title.includes("aspir") || title.includes("want")) return "goals";
  if (title.includes("tool") || title.includes("software") || title.includes("app") || title.includes("platform")) return "tools";
  if (title.includes("skill") || title.includes("learn") || title.includes("study") || title.includes("know")) return "skills";
  if (title.includes("experience") || title.includes("background") || title.includes("work") || title.includes("job")) return "experience";
  if (title.includes("apply") || title.includes("client") || title.includes("interview") || title.includes("hire")) return "application";
  if (title.includes("challenge") || title.includes("difficult") || title.includes("problem") || title.includes("obstacle")) return "challenges";
  if (title.includes("work style") || title.includes("prefer") || title.includes("environment") || title.includes("home")) return "work-style";

  // Fall back to question index ranges if title matching doesn't catch it
  const num = parseInt(id.replace(/\D/g, ""), 10);
  if (num <= 3)  return "goals";
  if (num <= 6)  return "experience";
  if (num <= 9)  return "skills";
  if (num <= 12) return "tools";
  return "default";
}
