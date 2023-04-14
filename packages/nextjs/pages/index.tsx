import Image from "next/image";
import { Button, Card, CardContent, Typography } from "@mui/material";
import type { NextPage } from "next";
import sauceLogo from "~~/public/sauce_landing.svg";

const Home: NextPage = () => {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
          marginBottom: "3rem",
        }}
      >
        <Image src={sauceLogo} alt="" width="300"></Image>
        <div style={{ textAlign: "center", fontWeight: "800", fontSize: "20px", marginTop: "2rem" }}>
          The place where you can add extra sauce to your repository!
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          With Open Sauce, you can tokenize your repository and reward contributors based on their <br></br>
          involvement in the project.
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Button variant="outlined">Add extra sauce to your project</Button>
        </div>
        <div style={{ textAlign: "center", fontWeight: "800", fontSize: "20px", marginTop: "2rem" }}>How it works?</div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
          }}
        >
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Engage your contributors
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Expand your community
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Future proof your <br></br> repo
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "1rem",
          }}
        >
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Make your project Sustainable
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Increase the quality of your project
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ width: "100%", marginRight: "10px" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Future proof your <br></br> repo
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Lorem ipsum dolor sit amet, <br />
                consectetur aclipiscing elit.
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
