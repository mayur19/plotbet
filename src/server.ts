import { createApp } from "./app.js";
const port = Number(process.env.PORT ?? 3105);
createApp().listen(port, () => process.stdout.write(`PlotBet listening on http://localhost:${port}\n`));

