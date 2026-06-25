import type { Answers } from "./assessment";

const KEY = "panda-va-assessment-v2";

export interface StoredState {
  answers: Answers;
  index: number;
}

export function loadState(): StoredState | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredState) : null;
  } catch {
    return null;
  }
}

export function saveState(state: StoredState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
