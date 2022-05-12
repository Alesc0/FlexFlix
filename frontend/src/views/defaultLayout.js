import SearchIcon from "@mui/icons-material/Search";
import { Button, Container } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";

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
              variant="h4"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", sm: "block" },
                flexGrow: 1,
                color: "primary.lighter",
                textDecoration: "none",
              }}
            >
              FlexFlix
            </Typography>
            <Button
              variant="contained"
              color="info"
              component={Link}
              to="/list"
            >
              Gerir Filmes
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}
