import { Cl, cvToValue, fetchCallReadOnlyFunction } from "@stacks/transactions";

// Deployed credit-underwriter escrow stub (Stacks testnet).
export const UNDERWRITER_CONTRACT_ID =
  process.env.NEXT_PUBLIC_UNDERWRITER_CONTRACT ??
  "ST24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NWFPDTV.credit-underwriter";

export const STACKS_NETWORK = (process.env.NEXT_PUBLIC_STACKS_NETWORK ?? "testnet") as
  | "testnet"
  | "mainnet";

export const UNDERWRITER_EXPLORER_URL = `https://explorer.hiro.so/txid/${UNDERWRITER_CONTRACT_ID}?chain=${STACKS_NETWORK}`;

const [contractAddress, contractName] = UNDERWRITER_CONTRACT_ID.split(".");

/**
 * Read-only call to the on-chain contract: required collateral (in the loan
 * amount's units) for a given loan amount + trust score. This is the same
 * `quote-collateral` the Clarity stub enforces, so the UI's loan terms are
 * verified against the live testnet contract.
 */
export async function quoteCollateralOnChain(
  loanAmount: number,
  trustScore: number,
): Promise<number> {
  const res = await fetchCallReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: "quote-collateral",
    functionArgs: [
      Cl.uint(Math.max(0, Math.floor(loanAmount))),
      Cl.uint(Math.max(0, Math.min(100, Math.floor(trustScore)))),
    ],
    senderAddress: contractAddress,
    network: STACKS_NETWORK,
  });
  return Number(cvToValue(res));
}
