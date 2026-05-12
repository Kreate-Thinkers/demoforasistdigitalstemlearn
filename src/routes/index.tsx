import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LESSONS } from "@/lib/lessons";
import { ArrowRight, Sparkles, ClipboardCheck, Trophy, Rocket } from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppShell>
      <section className="relative overflow-hidden bg-hero text-white">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-md mx-auto px-5 pt-8 pb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest bg-white/15 backdrop-blur px-3 py-1 rounded-full border border-white/20">
            <Sparkles className="h-3 w-3" /> Digitising STEM Education
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight">
            Build it. <span className="text-accent">Code it.</span> Own it.
          </h2>
          <p className="mt-3 text-white/85 text-sm leading-relaxed">
            A mobile-first lab for Uganda's young engineers. Tap through lessons, run real
            simulations, snap your build, and climb the leaderboard.
          </p>
          <Link
            to="/lessons"
            className="mt-6 inline-flex items-center gap-2 bg-accent-grad text-white font-bold px-5 py-3 rounded-xl shadow-pop tap-press"
          >
            Start a Lesson <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="max-w-md mx-auto px-5 -mt-6 grid grid-cols-3 gap-3">
        {[
          { icon: Rocket, label: "2 Lessons", sub: "Hands-on" },
          { icon: ClipboardCheck, label: "Auto-Grade", sub: "Verified" },
          { icon: Trophy, label: "Live Board", sub: "Compete" },
        ].map(({ icon: I, label, sub }) => (
          <div key={label} className="rounded-xl bg-card border border-border shadow-soft p-3 text-center">
            <I className="h-5 w-5 text-accent mx-auto" />
            <p className="mt-1 text-xs font-bold text-primary">{label}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </section>

      <section className="max-w-md mx-auto px-5 mt-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Featured Lessons</h3>
        <div className="space-y-3">
          {LESSONS.map(l => (
            <Link
              key={l.slug}
              to="/lessons/$slug"
              params={{ slug: l.slug }}
              className="block rounded-2xl border border-border bg-card p-4 shadow-soft tap-press"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-xl bg-hero grid place-items-center text-3xl shadow-pop">
                  {l.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">{l.difficulty} • {l.duration}</p>
                  <h4 className="font-bold text-primary leading-tight">{l.title}</h4>
                  <p className="text-xs text-muted-foreground truncate">{l.subtitle}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        <Link
          to="/assessment"
          className="mt-6 block rounded-2xl bg-primary text-primary-foreground p-5 shadow-soft tap-press"
        >
          <p className="text-[11px] uppercase tracking-widest text-accent font-bold">Verification Engine</p>
          <h4 className="text-lg font-bold mt-1">Open Assessment Hub</h4>
          <p className="text-xs text-primary-foreground/80 mt-1">Submit Wokwi simulations or upload your build photos.</p>
        </Link>

        <p className="text-center text-[10px] text-muted-foreground mt-8">
          Demo Student ID: <span className="font-mono text-primary">ASIST-STUDENT-001</span>
        </p>
      </section>
    </AppShell>
  );
}
