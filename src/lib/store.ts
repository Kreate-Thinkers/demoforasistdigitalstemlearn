// Lightweight client-side store for the demo (no backend).
export type LeaderRow = {
  id: string;
  name: string;
  points: number;
  badges: string[];
};

const KEY = "asist_leaderboard_v1";
const STUDENT_KEY = "asist_student_id";

const SEED: LeaderRow[] = [
  { id: "ASIST-STUDENT-014", name: "Aisha N.",   points: 130, badges: ["🏗️", "💡"] },
  { id: "ASIST-STUDENT-022", name: "Brian K.",   points: 120, badges: ["🚦"] },
  { id: "ASIST-STUDENT-009", name: "Fatuma A.",  points: 110, badges: ["🚗"] },
  { id: "ASIST-STUDENT-031", name: "Joseph M.",  points: 95,  badges: ["🚦"] },
  { id: "ASIST-STUDENT-007", name: "Patience O.", points: 80, badges: ["💡"] },
  { id: "ASIST-STUDENT-001", name: "You (Demo Engineer)", points: 0, badges: [] },
  { id: "ASIST-STUDENT-044", name: "Ronald T.",  points: 60,  badges: [] },
  { id: "ASIST-STUDENT-052", name: "Sandra L.",  points: 45,  badges: [] },
];

export function getStudentId(): string {
  if (typeof window === "undefined") return "ASIST-STUDENT-001";
  return localStorage.getItem(STUDENT_KEY) ?? "ASIST-STUDENT-001";
}

export function getLeaderboard(): LeaderRow[] {
  if (typeof window === "undefined") return SEED;
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(SEED));
    return SEED;
  }
  try { return JSON.parse(raw) as LeaderRow[]; } catch { return SEED; }
}

export function awardPoints(studentId: string, points: number, badge?: string): LeaderRow[] {
  const board = getLeaderboard().map(r => ({ ...r }));
  const me = board.find(r => r.id === studentId);
  if (me) {
    me.points += points;
    if (badge && !me.badges.includes(badge)) me.badges.push(badge);
  }
  board.sort((a, b) => b.points - a.points);
  localStorage.setItem(KEY, JSON.stringify(board));
  window.dispatchEvent(new CustomEvent("leaderboard:update"));
  return board;
}

export function resetLeaderboard() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("leaderboard:update"));
}
