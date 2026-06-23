;; credit-underwriter
;; AlignBTC - Autonomous Credit-Risk Underwriter (Stacks Endowment grant)
;;
;; Escrow STUB. Accepts an off-chain ML trust score (0-100) produced by the
;; FastAPI scoring service and enforces tiered collateral requirements for an
;; under-collateralised loan request. This demonstrates the scoring primitive's
;; on-chain utility without full loan-lifecycle logic.
;;
;; MVP scope (per PRD Sec 5.5 / risk register): records loan terms and computes
;; required collateral only - no STX custody / transfers yet. Real escrow
;; (locking collateral, repayment, liquidation) is explicitly post-grant.
;;
;; The tier thresholds and the loan-quote math mirror the off-chain API contract
;; (collateral_tier.ratio + loan_offer.required_collateral_stx) so the on-chain
;; and frontend representations stay in sync.

;; --- Constants -------------------------------------------------------------

(define-constant CONTRACT-OWNER tx-sender)

;; Trust-score tier boundaries (0-100 scale)
(define-constant SCORE-MID u40)   ;; score >= 40 leaves the low tier
(define-constant SCORE-HIGH u70)  ;; score >  70 reaches the high tier
(define-constant MAX-SCORE u100)

;; Collateral ratios, as a percentage of the requested loan amount
(define-constant RATIO-LOW u150)   ;; score < 40    -> 150%
(define-constant RATIO-MID u120)   ;; 40 <= s <= 70 -> 120%
(define-constant RATIO-HIGH u100)  ;; score > 70    -> 100%

;; Errors
(define-constant ERR-INVALID-SCORE (err u100))
(define-constant ERR-INVALID-AMOUNT (err u101))
(define-constant ERR-LOAN-NOT-FOUND (err u102))

;; --- Storage ---------------------------------------------------------------

(define-data-var loan-nonce uint u0)

(define-map loans
  uint ;; loan-id
  {
    borrower: principal,
    loan-amount: uint,
    trust-score: uint,
    collateral-ratio: uint,
    required-collateral: uint,
    created-at: uint,
  }
)

;; --- Read-only -------------------------------------------------------------

;; Pure tier lookup: trust score -> collateral ratio (percent).
;; Mirrors the API contract's collateral_tier.ratio (1.5 / 1.2 / 1.0).
(define-read-only (get-collateral-ratio (trust-score uint))
  (if (> trust-score SCORE-HIGH)
    RATIO-HIGH
    (if (>= trust-score SCORE-MID)
      RATIO-MID
      RATIO-LOW
    )
  )
)

;; Quote the required collateral for an amount + score, no state change.
;; Mirrors loan_offer.required_collateral_stx.
(define-read-only (quote-collateral
    (loan-amount uint)
    (trust-score uint)
  )
  (/ (* loan-amount (get-collateral-ratio trust-score)) u100)
)

(define-read-only (get-loan (loan-id uint))
  (map-get? loans loan-id)
)

(define-read-only (get-loan-count)
  (var-get loan-nonce)
)

;; --- Public ----------------------------------------------------------------

;; Record an under-collateralised loan request priced by the supplied trust
;; score. Returns the assigned loan id, the collateral ratio applied, and the
;; required collateral. No funds move in the MVP stub.
(define-public (initiate-loan
    (loan-amount uint)
    (trust-score uint)
  )
  (begin
    (asserts! (<= trust-score MAX-SCORE) ERR-INVALID-SCORE)
    (asserts! (> loan-amount u0) ERR-INVALID-AMOUNT)
    (let (
        (loan-id (var-get loan-nonce))
        (ratio (get-collateral-ratio trust-score))
        (required (/ (* loan-amount (get-collateral-ratio trust-score)) u100))
      )
      (map-set loans loan-id {
        borrower: tx-sender,
        loan-amount: loan-amount,
        trust-score: trust-score,
        collateral-ratio: ratio,
        required-collateral: required,
        created-at: stacks-block-height,
      })
      (var-set loan-nonce (+ loan-id u1))
      (print {
        event: "loan-initiated",
        loan-id: loan-id,
        borrower: tx-sender,
        trust-score: trust-score,
        collateral-ratio: ratio,
        required-collateral: required,
      })
      (ok {
        loan-id: loan-id,
        collateral-ratio: ratio,
        required-collateral: required,
      })
    )
  )
)
