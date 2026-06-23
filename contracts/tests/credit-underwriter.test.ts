import { Cl } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const wallet1 = accounts.get("wallet_1")!;

const CONTRACT = "credit-underwriter";

/** Current loan nonce as a JS number (robust to simnet state across tests). */
function loanCount(): number {
  const { result } = simnet.callReadOnlyFn(CONTRACT, "get-loan-count", [], wallet1);
  return Number((result as { value: bigint }).value);
}

describe("get-collateral-ratio — tier boundaries", () => {
  const cases: [number, number][] = [
    [0, 150],
    [39, 150],
    [40, 120], // lower edge of mid tier (inclusive)
    [55, 120],
    [70, 120], // upper edge of mid tier (inclusive)
    [71, 100], // first high-tier score
    [100, 100],
  ];

  it.each(cases)("score %i -> %i%% collateral", (score, ratio) => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-collateral-ratio",
      [Cl.uint(score)],
      wallet1,
    );
    expect(result).toBeUint(ratio);
  });
});

describe("quote-collateral — required collateral math", () => {
  it("low tier: 1000 @ score 30 -> 1500 (150%)", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "quote-collateral",
      [Cl.uint(1000), Cl.uint(30)],
      wallet1,
    );
    expect(result).toBeUint(1500);
  });

  it("high tier: 1000 @ score 90 -> 1000 (100%)", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "quote-collateral",
      [Cl.uint(1000), Cl.uint(90)],
      wallet1,
    );
    expect(result).toBeUint(1000);
  });
});

describe("initiate-loan", () => {
  it("records a loan and returns tiered terms (high tier, 100%)", () => {
    const id = loanCount();
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "initiate-loan",
      [Cl.uint(1000), Cl.uint(85)],
      wallet1,
    );
    expect(result).toBeOk(
      Cl.tuple({
        "loan-id": Cl.uint(id),
        "collateral-ratio": Cl.uint(100),
        "required-collateral": Cl.uint(1000),
      }),
    );
  });

  it("increments the loan nonce per request", () => {
    const before = loanCount();
    simnet.callPublicFn(CONTRACT, "initiate-loan", [Cl.uint(500), Cl.uint(50)], wallet1);
    simnet.callPublicFn(CONTRACT, "initiate-loan", [Cl.uint(500), Cl.uint(50)], wallet1);
    expect(loanCount()).toBe(before + 2);
  });

  it("persists the loan record with mid-tier (120%) collateral", () => {
    const id = loanCount();
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "initiate-loan",
      [Cl.uint(2000), Cl.uint(55)],
      wallet1,
    );
    expect(result).toBeOk(
      Cl.tuple({
        "loan-id": Cl.uint(id),
        "collateral-ratio": Cl.uint(120),
        "required-collateral": Cl.uint(2400),
      }),
    );
    // the record is retrievable
    const stored = simnet.callReadOnlyFn(CONTRACT, "get-loan", [Cl.uint(id)], wallet1);
    expect(stored.result).not.toBeNone();
  });

  it("rejects a score above 100", () => {
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "initiate-loan",
      [Cl.uint(1000), Cl.uint(101)],
      wallet1,
    );
    expect(result).toBeErr(Cl.uint(100));
  });

  it("rejects a zero loan amount", () => {
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "initiate-loan",
      [Cl.uint(0), Cl.uint(80)],
      wallet1,
    );
    expect(result).toBeErr(Cl.uint(101));
  });
});
