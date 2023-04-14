import React from "react";
import DataTable from "./table";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function test_page() {
  return (
    // <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
    <div style={{ display: "flex", flexDirection: "column", width: "100%", margin: "0", padding: "30px" }}>
      <div style={{ marginBottom: "10px" }}>
        <div style={{ fontSize: "1.5em", textAlign: "center" }}>Token distribution</div>
        <p>fjsdlkfjlsdkfjlsdkjldsf</p>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginBottom: "50px" }}>
        <Card style={{ width: "100%", marginRight: "10px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              something
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card style={{ width: "100%" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
              something
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
      <div>
        <DataTable></DataTable>
      </div>
    </div>
    // </div>
  );
}
