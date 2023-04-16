import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenData } from "~~/hooks/custom_hooks/useTokenData";
import LaunchIcon from '@mui/icons-material/Launch';
import DataTable from "./table";

export default function DistributeTokens() {
  const router = useRouter();
  const { url } = router.query;
  const default_address = "0x0E1F40d1613eab414F932D2d610FE481ECb9cC75"

  useEffect(()=> {
    console.log("Query params: ", url)
  }, )
  const { githubUrl } = useTokenData(url?.toString() || default_address.toString());


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0", padding: "30px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <div style={{ fontSize: "20px", fontWeight: "800", marginBottom: "1rem" }}>Distribution preview</div>
        <div>
          Github Repo
          <a href={githubUrl} target="_blank">
            <LaunchIcon/>
          </a>
        </div>
      </div>
      <DataTable></DataTable>

      <div style={{marginTop: "10px"}}>
        Enter the amount of tokens to distribute <br/>
        <TextField style={{ width: "33%" }} id="outlined-basic" label="Amount of tokens" variant="outlined" />
      </div>

      <div style={{display: "flex", justifyContent: "center", marginTop: "5rem"}}>
        <Button style={{ width: "150px", fontWeight: "800", border: "4px solid" }} variant="outlined">
          Finish distribution
        </Button>
      </div>
    </div>
  ) 
  
}
