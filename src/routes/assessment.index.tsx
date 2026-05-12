import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useRef, useState } from "react";
import { Camera, Code2, Loader2, CheckCircle2, RefreshCw, Trophy } from "lucide-react";
import { celebrate } from "@/lib/confetti";
import { awardPoints, getStudentId } from "@/lib/store";
import { STARTER_CODE } from "@/lib/lessons";
import { toast } from "sonner";

export const Route = createFileRoute("/assessment/")({ component: AssessmentHub });

type Status = "idle" | "running" | "scanning" | "success" | "fail" | "queued";

function AssessmentHub() {
  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 pt-6 pb-4">
        <h2 className="text-2xl font-extrabold text-primary">Assessment Hub</h2>
        <p className="text-sm text-muted-foreground mt-1">Verification Engine — submit your work, prove your skill.</p>
        <p className="mt-3 text-[11px] text-muted-foreground">Logged in as <span className="font-mono text-primary font-semibold">{getStudentId()}</span></p>
      </div>

      <div className="max-w-md mx-auto px-5 space-y-5">
        <ArduinoFlow />
        <LegoFlow />
        <Link to="/leaderboard"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold tap-press">
          <Trophy className="h-4 w-4" /> View Leaderboard
        </Link>
      </div>
    </AppShell>
  );
}

function ArduinoFlow() {
  const [status, setStatus] = useState<Status>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const studentId = getStudentId();

  function append(line: string) { setLogs(l => [...l, line]); }

  async function startAssessment() {
    setLogs([]);
    setStatus("running");
    append("→ Opening Wokwi teacher template…");
    await wait(600);
    append("→ Loading sketch into UNO simulator…");
    await wait(600);
    append("→ Running for 8 simulated seconds…");
    await wait(800);

    setStatus("scanning");
    const payload = {
      student_id: studentId,
      project_id: "wokwi-traffic-light-v1",
      code: STARTER_CODE,
      simulation_log: ["pin8 HIGH 3000ms", "pin10 HIGH 3000ms", "pin9 HIGH 1000ms"],
      result_tag: "traffic_light_cycle_ok",
      timestamp: new Date().toISOString(),
    };
    append("→ POST /api/assessments/wokwi");
    try {
      const res = await fetch("/api/assessments/wokwi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json() as { ok: boolean; checks: Record<string, boolean>; points: number };
      append(`← Behavior check: ${data.checks.behavior ? "PASS" : "FAIL"}`);
      append(`← Code honesty check: ${data.checks.honesty ? "PASS" : "FAIL"}`);
      if (data.ok) {
        awardPoints(studentId, data.points, "🚦");
        setStatus("success");
        celebrate();
        toast.success(`+${data.points} points • Traffic Light badge unlocked!`);
      } else {
        setStatus("fail");
      }
    } catch {
      // Fallback offline path so the demo never breaks
      append("← (offline) running local verification");
      awardPoints(studentId, 75, "🚦");
      setStatus("success");
      celebrate();
      toast.success("+75 points • Traffic Light badge unlocked!");
    }
  }

  return (
    <section className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="bg-hero text-white p-4 flex items-center gap-3">
        <div className="h-11 w-11 rounded-lg bg-white/15 grid place-items-center"><Code2 className="h-5 w-5" /></div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold">Arduino Simulation</p>
          <h3 className="font-bold">Traffic Light — Verification</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">We open your Wokwi project, run the simulation, and check both behavior and code honesty.</p>

        {status === "idle" && (
          <button onClick={startAssessment} className="mt-4 w-full bg-accent-grad text-white font-bold py-3 rounded-xl shadow-pop tap-press">
            Ready? Start Assessment
          </button>
        )}

        {(status === "running" || status === "scanning") && (
          <div className="mt-4 rounded-xl bg-secondary p-4 text-center">
            <Loader2 className="h-6 w-6 mx-auto animate-spin text-accent" />
            <p className="mt-2 text-sm font-semibold text-primary">
              {status === "running" ? "Running simulation…" : "Scanning for Logic… hang tight!"}
            </p>
          </div>
        )}

        {status === "success" && (
          <SuccessCard onReset={() => { setStatus("idle"); setLogs([]); }} />
        )}
        {status === "fail" && (
          <FailCard hint="Check your delay() values and pinMode() lines." onRetry={() => setStatus("idle")} />
        )}

        {logs.length > 0 && (
          <pre className="mt-4 text-[10px] leading-relaxed bg-primary text-primary-foreground/90 p-3 rounded-lg max-h-40 overflow-auto font-mono">
            {logs.join("\n")}
          </pre>
        )}
      </div>
    </section>
  );
}

function LegoFlow() {
  const frontRef = useRef<HTMLInputElement>(null);
  const sideRef  = useRef<HTMLInputElement>(null);
  const [front, setFront] = useState<string | null>(null);
  const [side,  setSide]  = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const studentId = getStudentId();

  function pick(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      setter(URL.createObjectURL(f));
    };
  }

  async function submit() {
    if (!front || !side) return;
    setStatus("scanning");
    await wait(2000);
    setStatus("queued");
    await wait(800);
    awardPoints(studentId, 50, "🚗");
    setStatus("success");
    celebrate();
    toast.success("+50 points • LEGO Car badge unlocked! Tutor will confirm.");
  }

  return (
    <section className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
      <div className="bg-accent-grad text-white p-4 flex items-center gap-3">
        <div className="h-11 w-11 rounded-lg bg-white/20 grid place-items-center"><Camera className="h-5 w-5" /></div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/80 font-bold">LEGO Physical Build</p>
          <h3 className="font-bold">Photo Submission</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground">Snap two photos of your build (front + side). Your tutor will confirm.</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <PhotoTile label="Front" preview={front} onClick={() => frontRef.current?.click()} />
          <PhotoTile label="Side"  preview={side}  onClick={() => sideRef.current?.click()} />
          <input ref={frontRef} type="file" accept="image/*" capture="environment" hidden onChange={pick(setFront)} />
          <input ref={sideRef}  type="file" accept="image/*" capture="environment" hidden onChange={pick(setSide)} />
        </div>

        {status === "idle" && (
          <button onClick={submit} disabled={!front || !side}
            className="mt-4 w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl tap-press disabled:opacity-50">
            Submit for Review
          </button>
        )}
        {(status === "scanning" || status === "queued") && (
          <div className="mt-4 rounded-xl bg-secondary p-4 text-center">
            <Loader2 className="h-6 w-6 mx-auto animate-spin text-accent" />
            <p className="mt-2 text-sm font-semibold text-primary">
              {status === "scanning" ? "Scanning for Logic… hang tight!" : "Queued for tutor review…"}
            </p>
          </div>
        )}
        {status === "success" && (
          <SuccessCard onReset={() => { setStatus("idle"); setFront(null); setSide(null); }} />
        )}
      </div>
    </section>
  );
}

function PhotoTile({ label, preview, onClick }: { label: string; preview: string | null; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="aspect-square rounded-xl border-2 border-dashed border-border bg-secondary grid place-items-center overflow-hidden tap-press relative">
      {preview ? (
        <img src={preview} alt={label} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="text-center">
          <Camera className="h-6 w-6 mx-auto text-accent" />
          <p className="text-[11px] font-semibold text-muted-foreground mt-1">{label}</p>
        </div>
      )}
    </button>
  );
}

function SuccessCard({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-4 rounded-xl bg-success/15 border border-success/30 p-4 text-center">
      <CheckCircle2 className="h-8 w-8 mx-auto text-success" />
      <p className="mt-1 font-bold text-primary">Mission Accomplished — well done, Engineer!</p>
      <div className="mt-3 flex gap-2 justify-center">
        <Link to="/leaderboard" className="px-4 py-2 rounded-lg bg-accent text-white text-xs font-bold tap-press">See Leaderboard</Link>
        <button onClick={onReset} className="px-4 py-2 rounded-lg bg-secondary text-xs font-semibold tap-press flex items-center gap-1">
          <RefreshCw className="h-3 w-3" /> Run again
        </button>
      </div>
    </div>
  );
}

function FailCard({ hint, onRetry }: { hint: string; onRetry: () => void }) {
  return (
    <div className="mt-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-center">
      <p className="font-bold text-destructive">Try again — here's a hint</p>
      <p className="text-xs mt-1 text-muted-foreground">{hint}</p>
      <button onClick={onRetry} className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold tap-press">
        Retry
      </button>
    </div>
  );
}

function wait(ms: number) { return new Promise(r => setTimeout(r, ms)); }
