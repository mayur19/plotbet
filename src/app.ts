import express from "express";
import { z } from "zod";
import { PredictionLeague } from "./domain.js";

const questionInput = z.object({
  prompt: z.string().min(1).max(300),
  options: z.array(z.string().min(1).max(120)).min(2).max(20),
  lockAt: z.coerce.date(),
  revealAt: z.coerce.date(),
  points: z.number().int().min(1).max(100)
});

export function createApp(league = new PredictionLeague()) {
  const app = express();
  app.use(express.json({ limit: "128kb" }));
  app.use(express.static("public"));
  app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
  app.post("/api/questions", (request, response) => {
    const parsed = questionInput.safeParse(request.body);
    if (!parsed.success) return response.status(422).json({ error: "VALIDATION_FAILED" });
    try { return response.status(201).json({ data: league.addQuestion(parsed.data) }); }
    catch (error) { return response.status(422).json({ error: error instanceof Error ? error.message : "UNKNOWN" }); }
  });
  app.post("/api/questions/:id/picks", (request, response) => {
    const parsed = z.object({ playerId: z.string().min(1), option: z.string().min(1) }).safeParse(request.body);
    if (!parsed.success) return response.status(422).json({ error: "VALIDATION_FAILED" });
    try { return response.status(201).json({ data: league.submit(request.params.id, parsed.data.playerId, parsed.data.option) }); }
    catch (error) {
      const code = error instanceof Error ? error.message : "UNKNOWN";
      return response.status(code === "PICKS_LOCKED" ? 409 : 422).json({ error: code });
    }
  });
  return app;
}

