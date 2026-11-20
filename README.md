# PlotBet

PlotBet is an open-source, spoiler-safe prediction league for shows, awards, sports and cultural events.

PlotBet uses entertainment points only. It does not support money, purchases, deposits, withdrawals, odds or prizes of monetary value.

## Implemented foundation

- server-time question locks;
- sealed pick revisions with receipts;
- latest-valid-pick selection;
- versioned, append-only score events;
- deterministic standings;
- initial schema, HTTP validation and tests.

## Run locally

```sh
npm install
npm test
npm run dev
```

Open http://localhost:3105. See [the roadmap](docs/ROADMAP.md).

## License

MIT

