import * as React from "react";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const steps = ["Connect your Github", "Tokenize your repo"];

// const BasicSelect = () => {
//   const [age, setAge] = React.useState("");

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">Github repo</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={age}
//           label="Github url"
//           onChange={handleChange}
//         >
//           <MenuItem value={10}>Ten</MenuItem>
//           <MenuItem value={20}>Twenty</MenuItem>
//           <MenuItem value={30}>Thirty</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// };

export default function HorizontalLinearStepper() {
  const step0 = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <div style={{ textAlign: "center", fontWeight: "800", fontSize: "30px" }}>Connect your Github</div>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            To tokenize your repository, first we need to <br></br>
            check if you are the owner
          </div>
          <div>
            Github credentials <br></br>
            <TextField style={{ width: "100%" }} id="outlined-basic" label="@github-username" variant="outlined" />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "1rem" }}>
            <Button variant="outlined">Authenticate</Button>
          </div>
        </div>
      </div>
    );
  };

  const step1 = () => {
    const handleTokenDeploy = async () => {
      console.log("Token data --------------");
      console.log("githubUrl: ", gitHubUrl);
      await writeAsync();
      // await factory?.spawnSauce(
      //   gitHubUrl,
      //   "csmuller",
      //   tokenName,
      //   tokenSymbol,
      //   0
      // )
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4rem",
          marginBottom: "3rem",
        }}
      >
        <div>
          <div style={{ textAlign: "center", fontWeight: "800", fontSize: "30px" }}>Let&apos;s tokenize your repo</div>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            Now we will configure the basics of the <br></br>
            tokenization of your repository
          </div>
          <div>
            <div style={{ width: "50%" }}>
              <div style={{ fontWeight: "800", fontSize: "20px", marginBottom: "1rem" }}>
                Select one of your repositories
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Github repo"
                  variant="outlined"
                  value={gitHubUrl}
                  onChange={e => setGitHubUrl(e.target.value)}
                />
              </div>
              {/* <BasicSelect></BasicSelect> */}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "20px", marginTop: "3rem", marginBottom: "1rem" }}>
              Token configuration
            </div>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
              <div style={{ marginRight: "1rem", width: "50%" }}>
                <div>Total supply</div>
                <div>
                  <TextField style={{ width: "100%" }} id="outlined-basic" label="Total supply" variant="outlined" />
                </div>
                <div style={{ wordWrap: "break-word" }}>
                  Define the total supply of the token and the number of decimals
                </div>
              </div>
              <div style={{ width: "50%" }}>
                <div>Token symbol</div>
                <div>
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Symbol of the token"
                    variant="outlined"
                    value={tokenSymbol}
                    onChange={e => setTokenSymbol(e.target.value)}
                  />
                </div>
                <div style={{ wordWrap: "break-word" }}>
                  The symbol will have the prefix os (ie: osETH) and can be the maximum of 4 charachters long (ie:
                  osXXXX)
                </div>
              </div>
            </div>
            <div style={{ width: "50%", marginTop: "1rem" }}>
              <div>Token name</div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Name of the token"
                  variant="outlined"
                  value={tokenName}
                  onChange={e => setTokenName(e.target.value)}
                />
              </div>
            </div>
            <div style={{ justifyContent: "center", alignItems: "center", display: "flex", marginTop: "3rem" }}>
              <Button
                onClick={handleTokenDeploy}
                style={{ width: "150px", fontWeight: "800", border: "4px solid" }}
                variant="outlined"
              >
                Tokenize
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSteps = (stepId: number) => {
    if (stepId == 0) {
      return step0();
    } else if (stepId == 1) {
      return step1();
    } else {
      return "";
    }
  };

  const [gitHubUrl, setGitHubUrl] = React.useState("");
  const [username] = React.useState("csmuller");
  const [tokenName, setTokenName] = React.useState("");
  const [tokenSymbol, setTokenSymbol] = React.useState("");
  const [tokenDecimals] = React.useState(0);

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "OpenSauce",
    functionName: "spawnContract",
    args: [gitHubUrl, username, tokenName, tokenSymbol, tokenDecimals],
  });

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", padding: "80px 150px" }}>
      <Stepper activeStep={activeStep} style={{ marginTop: "1rem" }}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          //   if (isStepOptional(index)) {
          //     labelProps.optional = <Typography variant="caption">Optional</Typography>;
          //   }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderSteps(activeStep)}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
