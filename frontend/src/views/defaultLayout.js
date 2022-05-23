import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/footer";

export default function DefaultLayout() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="absolute"
          sx={{
            bgcolor: "background.transparent",
          }}
          elevation={0}
        >
          <Toolbar>
            <Typography
              variant="h3"
              noWrap
              fontWeight="bolder"
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                color: "primary.dark",
                textDecoration: "none",
              }}
            >
              FlexFlix
            </Typography>
            <Typography variant="h6">by Alex</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          minWidth: "400px",
        }}
      >
        <Outlet />
        <ToastContainer position="bottom-left" />
        <Footer />
      </Box>
    </>
  );
}
