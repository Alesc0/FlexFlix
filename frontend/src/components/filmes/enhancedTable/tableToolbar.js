import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  alpha,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../sideBar/sideBar";

const EnhancedTableToolbar = (props) => {
  const { selected, handleOpen } = props;
  const [sidebar, setSidebar] = useState(false);

  const sidebarInner = () => (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "row", pt: 3, paddingInline: 3 }}
      >
        <Typography variant="h4" component="div">
          Filtros
        </Typography>
        <IconButton sx={{ marginLeft: "auto" }} onClick={handleSidebar(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ width: "95%", m: "0 auto" }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="ID"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Title"
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          placeholder="Description"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "auto",
        }}
      >
        <Divider width="95%" sx={{ m: "0 auto" }} />
        <Button color="info" sx={{ m: 2 }} variant="contained">
          Pesquisar
        </Button>
      </Box>
    </>
  );
  const handleSidebar = (open) => (event) => {
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
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Box sx={{ display: "flex", ml: "auto", gap: 2 }}>
            <Tooltip title="Filter list" sx={{ ml: "auto" }}>
              <IconButton color="secondary" onClick={handleSidebar(true)}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>

      <SideBar
        anchor="right"
        handleSidebar={handleSidebar}
        state={sidebar}
        inner={sidebarInner}
      />
    </>
  );
};

export default EnhancedTableToolbar;
