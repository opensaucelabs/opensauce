import { useEffect } from "react";
import { useRouter } from "next/router";
import DataTable from "./table";
import LaunchIcon from "@mui/icons-material/Launch";
import { Button, TextField } from "@mui/material";
import { useTokenData } from "~~/hooks/custom_hooks/useTokenData";

// import { useDistributeTokens } from "~~/hooks/custom_hooks/useTokenDistribution";

export default function DistributeTokens() {
  const router = useRouter();
  const { url } = router.query;
  const defaultTokenAddress = "0x0E1F40d1613eab414F932D2d610FE481ECb9cC75";
  const tokenAddress = url?.toString() || defaultTokenAddress.toString();
  const rows = [
    { id: 1, contributor: "claude@axlabs.com", contributorName: "csmuller", totalTokens: 1000 },
    { id: 2, contributor: "michi@axlabs.com", contributorName: "mialbu", totalTokens: 800 },
    { id: 3, contributor: "gsmachado@axlabs.com", contributorName: "gsmachado", totalTokens: 800 },
    { id: 4, contributor: "aleks@axlabs.com", contributorName: "hadzija7", totalTokens: 1200 },
  ];

  useEffect(() => {
    console.log("Query params: ", url);
    console.log("something");
  });
  const { githubUrl } = useTokenData(tokenAddress);

  const handleDistribution = async () => {
    console.log("Distribution tokens...");
    // useDistributeTokens(tokenAddress, rows.map((row) => row.contributorName), rows.map((row) => row.totalTokens));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0", padding: "30px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "1rem" }}>Suggested Reward Distribution</div>
        <div>
          Github Repo
          <a href={githubUrl} target="_blank">
            <LaunchIcon />
          </a>
        </div>
      </div>
      <DataTable rows={rows}></DataTable>

      <div style={{ marginTop: "10px" }}>
        Enter the amount of tokens to distribute <br />
        <TextField style={{ width: "33%" }} id="outlined-basic" label="Amount of tokens" variant="outlined" />
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
        <Button
          onClick={handleDistribution}
          style={{ width: "150px", fontWeight: "800", border: "4px solid" }}
          variant="outlined"
        >
          Finish distribution
        </Button>
      </div>
    </div>
  );
}
