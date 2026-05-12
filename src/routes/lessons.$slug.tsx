import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LESSONS } from "@/lib/lessons";
import { SlideDeck } from "@/components/SlideDeck";
import { Quiz } from "@/components/Quiz";
import { celebrate } from "@/lib/confetti";
import { awardPoints, getStudentId } from "@/lib/store";
import { Download, Play, ClipboardCheck, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/lessons/$slug")({
  loader: ({ params }) => {
    const lesson = LESSONS.find(l => l.slug === params.slug);
    if (!lesson) throw notFound();
    return { lesson };
  },
  component: LessonPage,
  notFoundComponent: () => (
    <AppShell>
      <div className="p-6 text-center">
        <p className="text-sm">Lesson not found.</p>
        <Link to="/lessons" className="text-accent underline">Back to lessons</Link>
      </div>
    </AppShell>
  ),
  errorComponent: ({ error }) => (
    <AppShell><div className="p-6 text-sm text-destructive">{error.message}</div></AppShell>
  ),
});

function LessonPage() {
  const { lesson } = Route.useLoaderData();
  const [quizPassed, setQuizPassed] = useState(false);

  function onQuizPass() {
    if (quizPassed) return;
    setQuizPassed(true);
    awardPoints(getStudentId(), 25, lesson.badge);
    celebrate();
    toast.success("+25 points • Quiz badge earned!");
  }

  return (
    <AppShell>
      <div className="max-w-md mx-auto px-5 pt-5">
        <Link to="/lessons" className="text-xs text-muted-foreground">← All lessons</Link>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-hero grid place-items-center text-2xl shadow-pop">{lesson.emoji}</div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">{lesson.difficulty} • {lesson.duration}</p>
            <h2 className="text-xl font-extrabold text-primary leading-tight">{lesson.title}</h2>
          </div>
        </div>

        <section className="mt-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Step-by-step</h3>
          <SlideDeck slides={lesson.slides} />
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Demo Video</h3>
          <video
            src={lesson.videoUrl}
            className="w-full rounded-xl border border-border shadow-soft aspect-video bg-black"
            autoPlay muted loop playsInline controls
          />
        </section>

        <section className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">{lesson.embed.label}</h3>
          <div className="rounded-xl overflow-hidden border border-border shadow-soft bg-card">
            <iframe
              title={lesson.embed.label}
              src={lesson.embed.url}
              className="w-full aspect-[4/3] bg-white"
              allow="accelerometer; gyroscope; clipboard-write"
            />
          </div>
          <a href={lesson.embed.url} target="_blank" rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs text-accent font-semibold">
            Open full simulator <ExternalLink className="h-3 w-3" />
          </a>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3">
          <a href={lesson.worksheetUrl} download
            className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold py-3 rounded-xl tap-press text-sm">
            <Download className="h-4 w-4" /> Worksheet
          </a>
          <Link to="/assessment"
            className="flex items-center justify-center gap-2 bg-accent-grad text-white font-bold py-3 rounded-xl shadow-pop tap-press text-sm">
            <ClipboardCheck className="h-4 w-4" /> Assess
          </Link>
        </section>

        <section className="mt-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <Play className="h-3 w-3 text-accent" /> End-of-Lesson Quiz
          </h3>
          <Quiz questions={lesson.quiz} onPass={onQuizPass} />
        </section>
      </div>
    </AppShell>
  );
}
