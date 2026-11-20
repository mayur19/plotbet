import { createHash, randomUUID } from "node:crypto";

export interface Question { id: string; prompt: string; options: string[]; lockAt: Date; revealAt: Date; points: number }
export interface Pick { id: string; questionId: string; playerId: string; option: string; revision: number; submittedAt: Date; receipt: string }
export interface ScoreEvent { id: string; questionId: string; playerId: string; points: number; kind: "SCORE" | "REVERSAL"; relatedEventId?: string }

export class PredictionLeague {
  readonly questions = new Map<string, Question>();
  readonly picks: Pick[] = [];
  readonly ledger: ScoreEvent[] = [];
  constructor(private readonly now: () => Date = () => new Date()) {}

  addQuestion(input: Omit<Question, "id">): Question {
    if (input.options.length < 2 || new Set(input.options).size !== input.options.length) throw new Error("INVALID_OPTIONS");
    if (input.lockAt >= input.revealAt || input.points < 1) throw new Error("INVALID_SCHEDULE");
    const question = { ...input, id: randomUUID() };
    this.questions.set(question.id, question);
    return structuredClone(question);
  }

  submit(questionId: string, playerId: string, option: string): Pick {
    const question = this.questions.get(questionId);
    if (!question) throw new Error("NOT_FOUND");
    const submittedAt = this.now();
    if (submittedAt >= question.lockAt) throw new Error("PICKS_LOCKED");
    if (!question.options.includes(option)) throw new Error("INVALID_OPTION");
    const prior = this.picks.filter((pick) => pick.questionId === questionId && pick.playerId === playerId);
    const revision = prior.length + 1;
    const receipt = createHash("sha256").update([questionId, playerId, option, revision, submittedAt.toISOString()].join(":")).digest("hex");
    const pick = { id: randomUUID(), questionId, playerId, option, revision, submittedAt, receipt };
    this.picks.push(pick);
    return structuredClone(pick);
  }

  finalize(questionId: string, correctOption: string): ScoreEvent[] {
    const question = this.questions.get(questionId);
    if (!question) throw new Error("NOT_FOUND");
    if (this.now() < question.lockAt) throw new Error("QUESTION_OPEN");
    if (!question.options.includes(correctOption)) throw new Error("INVALID_OPTION");
    if (this.ledger.some((event) => event.questionId === questionId && event.kind === "SCORE")) throw new Error("ALREADY_SCORED");
    const latest = new Map<string, Pick>();
    this.picks.filter((pick) => pick.questionId === questionId).forEach((pick) => latest.set(pick.playerId, pick));
    const events = [...latest.values()].map((pick): ScoreEvent => ({
      id: randomUUID(), questionId, playerId: pick.playerId,
      points: pick.option === correctOption ? question.points : 0, kind: "SCORE"
    }));
    this.ledger.push(...events);
    return structuredClone(events);
  }

  standings(): Array<{ playerId: string; points: number }> {
    const totals = new Map<string, number>();
    this.ledger.forEach((event) => totals.set(event.playerId, (totals.get(event.playerId) ?? 0) + event.points));
    return [...totals].map(([playerId, points]) => ({ playerId, points })).sort((a, b) => b.points - a.points || a.playerId.localeCompare(b.playerId));
  }
}

