import { useTheme } from "@emotion/react";
import {
  alpha,
  Box,
  Divider,
  Fade,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

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
const transitionTime = 600;
const delay = 500;
export default function ImgSlider() {
  const [index, setStep] = useState([true, false, false]);
  const [isTransition, setTransition] = useState(false);
  const theme = useTheme();

  const timeoutRef = useRef(null);

  const activeStep = () => {
    return index.indexOf(true);
  };
  const nextStep = () => {
    let step = 0;
    if (activeStep() === index.length - 1) step = 0;
    else step = activeStep() + 1;
    handleStep(step);
  };
  const handleStep = (step) => () => {
    console.log("got here");
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
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      sx={{ maxHeight: "45em" }}
    >
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
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            m: 2,
            position: "absolute",
            bottom: 150,
            width: "100%",
          }}
        >
          <Box sx={{ width: "fit-content", position: "relative", left: 50 }}>
            <Stepper nonLinear activeStep={activeStep()}>
              {MyCollection.map((row, index) => {
                return (
                  <Step sx={{ p: 1 }} key={row.label}>
                    <StepButton
                      color="grey"
                      disabled={isTransition}
                      onClick={handleStep(index)}
                    />
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <Box sx={{ width: "fit-content", position: "relative", right: 0 }}>
            <Stepper nonLinear activeStep={activeStep()}>
              {MyCollection.map((row, index) => {
                return (
                  <Step sx={{ p: 1 }} key={row.label}>
                    <StepButton
                      color="grey"
                      disabled={isTransition}
                      onClick={handleStep(index)}
                    />
                  </Step>
                );
              })}
            </Stepper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
