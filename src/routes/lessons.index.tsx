import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LESSONS } from "@/lib/lessons";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/lessons/")({ component: Lessons });

function Lessons() {
  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 pt-6">
        <h2 className="text-2xl font-extrabold text-primary">Lessons</h2>
        <p className="text-sm text-muted-foreground mt-1">Swipe through, simulate, then submit.</p>
        <div className="mt-5 space-y-4">
          {LESSONS.map(l => (
            <Link key={l.slug} to="/lessons/$slug" params={{ slug: l.slug }}
              className="block rounded-2xl overflow-hidden border border-border shadow-soft tap-press bg-card">
              <div className="bg-hero p-6 text-white relative">
                <div className="text-5xl">{l.emoji}</div>
                <h3 className="mt-3 font-bold text-lg leading-tight">{l.title}</h3>
                <p className="text-xs text-white/80 mt-1">{l.subtitle}</p>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                  {l.difficulty} • {l.duration}
                </span>
                <ArrowRight className="h-4 w-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
