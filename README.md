# AlignBTC — Autonomous Credit-Risk Underwriter for Bitcoin DeFi

> AI-powered on-chain credit scoring to unlock capital efficiency on Stacks lending protocols.

AlignBTC is an AI-native financial primitive for the **Stacks** Bitcoin Layer 2 ecosystem. It parses a borrower's historical on-chain wallet behaviour — transaction frequency, Stacking participation, and stablecoin usage — to generate an autonomous **trust score (0–100)**. That score is surfaced through a Next.js frontend and connected to a Clarity escrow contract on testnet, demonstrating a credible path to **under-collateralised micro-lending on Bitcoin**.

Built for the **Stacks Endowment — Getting Started Program** grant. See [`AlignBTC-app.docx`](./AlignBTC-app.docx) for the full PRD.

---

## Why

Stacks lending today is fully collateralised — borrowers must lock more than they borrow because **no on-chain credit profiling exists**. This locks capital, excludes creditworthy users, and makes micro-lending unviable. The data is public on every Stacks address; nothing aggregates it into a lending-relevant credit signal. AlignBTC fills that gap.

## How it works

Three independently testable layers turn wallet history into a loan offer:

```
 Next.js frontend ──GET /score?address──▶  FastAPI scoring service
 (Stacks.js wallet)                          │ loads
        │ read-only call                     ▼
        ▼                              Random Forest model
 Clarity escrow stub  ◀──initiate-loan(score)──  (scikit-learn)
 (Stacks testnet)        tiered collateral         │ trained on
                                            labelled wallet dataset
                                            (Stacks Extended API)
```

1. **Data pipeline (Python)** — aggregates wallet metrics from the Stacks Extended API into a feature vector per address.
2. **ML scoring engine (scikit-learn)** — a Random Forest classifier outputs a 0–100 trust score.
3. **Presentation (Next.js + Clarity)** — this repo: the frontend renders the score, a feature breakdown, and a simulated loan offer priced by an on-chain escrow stub.

## The trust score

Each wallet is encoded across seven features, each contributing a weighted share of the score:

| Feature | Signal |
| --- | --- |
| `tx_count_90d` | Activity frequency in the last 90 days |
| `avg_tx_value_stx` | Mean STX moved per transaction |
| `stacking_cycles` | Completed Stacking cycles (long-term trust) |
| `stacking_streak` | Consecutive cycles without interruption |
| `usdcx_interactions` | Stablecoin send/receive events |
| `wallet_age_days` | Days since first on-chain activity |
| `defi_protocol_count` | Distinct DeFi contracts used |

## Collateral tiers

A higher score unlocks a lower collateral requirement — enforced on-chain by the contract:

| Trust score | Collateral ratio | Tier |
| --- | --- | --- |
| Below 40 | 150% | Subprime |
| 40 – 70 | 120% | Standard |
| Above 70 | 100% | Prime |

## Smart contract

A Clarity escrow **stub** is deployed on Stacks testnet. Its `initiate-loan` function accepts a trust score and enforces the tiered collateral; `quote-collateral` prices a loan without writing state. No funds move — full escrow logic is post-grant.

- **Contract:** `ST24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NWFPDTV.credit-underwriter`
- **Explorer:** https://explorer.hiro.so/txid/ST24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NWFPDTV.credit-underwriter?chain=testnet

---

## Repository layout

```
AlignBTC-app/
├─ alignbtc-client/   # Next.js 16 + Tailwind v4 frontend (the dApp)
├─ contracts/         # Clarinet project — the Clarity escrow stub + tests
└─ AlignBTC-app.docx  # Product Requirements Document (grant PRD)
```

## Tech stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4 ("Kinetic Dark" design system), Stacks.js (`@stacks/connect`, `@stacks/transactions`)
- **Smart contract:** Clarity, Clarinet, Stacks testnet
- **Scoring service (planned):** Python 3.11, pandas, scikit-learn, FastAPI
- **Deployment:** Vercel (web), Railway/Render (API)

---

## Getting started

### Frontend (`alignbtc-client/`)

```bash
cd alignbtc-client
npm install
cp .env.example .env.local   # optional — defaults to the deployed testnet contract + mock scoring
npm run dev                  # http://localhost:3000
```

Environment variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_UNDERWRITER_CONTRACT` | Deployed Clarity contract id |
| `NEXT_PUBLIC_STACKS_NETWORK` | `testnet` or `mainnet` |
| `NEXT_PUBLIC_SCORING_API_URL` | FastAPI scoring service URL — blank uses the in-app mock |

Useful scripts: `npm run build`, `npm run lint`.

### Smart contract (`contracts/`)

```bash
cd contracts
clarinet check     # type-check the contract
npm install        # one-time, for the test runner
npm test           # vitest unit tests (tiers, collateral math, persistence, guards)
```

Deploy to testnet: add a funded testnet mnemonic to `settings/Testnet.toml` (gitignored), then
`clarinet deployments generate --testnet --low-cost` and `clarinet deployments apply -p deployments/default.testnet-plan.yaml`.

---

## Roadmap

| Milestone | Deliverable |
| --- | --- |
| **M1** (wk 1–4) | Data pipeline + labelled dataset (≥ 500 records) |
| **M2** (wk 5–8) | Trained Random Forest (AUC-ROC ≥ 0.72) + FastAPI scoring service |
| **M3** (wk 9–12) | Frontend with wallet + score + loan offer · Clarity stub on testnet · demo |

## Status

- ✅ Clarity escrow stub written, tested, **deployed to Stacks testnet**
- ✅ Frontend: wallet connect → trust score → simulated loan offer, reading the live contract
- ⬜ Python data pipeline (M1) and FastAPI scoring service (M2) — the frontend's `getScore()` already targets the API contract and falls back to a mock

## License

[MIT](./LICENSE) © Henry Agukwe
