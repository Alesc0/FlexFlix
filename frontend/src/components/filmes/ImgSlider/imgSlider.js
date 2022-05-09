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
import { useEffect, useRef, useState } from "react";

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
const delay = 2500;
export default function ImgSlider() {
  const [index, setStep] = useState([true, false, false]);
  const [isTransition, setTransition] = useState(false);
  const timeoutRef = useRef(null);
  const theme = useTheme();

  const activeStep = () => {
    return index.indexOf(true);
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
  /*
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

   useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        handleStep(activeStep() === index.length - 1 ? 1 : activeStep() + 1),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]); */

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
            m: 2,
            position: "absolute",
            bottom: 150,
            left: 50,
            width: "100%",
          }}
        >
          <Box sx={{ width: "fit-content" }}>
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
