# @barfinex/detector-plugin-trade-journal

**Trade journal plugin** for the [Barfinex](https://barfinex.com) Detector — record and query trades (manual or detector-driven) with metadata, filters, and a persistent store.

Keep a structured log of executions for analysis, compliance, or strategy tuning. The plugin implements detector lifecycle hooks and exposes a CRUD API so Studio or other services can create and query journal entries.

---

## What it does

- **Trade CRUD** — create, find (with filters), get one, update, remove journal entries via service or controller.
- **Detector plugin** — implements `PluginHook.onInit` / `onStart` and integrates with `@barfinex/plugin-driver`; registers with Provider for Studio plugin API.
- **Metadata** — strategy name, symbol, timeframe, side, prices, risk/reward, tags, and timestamps stored in `TradeJournalEntity`.
- **Filtering** — query by symbol, strategy, date range, and other fields for reports and dashboards.

---

## Installation

```sh
npm install @barfinex/detector-plugin-trade-journal
```

or

```sh
yarn add @barfinex/detector-plugin-trade-journal
```

---

## What's included

| Export | Purpose |
|--------|--------|
| `TradeJournalModule` | NestJS module (includes entity and service). |
| `TradeJournalService` | CRUD and plugin hooks; extends `DetectorPluginService`. |
| `TradeJournalEntity` | TypeORM entity for persistent trade records. |

---

## Documentation

- **Detector (host for this plugin)** — [Installation detector](https://barfinex.com/docs/installation-detector) — config and plugin list (e.g. `trade-journal`).
- **Barfinex overview** — [First Steps](https://barfinex.com/docs/first-steps), [Architecture](https://barfinex.com/docs/architecture), [Glossary](https://barfinex.com/docs/glossary).
- **APIs** — [Detector API reference](https://barfinex.com/docs/detector-api), [Provider API reference](https://barfinex.com/docs/provider-api), [Building with the API](https://barfinex.com/docs/frontend-api).
- **Troubleshooting** — [Typical problems and solutions](https://barfinex.com/docs/troubleshooting).

---

## Contributing

Ideas for metrics and export features welcome. Open an issue or PR. Community: [Telegram](https://t.me/barfinex) · [GitHub](https://github.com/barfinex).

---

## License

Licensed under the [Apache License 2.0](LICENSE) with additional terms. Attribution to **Barfin Network Limited** and a link to [https://barfinex.com](https://barfinex.com) are required. Commercial use requires explicit permission. See [LICENSE](LICENSE) and the [Barfinex site](https://barfinex.com) for details.
