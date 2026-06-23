# AlignBTC — `credit-underwriter` contract

Clarity escrow **stub** for the [Autonomous Credit-Risk Underwriter](../AlignBTC-app.docx) Stacks grant. It accepts an off-chain ML **trust score (0–100)** and enforces tiered collateral for an under-collateralised loan request — demonstrating the scoring primitive's on-chain utility (PRD §5.5).

> **MVP scope:** records loan terms and computes required collateral only — **no STX custody / transfers**. Real escrow (locking collateral, repayment, liquidation) is post-grant.

## Collateral tiers

These mirror the off-chain API contract (`collateral_tier.ratio`) so on-chain and frontend stay in sync:

| Trust score | Collateral ratio |
|-------------|------------------|
| `< 40`      | 150%             |
| `40 – 70`   | 120%             |
| `> 70`      | 100%             |

## Interface

```clarity
;; read-only
(get-collateral-ratio (trust-score uint))            ;; -> uint  (150 | 120 | 100)
(quote-collateral (loan-amount uint) (trust-score uint)) ;; -> uint  required collateral, no state change
(get-loan (loan-id uint))                            ;; -> (optional { ...loan })
(get-loan-count)                                     ;; -> uint

;; public
(initiate-loan (loan-amount uint) (trust-score uint))
;; -> (ok { loan-id: uint, collateral-ratio: uint, required-collateral: uint })
;; errors: u100 invalid score (>100), u101 invalid amount (0)
```

## Develop & test

```bash
clarinet check          # type-check the contract
npm install             # one-time, for the test runner
npm test                # vitest unit tests (14 cases: tiers, math, persistence, guards)
clarinet console        # interactive REPL
```

## Deploy to testnet

1. Put a funded testnet mnemonic in `settings/Testnet.toml` (gitignored). Fund the deployer at the [Hiro testnet faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet).
2. Generate and apply the deployment plan:
   ```bash
   clarinet deployments generate --testnet --medium-cost
   clarinet deployments apply -p deployments/default.testnet-plan.yaml
   ```
3. Record the deploy txid / contract id (`SP….credit-underwriter`) — the grant success metric requires a **testnet explorer transaction link**.

Clarity version 4, epoch `latest` (Nakamoto).
