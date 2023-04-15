import React from "react";
import DataTable from "./table";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useTokenData } from "~~/hooks/custom_hooks/useTokenData";

export default function Dashboard() {
  const address = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5";
  const { symbol } = useTokenData(address);

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
              Symbol
            </Typography>
            <Typography variant="h5" component="div">
              {symbol}
            </Typography>
          </CardContent>
        </Card>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Token Supply
            </Typography>
            <Typography variant="h5" component="div">
              2,000,000
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "1rem" }}>Distribution per contributer</div>
        <DataTable></DataTable>
      </div>
    </div>
    // </div>
  );
}
