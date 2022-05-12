// material
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { alpha } from "@mui/material";
import PropTypes from "prop-types";

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeOptions = {
    palette: {
      primary: {
        lighter: "#FFFFFF",
        light: "#06BEE1",
        main: "#1768AC",
        dark: "#2541B2",
        darker: "#03256C",
      },
      secondary: {
        lighter: "#9DD9D2",
        light: "#79BCB8",
        main: "#5EC2B7",
        dark: "#2CA6A4",
        darker: "#3AA7A3",
      },
      background: {
        default: "#1B2021",
        paper: "#292f30",
        transparent: alpha("#F7F5FB", 0.0),
      },
      text: { primary: "#F4F6F8", secondary: "#C4CDD5", disabled: "#919EAB" },
    },
    shape: { borderRadius: 8 },
  };
  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
