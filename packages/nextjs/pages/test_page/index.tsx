import React from "react";
import DataTable from "./table";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { NavLink } from "~~/components/Header";
import { useTokenData } from "~~/hooks/custom_hooks/useTokenData";

export default function Dashboard() {
  // const address = "0x3B02fF1e626Ed7a8fd6eC5299e2C54e1421B626B";
  const address = "0x0E1F40d1613eab414F932D2d610FE481ECb9cC75";
  const { symbol, githubUrl, totalSupply } = useTokenData(address);

  const rows = [
    { id: 1, contributor: "michi@axlabs.com", contributorName: "mialbu", totalTokens: 4600 },
    { id: 2, contributor: "aleks@axlabs.com", contributorName: "hadzija7", totalTokens: 5000 },
    { id: 3, contributor: "claude@axlabs.com", contributorName: "csmuller", totalTokens: 666 },
  ];

  return (
    // <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0", padding: "30px" }}>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "0.5rem" }}>Token basics</div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "50px" }}>
        <Card style={{ width: "100%", marginRight: "10px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Token Symbol
            </Typography>
            <Typography variant="h5" component="div">
              {symbol}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ width: "100%", marginRight: "10px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Token Supply
            </Typography>
            <Typography variant="h5" component="div">
              {totalSupply}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Github repository
            </Typography>
            <a href={githubUrl} target="_blank">
              <Typography variant="h5" component="div">
                {githubUrl}
              </Typography>
            </a>
          </CardContent>
        </Card>
      </div>
      <div>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "0rem" }}>Distribution per contributer</div>
        <div style={{ fontSize: "13px", fontWeight: "400", marginBottom: "1rem" }}>
          Shows the total amounts of tokens that contributors have been rewarded with so far.
        </div>
        <DataTable rows={rows}></DataTable>
      </div>
      <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "3rem" }}>
        <NavLink href={"test_page/" + address}>
          <Button style={{ width: "150px", fontWeight: "800", border: "4px solid" }} variant="outlined">
            Distribute tokens
          </Button>
        </NavLink>
      </div>
    </div>
    // </div>
  );
}
