import { useEffect, useState } from "react";
import { getProvider } from "@wagmi/core";
import { ethers } from "ethers";
import OpenSauceTokenAbi from "~~/public/abis/openSauceToken.json";

export const useTokenData = (address: string) => {
  const provider = getProvider();
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  useEffect(() => {
    const token = new ethers.Contract(address, OpenSauceTokenAbi, provider);
    token.symbol().then();

    const fetchData = async () => {
      const symbol = await token.symbol();
      const name = await token.name();
      const githubUrl = await token.githubUrl();
      const totalSupply = (await token.totalSupply()).toString();

      setSymbol(symbol);
      setName(name);
      setGithubUrl(githubUrl);
      setTotalSupply(totalSupply);
    };

    fetchData();
  }, [provider]);

  return { symbol, name, githubUrl, totalSupply };
};
