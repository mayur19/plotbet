import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("question boundary", () => {
  it("rejects an impossible schedule", async () => {
    const response = await request(createApp()).post("/api/questions").send({
      prompt: "Who?", options: ["A", "B"], points: 2,
      lockAt: "2026-11-21T12:00:00Z", revealAt: "2026-11-21T11:00:00Z"
    });
    expect(response.status).toBe(422);
  });
});

