import { useEffect, useState } from "react";
import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import OpenSauceTokenAbi from "~~/public/abis/openSauceToken.json";

export const useTokenData = (address: string) => {
  const provider = getProvider();
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const token = new ethers.Contract(address, OpenSauceTokenAbi, provider);
    token.symbol().then();

    const fetchData = async () => {
      const symbol = await token.symbol();
      const name = await token.name();

      setSymbol(symbol);
      setName(name);
    };

    fetchData();
  }, [provider]);

  return { symbol, name };
};
