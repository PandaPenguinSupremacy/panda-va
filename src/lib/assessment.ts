export type AnswerId = string;
export type AnswerValue = string | string[] | number;

export interface Option {
  id: AnswerId;
  label: string;
  emoji?: string;
}

export type QuestionType = "single" | "multi" | "scale";

export interface Question {
  id: string;
  number: number;
  title: string;
  subtext?: string;
  type: QuestionType;
  options?: Option[];
  maxSelect?: number;       // for multi
  scaleLabels?: { min: string; max: string }; // for scale
}

/** 18-question adaptive assessment */
export const questions: Question[] = [
  {
    id: "q1", number: 1, type: "single",
    title: "What best describes your current situation?",
    options: [
      { id: "employed", label: "Employed full-time", emoji: "💼" },
      { id: "part_time", label: "Working part-time", emoji: "🕒" },
      { id: "freelance", label: "Freelancing already", emoji: "💻" },
      { id: "unemployed", label: "Currently unemployed", emoji: "🔍" },
      { id: "parent", label: "Stay-at-home parent", emoji: "🏡" },
      { id: "student", label: "Student", emoji: "🎓" },
      { id: "ofw", label: "OFW / working abroad", emoji: "✈️" },
    ],
  },
  {
    id: "q2", number: 2, type: "single",
    title: "Which best describes your previous work experience?",
    options: [
      { id: "bpo", label: "BPO / Customer Service", emoji: "🎧" },
      { id: "sales", label: "Sales / Retail", emoji: "🛍️" },
      { id: "admin", label: "Administrative / Office", emoji: "🗂️" },
      { id: "teaching", label: "Teaching / Education", emoji: "📚" },
      { id: "healthcare", label: "Healthcare", emoji: "🩺" },
      { id: "hospitality", label: "Hospitality", emoji: "🍽️" },
      { id: "freelancing", label: "Freelancing", emoji: "💻" },
      { id: "owner", label: "Business Owner", emoji: "🏢" },
      { id: "ofw", label: "OFW", emoji: "✈️" },
      { id: "none", label: "No professional experience", emoji: "🌱" },
      { id: "other", label: "Other", emoji: "✨" },
    ],
  },
  {
    id: "q3", number: 3, type: "single",
    title: "How many years of work experience do you have?",
    options: [
      { id: "0", label: "0 years" },
      { id: "1_2", label: "1–2 years" },
      { id: "3_5", label: "3–5 years" },
      { id: "5_10", label: "5–10 years" },
      { id: "10p", label: "10+ years" },
    ],
  },
  {
    id: "q4", number: 4, type: "multi", maxSelect: 3,
    title: "Which tasks do you enjoy the most?",
    subtext: "Select up to 3.",
    options: [
      { id: "help_customers", label: "Helping customers", emoji: "💬" },
      { id: "organize", label: "Organizing schedules", emoji: "🗓️" },
      { id: "writing", label: "Writing", emoji: "✍️" },
      { id: "research", label: "Researching information", emoji: "🔎" },
      { id: "design", label: "Designing graphics", emoji: "🎨" },
      { id: "social", label: "Managing social media", emoji: "📱" },
      { id: "presentations", label: "Creating presentations", emoji: "📊" },
      { id: "data", label: "Data entry", emoji: "📋" },
      { id: "planning", label: "Planning projects", emoji: "🧭" },
      { id: "talking", label: "Talking with people", emoji: "🗣️" },
    ],
  },
  {
    id: "q5", number: 5, type: "multi", maxSelect: 3,
    title: "Which tasks drain your energy?",
    subtext: "Select up to 3.",
    options: [
      { id: "calls", label: "Customer calls", emoji: "📞" },
      { id: "writing", label: "Writing", emoji: "✍️" },
      { id: "design", label: "Design work", emoji: "🎨" },
      { id: "admin", label: "Administrative tasks", emoji: "🗂️" },
      { id: "research", label: "Research", emoji: "🔎" },
      { id: "social", label: "Social media", emoji: "📱" },
    ],
  },
  {
    id: "q6", number: 6, type: "single",
    title: "Do you prefer working…",
    options: [
      { id: "solo", label: "Mostly independently", emoji: "🧘" },
      { id: "frequent", label: "With frequent communication", emoji: "💬" },
      { id: "balance", label: "A balance of both", emoji: "⚖️" },
    ],
  },
  {
    id: "q7", number: 7, type: "single",
    title: "Which statement sounds most like you?",
    options: [
      { id: "solver", label: "I love helping people solve problems", emoji: "🤝" },
      { id: "organizer", label: "I enjoy organizing systems", emoji: "🧩" },
      { id: "creator", label: "I enjoy creating content", emoji: "🎬" },
      { id: "analyst", label: "I enjoy analyzing information", emoji: "📈" },
      { id: "creative", label: "I enjoy creative work", emoji: "🎨" },
    ],
  },
  {
    id: "q8", number: 8, type: "scale",
    title: "How confident are you speaking English?",
    scaleLabels: { min: "Not confident", max: "Very confident" },
  },
  {
    id: "q9", number: 9, type: "scale",
    title: "How confident are you writing professional emails?",
    scaleLabels: { min: "Not confident", max: "Very confident" },
  },
  {
    id: "q10", number: 10, type: "scale",
    title: "How comfortable are you joining video meetings?",
    scaleLabels: { min: "Not comfortable", max: "Very comfortable" },
  },
  {
    id: "q11", number: 11, type: "multi",
    title: "Which tools have you used before?",
    subtext: "Select all that apply.",
    options: [
      { id: "google", label: "Google Workspace", emoji: "📂" },
      { id: "msoffice", label: "Microsoft Office", emoji: "🪟" },
      { id: "canva", label: "Canva", emoji: "🎨" },
      { id: "meta", label: "Facebook Business Suite", emoji: "📘" },
      { id: "slack", label: "Slack", emoji: "💬" },
      { id: "zoom", label: "Zoom", emoji: "🎥" },
      { id: "crm", label: "CRM systems", emoji: "📇" },
      { id: "none", label: "None yet", emoji: "🌱" },
    ],
  },
  {
    id: "q12", number: 12, type: "single",
    title: "Have you worked online before?",
    options: [
      { id: "yes", label: "Yes", emoji: "✅" },
      { id: "no", label: "Not yet", emoji: "🌱" },
    ],
  },
  {
    id: "q13", number: 13, type: "single",
    title: "Have you already created a resume or online profile?",
    subtext: "OnlineJobs.ph, Upwork, LinkedIn, etc.",
    options: [
      { id: "resume", label: "Yes, a resume" },
      { id: "profile", label: "Yes, an online profile" },
      { id: "both", label: "I have both" },
      { id: "neither", label: "Not yet" },
    ],
  },
  {
    id: "q14", number: 14, type: "single",
    title: "Have you applied for VA jobs before?",
    options: [
      { id: "many", label: "Yes, many times" },
      { id: "few", label: "Yes, a few times" },
      { id: "none", label: "No, not yet" },
    ],
  },
  {
    id: "q15", number: 15, type: "single",
    title: "How many responses did you receive?",
    options: [
      { id: "none_at_all", label: "None at all" },
      { id: "1_2", label: "1–2 replies" },
      { id: "few_no_offer", label: "A few but no offer" },
      { id: "interview_no_hire", label: "Got interviews but no hire" },
    ],
  },
  {
    id: "q16", number: 16, type: "single",
    title: "What is your biggest challenge right now?",
    options: [
      { id: "niche", label: "Don't know my niche", emoji: "🎯" },
      { id: "resume_help", label: "Don't know how to write my resume/profile", emoji: "📝" },
      { id: "no_replies", label: "I keep applying but get no replies", emoji: "📭" },
      { id: "scared", label: "Scared to leave my current job", emoji: "😰" },
      { id: "find_clients", label: "Don't know where to find clients", emoji: "🔍" },
      { id: "unqualified", label: "Don't feel qualified enough", emoji: "💭" },
    ],
  },
  {
    id: "q17", number: 17, type: "single",
    title: "How many hours per week can you realistically commit?",
    options: [
      { id: "lt10", label: "Less than 10 hours" },
      { id: "10_20", label: "10–20 hours" },
      { id: "20_30", label: "20–30 hours" },
      { id: "30p", label: "30+ hours (full-time)" },
    ],
  },
  {
    id: "q18", number: 18, type: "multi",
    title: "Which VA roles interest you?",
    subtext: "Select all that interest you — this is a preference, not your final path.",
    options: [
      { id: "general", label: "General VA", emoji: "🗒️" },
      { id: "support", label: "Customer Support", emoji: "💬" },
      { id: "social", label: "Social Media", emoji: "📱" },
      { id: "writer", label: "Content Writing", emoji: "✍️" },
      { id: "data", label: "Data Entry", emoji: "📋" },
      { id: "exec", label: "Executive Assistant", emoji: "🗓️" },
      { id: "email", label: "Email Marketing", emoji: "📧" },
    ],
  },
];

export type Answers = Record<string, AnswerValue>;

// ---------- Navigation (q15 conditional on q14) ----------

const isSkipped = (qIndex: number, answers: Answers): boolean => {
  const q = questions[qIndex];
  if (q?.id === "q15" && answers["q14"] === "none") return true;
  return false;
};

export function getNextQuestionIndex(currentIndex: number, answers: Answers): number {
  let next = currentIndex + 1;
  while (next < questions.length && isSkipped(next, answers)) next++;
  return next;
}

export function getPrevQuestionIndex(currentIndex: number, answers: Answers): number {
  let prev = currentIndex - 1;
  while (prev >= 0 && isSkipped(prev, answers)) prev--;
  return Math.max(0, prev);
}

export function getTotalActiveQuestions(answers: Answers): number {
  return answers["q14"] === "none" ? questions.length - 1 : questions.length;
}

export function getActiveQuestionPosition(currentIndex: number, answers: Answers): number {
  let count = 0;
  for (let i = 0; i <= currentIndex; i++) {
    if (isSkipped(i, answers)) continue;
    count++;
  }
  return count;
}

/** Encouragement banner above each question card. */
export function getEncouragement(position: number, total: number): string {
  const pct = position / total;
  if (pct <= 0.22) return "✨ Great start! Let's learn about your background.";
  if (pct <= 0.44) return "🐼 Awesome — we're discovering your strengths.";
  if (pct <= 0.66) return "🚀 You're doing great — just a few more questions.";
  if (pct <= 0.88) return "💜 Nice work! Your personalized recommendation is taking shape.";
  return "🎉 Almost done! Your results are being prepared.";
}

/** Rotating motivational "Panda Tip" quotes shown on question pages. */
export function getStageQuote(position: number, total: number): { label: string; quote: string } {
  const pct = position / total;
  if (pct <= 0.22) return { label: "Background", quote: "Every successful VA started somewhere." };
  if (pct <= 0.44) return { label: "Skills", quote: "Transferable skills matter more than experience." };
  if (pct <= 0.66) return { label: "Challenges", quote: "Consistency beats perfection." };
  if (pct <= 0.88) return { label: "Job Applications", quote: "Rejections are part of the journey." };
  return { label: "Almost There", quote: "You're closer to your VA career than you think." };
}


// ============= Recommendation engine =============

export type CareerPath =
  | "General Virtual Assistant"
  | "Customer Support VA"
  | "Social Media VA"
  | "Content Writer VA"
  | "Data Entry / Research VA"
  | "Executive Assistant VA"
  | "Email Marketing VA";

export interface Recommendation {
  path: CareerPath;
  statedInterests: CareerPath[];
  overrode: boolean;
  tagline: string;
  narrative: string;
  why: string[];
  strengths: string[];
  challenges: string[];
  nextSteps: string[];
  tools: string[];
  scores: Record<CareerPath, number>;
}

const PATHS: CareerPath[] = [
  "General Virtual Assistant",
  "Customer Support VA",
  "Social Media VA",
  "Content Writer VA",
  "Data Entry / Research VA",
  "Executive Assistant VA",
  "Email Marketing VA",
];

const interestToPath: Record<string, CareerPath> = {
  general: "General Virtual Assistant",
  support: "Customer Support VA",
  social: "Social Media VA",
  writer: "Content Writer VA",
  data: "Data Entry / Research VA",
  exec: "Executive Assistant VA",
  email: "Email Marketing VA",
};

const optionLabel = (qid: string, oid?: string): string => {
  if (!oid) return "";
  const q = questions.find((x) => x.id === qid);
  return q?.options?.find((o) => o.id === oid)?.label ?? "";
};

const asMulti = (v: AnswerValue | undefined): string[] => (Array.isArray(v) ? v : []);
const asNum = (v: AnswerValue | undefined): number => (typeof v === "number" ? v : 0);
const asStr = (v: AnswerValue | undefined): string => (typeof v === "string" ? v : "");

export function getRecommendation(answers: Answers): Recommendation {
  const situation = asStr(answers["q1"]);
  const job = asStr(answers["q2"]);
  const years = asStr(answers["q3"]);
  const enjoy = asMulti(answers["q4"]);
  const drain = asMulti(answers["q5"]);
  const workStyle = asStr(answers["q6"]);
  const persona = asStr(answers["q7"]);
  const engSpeak = asNum(answers["q8"]);
  const engWrite = asNum(answers["q9"]);
  const engVideo = asNum(answers["q10"]);
  const tools = asMulti(answers["q11"]);
  const onlineXp = asStr(answers["q12"]);
  const resume = asStr(answers["q13"]);
  const apps = asStr(answers["q14"]);
  const replies = asStr(answers["q15"]);
  const challenge = asStr(answers["q16"]);
  const hours = asStr(answers["q17"]);
  const interests = asMulti(answers["q18"]);

  const scores: Record<CareerPath, number> = Object.fromEntries(
    PATHS.map((p) => [p, 0])
  ) as Record<CareerPath, number>;

  // ===== Weights (sum 100) =====
  // experience 25, communication 20, enjoyed tasks 15, work style/persona 12,
  // challenges 8, tools/digital 8, application history 4, interest 8

  // --- 25% Previous work experience ---
  const W_EXP = 25;
  switch (job) {
    case "bpo":
      scores["Customer Support VA"] += W_EXP;
      scores["Executive Assistant VA"] += W_EXP * 0.3;
      break;
    case "sales":
      scores["Customer Support VA"] += W_EXP * 0.7;
      scores["Email Marketing VA"] += W_EXP * 0.6;
      scores["Social Media VA"] += W_EXP * 0.4;
      break;
    case "admin":
      scores["Executive Assistant VA"] += W_EXP;
      scores["General Virtual Assistant"] += W_EXP * 0.85;
      scores["Data Entry / Research VA"] += W_EXP * 0.6;
      break;
    case "teaching":
      scores["Content Writer VA"] += W_EXP * 0.8;
      scores["Customer Support VA"] += W_EXP * 0.4;
      scores["General Virtual Assistant"] += W_EXP * 0.4;
      break;
    case "healthcare":
      scores["Customer Support VA"] += W_EXP * 0.6;
      scores["Data Entry / Research VA"] += W_EXP * 0.6;
      scores["Executive Assistant VA"] += W_EXP * 0.4;
      break;
    case "hospitality":
      scores["Customer Support VA"] += W_EXP * 0.7;
      scores["General Virtual Assistant"] += W_EXP * 0.4;
      break;
    case "freelancing":
      scores["General Virtual Assistant"] += W_EXP * 0.7;
      scores["Social Media VA"] += W_EXP * 0.4;
      scores["Content Writer VA"] += W_EXP * 0.4;
      break;
    case "owner":
      scores["Executive Assistant VA"] += W_EXP * 0.7;
      scores["Email Marketing VA"] += W_EXP * 0.5;
      scores["Social Media VA"] += W_EXP * 0.4;
      break;
    case "ofw":
      scores["Customer Support VA"] += W_EXP * 0.5;
      scores["General Virtual Assistant"] += W_EXP * 0.5;
      break;
    default:
      scores["General Virtual Assistant"] += W_EXP * 0.4;
      scores["Data Entry / Research VA"] += W_EXP * 0.3;
  }
  // Years multiplier
  const yearsBoost = years === "10p" ? 1.15 : years === "5_10" ? 1.1 : years === "3_5" ? 1.05 : 1;
  if (yearsBoost !== 1) {
    PATHS.forEach((p) => (scores[p] *= yearsBoost));
  }

  // --- 20% Communication confidence ---
  const W_COMM = 20;
  const speak = engSpeak / 5;
  const write = engWrite / 5;
  const video = engVideo / 5;
  scores["Customer Support VA"] += W_COMM * (0.55 * speak + 0.2 * video + 0.25 * write);
  scores["Content Writer VA"] += W_COMM * (0.75 * write + 0.25 * speak);
  scores["Email Marketing VA"] += W_COMM * (0.7 * write + 0.3 * speak);
  scores["Executive Assistant VA"] += W_COMM * (0.4 * write + 0.3 * speak + 0.3 * video);
  scores["Social Media VA"] += W_COMM * (0.5 * write + 0.3 * video + 0.2 * speak);
  scores["General Virtual Assistant"] += W_COMM * (0.35 * write + 0.35 * speak + 0.3 * video);
  scores["Data Entry / Research VA"] += W_COMM * (0.2 * write + 0.1 * speak); // low comm requirement

  // --- 15% Enjoyed tasks (energizers) ---
  const W_ENJ = 15;
  const each = W_ENJ / Math.max(1, enjoy.length);
  enjoy.forEach((t) => {
    switch (t) {
      case "help_customers":
      case "talking":
        scores["Customer Support VA"] += each;
        break;
      case "organize":
      case "planning":
        scores["Executive Assistant VA"] += each * 0.8;
        scores["General Virtual Assistant"] += each * 0.7;
        break;
      case "writing":
        scores["Content Writer VA"] += each;
        scores["Email Marketing VA"] += each * 0.6;
        break;
      case "research":
        scores["Data Entry / Research VA"] += each;
        scores["Content Writer VA"] += each * 0.3;
        break;
      case "design":
        scores["Social Media VA"] += each * 0.9;
        break;
      case "social":
        scores["Social Media VA"] += each;
        scores["Email Marketing VA"] += each * 0.4;
        break;
      case "presentations":
        scores["Executive Assistant VA"] += each * 0.5;
        scores["Social Media VA"] += each * 0.4;
        break;
      case "data":
        scores["Data Entry / Research VA"] += each;
        scores["General Virtual Assistant"] += each * 0.3;
        break;
    }
  });
  // Drain tasks subtract
  drain.forEach((t) => {
    switch (t) {
      case "calls": scores["Customer Support VA"] -= 5; break;
      case "writing": scores["Content Writer VA"] -= 5; scores["Email Marketing VA"] -= 3; break;
      case "design": scores["Social Media VA"] -= 4; break;
      case "admin": scores["Executive Assistant VA"] -= 4; scores["General Virtual Assistant"] -= 3; break;
      case "research": scores["Data Entry / Research VA"] -= 4; break;
      case "social": scores["Social Media VA"] -= 4; break;
    }
  });

  // --- 12% Work style + persona ---
  const W_STYLE = 12;
  if (workStyle === "frequent") {
    scores["Customer Support VA"] += W_STYLE * 0.6;
    scores["Executive Assistant VA"] += W_STYLE * 0.4;
  } else if (workStyle === "solo") {
    scores["Data Entry / Research VA"] += W_STYLE * 0.6;
    scores["Content Writer VA"] += W_STYLE * 0.5;
    scores["Email Marketing VA"] += W_STYLE * 0.3;
  } else if (workStyle === "balance") {
    scores["General Virtual Assistant"] += W_STYLE * 0.4;
    scores["Social Media VA"] += W_STYLE * 0.3;
  }
  switch (persona) {
    case "solver": scores["Customer Support VA"] += W_STYLE * 0.5; break;
    case "organizer": scores["Executive Assistant VA"] += W_STYLE * 0.6; scores["General Virtual Assistant"] += W_STYLE * 0.4; break;
    case "creator": scores["Social Media VA"] += W_STYLE * 0.5; scores["Content Writer VA"] += W_STYLE * 0.4; break;
    case "analyst": scores["Data Entry / Research VA"] += W_STYLE * 0.6; scores["Email Marketing VA"] += W_STYLE * 0.4; break;
    case "creative": scores["Social Media VA"] += W_STYLE * 0.6; scores["Content Writer VA"] += W_STYLE * 0.3; break;
  }

  // --- 8% Challenges ---
  const W_CH = 8;
  if (challenge === "niche") scores["General Virtual Assistant"] += W_CH;
  else if (challenge === "no_replies") {
    if (job === "bpo" || job === "sales") scores["Customer Support VA"] += W_CH;
    else scores["General Virtual Assistant"] += W_CH * 0.6;
  } else if (challenge === "unqualified") {
    scores["Data Entry / Research VA"] += W_CH * 0.6;
    scores["General Virtual Assistant"] += W_CH * 0.5;
  }

  // --- 8% Tools / digital readiness ---
  const W_TOOL = 8;
  if (tools.includes("canva")) scores["Social Media VA"] += W_TOOL * 0.5;
  if (tools.includes("meta")) { scores["Social Media VA"] += W_TOOL * 0.4; scores["Email Marketing VA"] += W_TOOL * 0.2; }
  if (tools.includes("google") || tools.includes("msoffice")) {
    scores["General Virtual Assistant"] += W_TOOL * 0.3;
    scores["Executive Assistant VA"] += W_TOOL * 0.3;
    scores["Data Entry / Research VA"] += W_TOOL * 0.3;
  }
  if (tools.includes("crm")) { scores["Customer Support VA"] += W_TOOL * 0.4; scores["Email Marketing VA"] += W_TOOL * 0.4; }
  if (tools.includes("slack") || tools.includes("zoom")) scores["General Virtual Assistant"] += W_TOOL * 0.2;
  if (tools.includes("none") || tools.length === 0) scores["Data Entry / Research VA"] += W_TOOL * 0.3;

  // --- 4% Application history ---
  const W_APP = 4;
  if (apps === "many" && (replies === "none_at_all" || replies === "1_2")) {
    if (job === "bpo" || job === "sales") scores["Customer Support VA"] += W_APP;
    else scores["General Virtual Assistant"] += W_APP * 0.7;
  } else if (replies === "interview_no_hire") {
    interests.forEach((i) => {
      const p = interestToPath[i];
      if (p) scores[p] += W_APP * 0.6;
    });
  }

  // --- 8% Interest (preference signal only — intentionally low weight) ---
  const W_INT = 8;
  const statedPaths: CareerPath[] = [];
  interests.forEach((i) => {
    const p = interestToPath[i];
    if (p) {
      scores[p] += W_INT / Math.max(1, interests.length);
      statedPaths.push(p);
    }
  });

  // Pick winner
  const ranked = (Object.entries(scores) as [CareerPath, number][]).sort((a, b) => b[1] - a[1]);
  const path = ranked[0][0];
  const overrode = statedPaths.length > 0 && !statedPaths.includes(path);

  // ===== Personalized narrative =====
  const jobText = optionLabel("q2", job);
  const challengeText = optionLabel("q16", challenge);

  const taglines: Record<CareerPath, string> = {
    "General Virtual Assistant": "The most flexible launchpad into the VA world.",
    "Customer Support VA": "Turn your people skills into recurring international income.",
    "Social Media VA": "Build brands online — one of the fastest-growing VA niches.",
    "Content Writer VA": "Get paid to write — clients are starving for great writers.",
    "Data Entry / Research VA": "Detail-oriented work with steady, predictable client demand.",
    "Executive Assistant VA": "High-trust support for founders — premium rates, long retainers.",
    "Email Marketing VA": "Own the highest-ROI channel for online businesses.",
  };

  const commAvg = (engSpeak + engWrite + engVideo) / 3;
  const commWord = commAvg >= 4 ? "strong" : commAvg >= 3 ? "solid" : commAvg >= 2 ? "developing" : "still-growing";

  let narrative = "";
  if (overrode) {
    const stated = statedPaths[0];
    narrative =
      `You leaned toward ${stated}, but after looking at everything you shared — your background as ${jobText || "your current role"}, ` +
      `your ${commWord} communication, and the tasks that actually energize you — ${path} is the strongest first move. ` +
      `It plays directly into advantages most aspiring VAs don't have and gives you a faster first client win.`;
  } else {
    narrative =
      `Based on everything you shared — your background as ${jobText || "your current role"}, ` +
      `your ${commWord} communication confidence, and the tasks you genuinely enjoy — ${path} is the strongest fit ` +
      `for where you are right now.`;
  }

  // Why bullets — reference real answers
  const why: string[] = [];
  if (jobText) {
    why.push(
      path === "Customer Support VA"
        ? `Your experience in ${jobText} translates directly to handling client conversations clients pay premium rates for.`
        : path === "Executive Assistant VA"
        ? `Your background in ${jobText} gives you the organizational instinct EA clients look for.`
        : path === "Data Entry / Research VA"
        ? `Your ${jobText} background shows attention to detail — the #1 quality clients hire for in this niche.`
        : `Your experience in ${jobText} is a real asset clients in this niche value.`
    );
  }
  if (engSpeak || engWrite) {
    why.push(
      commAvg >= 4
        ? `You rated your English ${commWord} (${Math.round(commAvg)}/5 average) — that puts you ahead of most applicants in the international market.`
        : `Your communication is ${commWord} — ${path} lets you grow without communication being the bottleneck.`
    );
  }
  if (enjoy.length) {
    const enjoyText = enjoy.map((id) => optionLabel("q4", id).toLowerCase()).join(", ");
    why.push(`You said you enjoy ${enjoyText} — that's a direct match for the daily work in ${path}.`);
  }
  if (drain.length) {
    const drainText = drain.map((id) => optionLabel("q5", id).toLowerCase()).join(", ");
    why.push(`You told us ${drainText} drains you — ${path} keeps that to a minimum.`);
  }
  if (overrode && statedPaths.length) {
    why.push(`You're interested in ${statedPaths.join(", ")} — we'll keep that on your roadmap, but ${path} is the first door to knock on.`);
  }
  if (apps === "many" && (replies === "none_at_all" || replies === "1_2")) {
    why.push(`You've applied many times with few replies — that's almost always a positioning problem, not a skills problem. A clearer niche fixes it fast.`);
  } else if (replies === "interview_no_hire") {
    why.push(`You've already reached interviews — you're closer than you think. The gap is portfolio polish, not capability.`);
  }
  if (hours === "30p") why.push(`You can commit 30+ hours/week — enough to land a first client within 30 days if you focus.`);

  // Strengths
  const strengths: string[] = [];
  if (job === "bpo") strengths.push("Customer handling under pressure");
  if (job === "admin") strengths.push("Admin systems and follow-through");
  if (job === "sales") strengths.push("Persuasive communication and rapport");
  if (job === "teaching") strengths.push("Clear written explanations");
  if (job === "ofw") strengths.push("Cross-cultural communication");
  if (job === "owner") strengths.push("Business-owner mindset — you think like a client");
  if (commAvg >= 4) strengths.push("Strong English communication");
  if (enjoy.includes("organize") || enjoy.includes("planning")) strengths.push("Natural organizer");
  if (enjoy.includes("research")) strengths.push("Research and attention to detail");
  if (enjoy.includes("writing")) strengths.push("Written communication");
  if (tools.length >= 3) strengths.push("Already comfortable with the core VA toolset");
  if (apps === "many" || apps === "few") strengths.push("You take action — most aspiring VAs never apply");
  if (strengths.length === 0) strengths.push("Willingness to learn", "Fresh perspective");

  // Challenges
  const challenges: string[] = [];
  if (challenge === "niche") challenges.push(`You said you don't know your niche — that's exactly why your applications aren't landing.`);
  if (challenge === "resume_help") challenges.push(`Your resume isn't speaking the client's language yet — that's a quick fix.`);
  if (challenge === "no_replies") challenges.push(`You're applying but getting no replies — almost always a positioning and pitch issue.`);
  if (challenge === "scared") challenges.push(`Fear of losing your current income is the real blocker, not your skills.`);
  if (challenge === "find_clients") challenges.push(`You don't yet know where the real clients hang out — we'll point you to the right platforms.`);
  if (challenge === "unqualified") challenges.push(`Imposter syndrome is bigger than your actual skill gap — you're more ready than you think.`);
  if (commAvg < 3) challenges.push(`Communication confidence will need deliberate, daily practice.`);
  if (resume === "neither") challenges.push(`You haven't built a resume or profile yet — that's step one this week.`);

  // Next steps
  const nextSteps: string[] = [];
  const challengeNext: Record<string, string> = {
    niche: "Lock in one niche this week — don't try to do everything.",
    resume_help: "Rewrite your resume using a proven VA template before sending another application.",
    no_replies: "Audit your last 5 applications — your cover letter is likely the issue, not your skills.",
    scared: "Build VA income on the side first. Quit only after you've replaced 50% of your salary.",
    find_clients: "Focus on ONE platform (OnlineJobs.ph or Upwork) and apply daily for 30 days.",
    unqualified: "Pick one micro-skill and complete a free certification this week.",
  };
  if (challenge && challengeNext[challenge]) nextSteps.push(challengeNext[challenge]);
  const pathStep: Record<CareerPath, string> = {
    "General Virtual Assistant": "Pick 3 admin tasks you've done before and turn each into a portfolio case study.",
    "Customer Support VA": "Add 2 mock customer-support scenarios (email + chat) to your portfolio.",
    "Social Media VA": "Create a 5-post mini portfolio in Canva for a fake brand.",
    "Content Writer VA": "Publish 3 sample posts in your niche on Medium or LinkedIn.",
    "Data Entry / Research VA": "Build a sample research report in Google Sheets you can share with clients.",
    "Executive Assistant VA": "Build a sample inbox & calendar SOP doc you can show a founder.",
    "Email Marketing VA": "Write a 3-email welcome sequence sample for a niche brand.",
  };
  nextSteps.push(pathStep[path]);
  nextSteps.push("Set up your OnlineJobs.ph profile with a clear headline and short intro video.");
  nextSteps.push("Apply to 5 jobs per day for the next 14 days using a tailored pitch.");

  const toolsByPath: Record<CareerPath, string[]> = {
    "General Virtual Assistant": ["Google Workspace", "Notion", "Slack", "Trello", "Calendly"],
    "Customer Support VA": ["Zendesk", "Intercom", "Gorgias", "Slack", "Loom"],
    "Social Media VA": ["Canva", "Meta Business Suite", "Buffer / Later", "CapCut", "ChatGPT"],
    "Content Writer VA": ["Google Docs", "Grammarly", "Surfer SEO", "ChatGPT", "WordPress"],
    "Data Entry / Research VA": ["Google Sheets / Excel", "Airtable", "Notion", "Apollo", "ChatGPT"],
    "Executive Assistant VA": ["Google Workspace", "Notion", "Calendly", "Slack", "Asana"],
    "Email Marketing VA": ["Klaviyo", "Mailchimp", "ConvertKit", "ChatGPT", "Canva"],
  };

  if (situation === "parent" || hours === "lt10") {
    narrative += ` And since your available time is limited right now, this path fits part-time work better than any other.`;
  } else if (hours === "30p") {
    narrative += ` With 30+ hours a week available, you can realistically land your first paid client within the next 30 days.`;
  }

  return {
    path,
    statedInterests: Array.from(new Set(statedPaths)),
    overrode,
    tagline: taglines[path],
    narrative,
    why: why.slice(0, 6),
    strengths: Array.from(new Set(strengths)).slice(0, 5),
    challenges: Array.from(new Set(challenges)).slice(0, 4),
    nextSteps: Array.from(new Set(nextSteps)).slice(0, 5),
    tools: toolsByPath[path],
    scores,
  };
}
