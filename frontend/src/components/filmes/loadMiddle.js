import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadMiddle() {
  return (
    <Box
      sx={{
        height: "50vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadMiddle;
