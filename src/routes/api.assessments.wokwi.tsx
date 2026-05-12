import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/assessments/wokwi")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            student_id?: string;
            project_id?: string;
            code?: string;
            simulation_log?: string[];
            result_tag?: string;
          };

          // Static code-honesty check: looks for required tokens
          const code = body.code ?? "";
          const honestyTokens = ["pinMode", "digitalWrite", "delay", "loop"];
          const honesty = honestyTokens.every(t => code.includes(t));

          // Behavioral check: simulation log must include all 3 LED transitions
          const log = (body.simulation_log ?? []).join(" ");
          const behavior =
            /pin\s*8/i.test(log) && /pin\s*9/i.test(log) && /pin\s*10/i.test(log);

          const ok = honesty && behavior;

          return Response.json({
            ok,
            checks: { honesty, behavior },
            points: ok ? 75 : 0,
            student_id: body.student_id ?? null,
            project_id: body.project_id ?? null,
            received_at: new Date().toISOString(),
            message: ok
              ? "Mission Accomplished — verified."
              : "Verification failed. Check your wiring & code.",
          });
        } catch (err) {
          return Response.json(
            { ok: false, error: (err as Error).message },
            { status: 400 },
          );
        }
      },
    },
  },
});
