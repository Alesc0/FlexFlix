import { useTheme } from "@emotion/react";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Fade,
  IconButton,
  Slide,
  Step,
  StepButton,
  StepLabel,
  Stepper,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useInterval from "./useInterval";

const MyCollection = [
  {
    label: "First Picture",
    imgPath:
      "https://img.uhdpaper.com/wallpaper/the-batman-2022-movie-poster-106@0@f-preview.jpg",
  },
  {
    label: "Second Picture",
    imgPath:
      "https://img.uhdpaper.com/wallpaper/spiderman-no-way-home-movie-poster-571@1@e-preview.jpg",
  },
  {
    label: "Third Picture",
    imgPath:
      "https://img.uhdpaper.com/wallpaper/uncharted-tom-holland-movie-poster-59@0@f-preview.jpg",
  },
];

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.action.main} 0%, ${theme.palette.background.default} 100%)`,
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <Typography variant="subtitle1">{String(props.icon)}</Typography>
    </ColorlibStepIconRoot>
  );
}

const transitionTime = 600;
const delay = 5000;
export default function ImgSlider() {
  const [index, setStep] = useState([true, false, false]);
  const [isTransition, setTransition] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const theme = useTheme();

  useInterval(
    () => {
      if (activeStep() === index.length - 1) {
        handleStep(0);
      } else {
        nextStep();
      }
    },
    isRunning || isTransition ? delay : null
  );

  const activeStep = () => {
    return index.indexOf(true);
  };

  const nextStep = () => {
    let step = activeStep();
    step += 1;
    if (step === index.length) step = 0;
    handleStep(step);
  };
  const prevStep = () => {
    let step = activeStep();
    step -= 1;
    if (step === -1) step = index.length - 1;
    handleStep(step);
  };

  const handleStep = (step) => {
    if (isTransition) return;
    setStep([]);
    setTransition(true);
    setTimeout(() => {
      let array = [false, false, false];
      array[step] = true;
      setStep(array);
      setTransition(false);
    }, transitionTime);
  };

  return (
    <>
      {MyCollection.map((row, i) => (
        <Fade
          key={row.label}
          in={index[i]}
          timeout={transitionTime}
          mountOnEnter
          unmountOnExit
        >
          <img
            style={{
              flexShrink: 0,
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
            }}
            src={row.imgPath}
            alt={"img" + i}
          />
        </Fade>
      ))}
      <Box
        position="absolute"
        style={{
          flexShrink: 0,
          minWidth: "100%",
          minHeight: "100%",
        }}
        sx={{
          background: `linear-gradient(to bottom, transparent 50%, 
          ${alpha(theme.palette.background.default, 1)}) `,
        }}
      />
      <Box
        position="absolute"
        style={{
          flexShrink: 0,
          minWidth: "100%",
          minHeight: "100%",
        }}
        sx={{
          background: `${alpha(theme.palette.background.default, 0.6)}`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            maxWidth: "400px",
            m: "0 auto",
          }}
        >
          <Typography variant="h4" fontWeight="bolder">
            Welcome to{" "}
            <span style={{ color: theme.palette.primary.dark }}>FlexFlix</span>
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Your favourite movie website of all time!
          </Typography>
          <Box
            display="flex"
            sx={{
              width: "100%",
              mt: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="warning"
              component={Link}
              to="/list"
              sx={{ fontSize: 15, p: 1 }}
            >
              Movie Management
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            cursor: "pointer",
            borderBlock: `solid thin grey`,
            mt: 17,
          }}
          onMouseEnter={() => setRunning(false)}
          onMouseLeave={() => setRunning(true)}
        >
          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              left: "10%",
            }}
          >
            <Stepper nonLinear activeStep={activeStep()}>
              {MyCollection.map((row, index) => {
                return (
                  <Step key={row.label}>
                    <StepButton
                      color="grey"
                      disabled={isTransition}
                      onClick={() => handleStep(index)}
                    >
                      <StepLabel StepIconComponent={ColorlibStepIcon} />
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <Box
            sx={{
              width: "fit-content",
              position: "relative",
              ml: "auto",
              right: "15%",
            }}
          >
            <IconButton disabled={isTransition} onClick={prevStep}>
              <ArrowBackIosNew fontSize="large" color="action" />
            </IconButton>
            <IconButton disabled={isTransition} onClick={nextStep}>
              <ArrowForwardIos fontSize="large" color="action" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
