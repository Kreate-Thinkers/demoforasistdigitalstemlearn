import { useState } from "react";
import { Check, X } from "lucide-react";

export type QuizQ = { q: string; options: string[]; answer: number };

export function Quiz({ questions, onPass, passPct = 70 }: { questions: QuizQ[]; onPass?: () => void; passPct?: number }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  const correct = answers.filter((a, i) => a === questions[i].answer).length;
  const pct = Math.round((correct / questions.length) * 100);
  const passed = submitted && pct >= passPct;

  function submit() {
    setSubmitted(true);
    if ((correct / questions.length) * 100 >= passPct) onPass?.();
  }

  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <div key={qi} className="rounded-xl border border-border bg-card p-4">
          <p className="font-semibold text-sm mb-3"><span className="text-accent">Q{qi + 1}.</span> {q.q}</p>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => {
              const sel = answers[qi] === oi;
              const isCorrect = submitted && oi === q.answer;
              const isWrong = submitted && sel && oi !== q.answer;
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers(a => a.map((v, i) => (i === qi ? oi : v)))}
                  className={`text-left text-sm px-3 py-2.5 rounded-lg border tap-press flex items-center gap-2 ${
                    isCorrect ? "border-success bg-success/10 text-success-foreground" :
                    isWrong   ? "border-destructive bg-destructive/10" :
                    sel       ? "border-accent bg-accent/10" :
                                "border-border bg-background hover:border-accent/50"
                  }`}
                >
                  <span className="flex-1">{opt}</span>
                  {isCorrect && <Check className="h-4 w-4 text-success" />}
                  {isWrong && <X className="h-4 w-4 text-destructive" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submit}
          disabled={answers.some(a => a === null)}
          className="w-full bg-accent-grad text-white font-bold py-3.5 rounded-xl shadow-pop tap-press disabled:opacity-50"
        >
          Submit Quiz
        </button>
      ) : (
        <div className={`rounded-xl p-4 text-center ${passed ? "bg-success/15 text-success-foreground" : "bg-destructive/10"}`}>
          <p className="text-2xl font-bold">{pct}%</p>
          <p className="text-sm mt-1">
            {passed ? "Mission Accomplished — well done, Engineer!" : "Try again — review the slides for hints."}
          </p>
          {!passed && (
            <button onClick={() => { setSubmitted(false); setAnswers(questions.map(() => null)); }}
              className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold tap-press">
              Retry
            </button>
          )}
        </div>
      )}
    </div>
  );
}
