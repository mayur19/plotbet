# PlotBet

**Spoiler-safe prediction leagues with transparent points.** Lock theories before the reveal,
compare outcomes with friends and climb standings whose calculations can be reconstructed.

PlotBet is an open-source game for shows, awards, sports and cultural events. Hosts publish
questions with server-enforced lock and reveal times, players submit revisioned picks, and final
outcomes create append-only score events.

> **Project status: early foundation.** Server-time locks, pick receipts, latest-valid-pick
> selection, deterministic scoring and ledger-derived standings are implemented and tested. The
> remaining work is tracked in the [ticket index](docs/TICKETS.md): approximately 10% of the
> planned product is complete.

PlotBet uses entertainment points only. It does not support money, purchases, deposits,
withdrawals, odds or prizes of monetary value.

## Project status

| Area | Status | Tickets |
| --- | --- | --- |
| Repository standards, MIT license and continuous checks | Implemented | Foundation |
| Server-time question locks | Implemented | Foundation |
| Revisioned picks with deterministic receipts | Implemented | Foundation |
| Latest-valid-pick selection and one-time finalization | Implemented | Foundation |
| Append-only score events and standings | Implemented | Foundation |
| Accounts, repositories and injectable clock harness | Pending | PB-101 – PB-103 |
| Leagues, invitations, seasons and rounds | Pending | PB-104 – PB-106 |
| Question formats and published grading rules | Pending | PB-107 – PB-109 |
| Sealed picks, confidence and resolution | Pending | PB-110 – PB-116 |
| Spoilers, results, standings and disputes | Pending | PB-117 – PB-122 |
| Achievements, archives and export | Pending | PB-123 – PB-127 |
| Complete verification and release readiness | Pending | PB-128 – PB-130 |

## Quick start

Requirements: Node.js 22 or later and npm.

    npm install
    npm run dev

Open:

- Web: <http://localhost:3105>
- Health endpoint: <http://localhost:3105/api/health>

The implemented endpoints support question creation and pick submission for local boundary
verification. The test suite uses an injected clock for exact lock-time behavior.

## Demo access (development only)

No account system or credentials exist yet. Development requests provide a synthetic player
identifier in the pick payload. League membership, invitations and authenticated ownership are
tracked by PB-101 through PB-106.

## Commands

| Command | What it does |
| --- | --- |
| npm run dev | Start the local server with file watching |
| npm test | Run time-boundary, scoring and request tests |
| npm run typecheck | Check strict TypeScript |
| npm run build | Compile the production server into dist |
| npm start | Run the compiled server |

## Tech stack

| Layer | Choice |
| --- | --- |
| Language | TypeScript in strict mode on Node.js 22+ |
| API | Express 5 with zod request validation |
| Data model | PostgreSQL forward migration with append-only score events |
| Domain | Server-time locks, revisioned picks and deterministic scoring |
| Web | Accessible static foundation page served by Express |
| Tests | Vitest and Supertest with an injectable clock |
| Checks | GitHub Actions for type checks, tests and sensitive-data scanning |

## Repository layout

    plotbet/
    ├── src/
    │   ├── app.ts             question and pick HTTP boundary
    │   ├── domain.ts          locking, receipts, scoring and standings
    │   └── server.ts          process entry point
    ├── test/                  boundary-time, scoring and request tests
    ├── migrations/            league, question, pick and score-event schema
    ├── public/                initial league landing page
    ├── docs/
    │   ├── ARCHITECTURE.md    fairness and spoiler boundaries
    │   ├── ROADMAP.md         milestone sequence
    │   └── TICKETS.md         complete implementation index
    └── .github/               checks and issue template

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Delivery roadmap](docs/ROADMAP.md)
- [Implementation ticket index](docs/TICKETS.md)
- [Product requirements](https://github.com/mayur19/plotbet/issues/1)
- [Public issue tracker](https://github.com/mayur19/plotbet/issues)

## Known limitations

- Questions, picks and score events are held in process memory and clear on restart.
- Accounts, leagues, moderator approval and dispute correction are pending.
- Public response shapes do not yet implement the complete spoiler policy.
- Only the single-choice scoring foundation is connected.
- No real-value functionality will be added.

## Contributing, security and license

- [Contributing guide](CONTRIBUTING.md): workflow and verification expectations.
- [Security policy](SECURITY.md): private vulnerability reporting.
- [Community conduct](CODE_OF_CONDUCT.md).
- Licensed under the [MIT License](LICENSE).

