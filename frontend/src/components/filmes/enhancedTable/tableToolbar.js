import { Delete, FilterList, Refresh } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./sideBar";

const EnhancedTableToolbar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const { selected, handleOpen, setMovies, setLoading, refetch } = props;

  const handleSidebar = (open, event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setSidebar(open);
  };

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selected.length > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {selected.length > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {selected.length} selected
          </Typography>
        ) : (
          <Button
            component={Link}
            to="/add"
            color="secondary"
            variant="contained"
          >
            Add Movie
          </Button>
        )}
        {selected.length > 0 ? (
          <Tooltip title="Delete" sx={{ ml: "auto" }}>
            <IconButton onClick={(event) => handleOpen(event, selected)}>
              <Delete />
            </IconButton>
          </Tooltip>
        ) : (
          <Box sx={{ display: "flex", ml: "auto", gap: 2 }}>
            <Tooltip title="Refresh" sx={{ ml: "auto" }}>
              <IconButton color="secondary" onClick={refetch}>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter list" sx={{ ml: "auto" }}>
              <IconButton
                color="secondary"
                onClick={(e) => handleSidebar(true, e)}
              >
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>

      <SideBar
        anchor="right"
        handleSidebar={handleSidebar}
        state={sidebar}
        setLoading={setLoading}
        setMovies={setMovies}
        setSidebar={setSidebar}
        refetch={refetch}
      />
    </>
  );
};

export default EnhancedTableToolbar;
