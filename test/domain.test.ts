import { describe, expect, it } from "vitest";
import { PredictionLeague } from "../src/domain.js";

describe("PredictionLeague", () => {
  it("allows revisions before lock and rejects writes at the boundary", () => {
    let now = new Date("2026-11-20T10:00:00Z");
    const league = new PredictionLeague(() => now);
    const question = league.addQuestion({
      prompt: "Who sent the signal?", options: ["Vale", "Mira"], points: 2,
      lockAt: new Date("2026-11-20T11:00:00Z"), revealAt: new Date("2026-11-20T12:00:00Z")
    });
    expect(league.submit(question.id, "priya", "Vale").revision).toBe(1);
    expect(league.submit(question.id, "priya", "Mira").revision).toBe(2);
    now = new Date("2026-11-20T11:00:00Z");
    expect(() => league.submit(question.id, "priya", "Vale")).toThrow("PICKS_LOCKED");
  });

  it("scores only the latest pick exactly once", () => {
    let now = new Date("2026-11-20T10:00:00Z");
    const league = new PredictionLeague(() => now);
    const question = league.addQuestion({
      prompt: "Who?", options: ["Vale", "Mira"], points: 3,
      lockAt: new Date("2026-11-20T11:00:00Z"), revealAt: new Date("2026-11-20T12:00:00Z")
    });
    league.submit(question.id, "priya", "Vale");
    league.submit(question.id, "priya", "Mira");
    now = new Date("2026-11-20T11:30:00Z");
    expect(league.finalize(question.id, "Mira")[0]?.points).toBe(3);
    expect(() => league.finalize(question.id, "Mira")).toThrow("ALREADY_SCORED");
  });
});

