import { useEffect } from "react";
import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import OpenSauceTokenAbi from "~~/public/abis/openSauceToken.json";

export const useDistributeTokens = (address: string, usernames: string[], amounts: number[]) => {
  const provider = getProvider();
  useEffect(() => {
    const token = new ethers.Contract(address, OpenSauceTokenAbi, provider);
    const distributeTokens = async () => {
      token.distribute(usernames, amounts);
    };
    distributeTokens();
  }, [provider, address, usernames, amounts]);
};
