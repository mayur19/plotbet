# Architecture

Fairness depends on server time, sealed response shapes and an append-only score ledger.

- Pick writes compare against server time on every request.
- Revisions are preserved; only the latest valid pre-lock pick scores.
- Before reveal, responses never contain other players' answers or distributions.
- Finalization creates score events once in a transaction.
- Corrections add reversals and replacements instead of editing history.

The first slice proves locking and scoring. Authenticated leagues, PostgreSQL repositories, spoiler policies and correction workflows follow next.

