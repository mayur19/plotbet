# Implementation ticket index

Full issue descriptions include acceptance criteria, dependencies and verification notes.

- [ ] PB-101 | Foundation | backend,security | Add username accounts and revocable sessions | Protect league membership and state changes.
- [ ] PB-102 | Foundation | backend,database | Implement transactional league repositories | Persist seasons, picks, outcomes and immutable score events.
- [ ] PB-103 | Foundation | testing | Build injectable clock and boundary harness | Make lock and reveal behavior deterministic in every layer.
- [ ] PB-104 | Leagues | backend,frontend | Implement league creation and visibility | Support public, unlisted and private membership rules.
- [ ] PB-105 | Leagues | backend,security | Implement hashed invitation links | Enforce expiration, use limits and revocation.
- [ ] PB-106 | Leagues | backend,database | Add seasons, rounds and late-join policy | Preserve historical membership and questions-played context.
- [ ] PB-107 | Questions | backend,frontend | Build single-choice authoring | Validate options, points, lock, reveal and spoiler labels.
- [ ] PB-108 | Questions | backend | Add multi-choice, number-range and ordered-list grading | Version every rule and preview exact scoring.
- [ ] PB-109 | Questions | backend,database | Implement publication freeze and amendments | Preserve grading structure and display typo corrections.
- [ ] PB-110 | Picks | backend,security | Persist sealed pick revisions and receipts | Return only the requesting player's receipt before reveal.
- [ ] PB-111 | Picks | backend,testing | Enforce lock with server time on every write | Reject boundary and forged late submissions.
- [ ] PB-112 | Picks | backend | Implement confidence token allocation | Reserve transactionally and prevent duplicate round use.
- [ ] PB-113 | Resolution | backend,frontend | Build provisional outcome workflow | Capture evidence and disclose moderator participation conflicts.
- [ ] PB-114 | Resolution | backend,security | Add second-moderator approval rules | Require eligible approval where configured.
- [ ] PB-115 | Scoring | backend,testing | Implement versioned scoring functions | Cover every question type, confidence and fixed penalties.
- [ ] PB-116 | Scoring | backend,database | Finalize score ledger transactionally | Create one immutable event set per outcome.
- [ ] PB-117 | Spoilers | backend,security | Build unrevealed response allowlists | Omit results, distributions, score deltas and unsafe notification text.
- [ ] PB-118 | Spoilers | backend,frontend | Add personal watched-through progress | Mask later rounds across league pages and archives.
- [ ] PB-119 | Results | frontend | Build reveal page and score explanations | Show correct answer, distribution and per-pick calculation.
- [ ] PB-120 | Standings | backend,frontend | Build ledger-derived round and season standings | Apply and display deterministic tie rules.
- [ ] PB-121 | Disputes | backend,database | Implement outcome dispute window | Enforce eligibility, timing and decision separation.
- [ ] PB-122 | Disputes | backend,testing | Implement corrections by reversal and replacement | Reconcile standings without rewriting prior events.
- [ ] PB-123 | Experience | backend | Add non-advantage achievements | Award idempotently after eligible reveals.
- [ ] PB-124 | Experience | frontend | Add sealed reasoning and post-reveal reactions | Prevent pre-reveal text leakage.
- [ ] PB-125 | Experience | backend,frontend | Build safe public archives and result cards | Omit unrevealed or private league content.
- [ ] PB-126 | Operations | backend | Add audit history and in-app notifications | Record every lock, resolution and correction safely.
- [ ] PB-127 | Portability | backend,testing | Export season data and reconcile ledger | Produce versioned JSON and CSV with exact totals.
- [ ] PB-128 | Quality | testing | Automate clock, seal, spoiler and correction journeys | Cover the full acceptance matrix with deterministic reset.
- [ ] PB-129 | Quality | security | Complete fairness and authorization review | Test enumeration, moderator access and replay resistance.
- [ ] PB-130 | Release | accessibility,devops | Finish accessibility and deployment readiness | Provide responsive UI, runbook, backup restore and monitoring.

