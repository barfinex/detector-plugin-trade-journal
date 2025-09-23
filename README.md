# @barfinex/detector-plugin-trade-journal

**`@barfinex/detector-plugin-trade-journal`** is a plugin within the [Barfinex](https://barfinex.com) ecosystem focused on **trade journaling, performance analytics, and historical tracking of executed strategies**. It provides a structured way to record trades, evaluate strategy outcomes, and generate insights for both discretionary and algorithmic trading.

---

## 🚀 Purpose

The `@barfinex/detector-plugin-trade-journal` package is designed to:

- 📊 Maintain a **journal of all executed trades** (detector‑driven or manual).  
- 📝 Store **metadata** such as strategy name, symbol, timeframe, risk/reward ratio, and tags.  
- 📈 Provide **performance metrics** (win rate, average R-multiple, profit factor, etc.).  
- 🔄 Integrate with detectors, advisors, and connectors for **automatic population of trade logs**.  
- 📂 Export and share logs for compliance, auditing, or research purposes.  

By centralizing trade tracking, this plugin helps traders and quants analyze outcomes, detect behavioral patterns, and refine strategies.

---

## 📦 Installation

To install the package, use npm or yarn:

```sh
npm install @barfinex/detector-plugin-trade-journal
```

or

```sh
yarn add @barfinex/detector-plugin-trade-journal
```

---

## 📘 Example Usage

```ts
import { TradeJournalService } from '@barfinex/detector-plugin-trade-journal';

// Initialize journal service
const journal = new TradeJournalService();

// Record a trade
journal.recordTrade({
  id: 'trade-001',
  symbol: 'BTCUSDT',
  strategy: 'volume-follow',
  side: 'buy',
  entryPrice: 25000,
  exitPrice: 26000,
  risk: 100,
  reward: 1000,
  tags: ['trend-following', 'BTC'],
  timestamp: Date.now(),
});

// Retrieve performance report
const report = journal.getPerformanceReport();
console.log(report);
```

---

## 📚 What's Included

The `@barfinex/detector-plugin-trade-journal` provides:

- **Trade Logging Service** — records trades, metadata, and results.  
- **Metrics Engine** — calculates profitability, win/loss ratios, expectancy, and more.  
- **Integration Hooks** — works seamlessly with detectors and advisors to auto-log trades.  
- **Export Utilities** — prepare trade logs for reporting or visualization.  
- **Extensibility** — can be adapted for multi-asset, multi-strategy portfolios.  

---

## 🤝 Contributing

We welcome contributions to help improve the **Barfinex open trading stack**:

- 🛠 Open an issue or submit a PR.  
- 💡 Suggest new metrics or analytics features.  
- 💬 Share research use cases or insights.  

Join the conversation in our Telegram community: [t.me/barfinex](https://t.me/barfinex)

---

## 📜 License

This repository is licensed under the [Apache License 2.0](LICENSE) with additional restrictions.

### Key Terms:
1. **Attribution**: Proper credit must be given to the original author, Barfin Network Limited, with a link to the official website: [https://barfin.network/](https://barfin.network/).  
2. **Non-Commercial Use**: The use of this codebase for commercial purposes is prohibited without explicit written permission.  
3. **Display Requirements**: For non-commercial use, the following must be displayed:  
   - The name "Barfin Network Limited".  
   - The official logo.  
   - A working link to [https://barfinex.com/](https://barfinex.com/).  

For further details or to request commercial use permissions, contact **Barfin Network Limited** through the official website.  
