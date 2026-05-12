import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { getLeaderboard, getStudentId, resetLeaderboard, type LeaderRow } from "@/lib/store";
import { Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/leaderboard/")({ component: Leaderboard });

function Leaderboard() {
  const [rows, setRows] = useState<LeaderRow[]>([]);
  const me = getStudentId();

  useEffect(() => {
    setRows(getLeaderboard().sort((a, b) => b.points - a.points));
    const onUpd = () => setRows(getLeaderboard().sort((a, b) => b.points - a.points));
    window.addEventListener("leaderboard:update", onUpd);
    return () => window.removeEventListener("leaderboard:update", onUpd);
  }, []);

  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
              <Trophy className="h-6 w-6 text-accent" /> Leaderboard
            </h2>
            <p className="text-sm text-muted-foreground">This week's top engineers.</p>
          </div>
          <button onClick={() => { resetLeaderboard(); setRows(getLeaderboard()); }}
            className="text-[11px] font-semibold inline-flex items-center gap-1 text-muted-foreground tap-press">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        <ul className="mt-5 space-y-2">
          <AnimatePresence initial={false}>
            {rows.map((r, i) => {
              const isMe = r.id === me;
              const rank = i + 1;
              return (
                <motion.li
                  layout
                  key={r.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    isMe ? "border-accent bg-accent/10 shadow-pop" : "border-border bg-card"
                  }`}
                >
                  <div className={`h-10 w-10 grid place-items-center rounded-lg font-extrabold text-sm ${
                    rank === 1 ? "bg-accent text-white" :
                    rank === 2 ? "bg-primary text-primary-foreground" :
                    rank === 3 ? "bg-secondary text-secondary-foreground" :
                                  "bg-muted text-muted-foreground"
                  }`}>
                    #{rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-primary truncate">{r.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground truncate">{r.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-primary">{r.points}<span className="text-[10px] font-semibold text-muted-foreground"> pts</span></p>
                    <p className="text-base leading-none">{r.badges.join(" ") || "—"}</p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </AppShell>
  );
}
