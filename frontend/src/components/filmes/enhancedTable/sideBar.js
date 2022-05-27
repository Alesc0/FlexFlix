import { Close, Search } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../api/axios";

export default function SideBar(props) {
  const { anchor, state, handleSidebar, setMovies, refetch } = props;
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

  const handleReset = () => {
    setId("");
    setTitulo("");
    setDescricao("");
  };

  const checkFieldsEmpty = () => {
    let check = false;
    if (!titulo && !descricao && !id) check = true;
    return check;
  };

  const handleSideBarClick = async (e) => {
    e.preventDefault();

    if (checkFieldsEmpty()) {
      toast.error("Fill one of the fields in order to apply a filter!", {
        toastId: "filter-error",
      });
      return;
    }

    setLoadingButton(true);
    try {
      //requests
      const { data: responseFilmes } = await axios.get("/filme/filter", {
        params: { id: id, titulo: titulo, descricao: descricao },
      });
      //set states
      setMovies(responseFilmes);
      toast.success("Filter applied!", { toastId: "filter-id" });
    } catch (error) {
      toast.error(error.message);
    }
    setLoadingButton(false);
    handleSidebar(false, e);
  };

  return (
    <Drawer
      anchor={anchor}
      open={state}
      onClose={(e) => handleSidebar(false, e)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
          height: "100%",
        }}
        role="presentation"
      >
        <Stack
          direction="row"
          sx={{
            pt: 3,
            paddingInline: 3,
          }}
        >
          <Typography variant="h4" component="div">
            Filtros
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={(e) => handleSidebar(false, e)}
          >
            <Close color="info" />
          </IconButton>
        </Stack>
        <Divider sx={{ width: "95%", m: "0 auto" }} />
        <form
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
          onSubmit={handleSideBarClick}
        >
          <Stack spacing={2} sx={{ p: 2 }}>
            <TextField
              value={id}
              onChange={(e) => setId(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="info" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              placeholder="ID"
              autoComplete="off"
            />
            <TextField
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="info" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              placeholder="Title"
              autoComplete="off"
            />
            <TextField
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="info" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              placeholder="Description"
              autoComplete="off"
            />
          </Stack>
          <Stack
            sx={{
              mt: "auto",
            }}
          >
            <Divider width="95%" sx={{ m: "1em auto" }} />
            <Button
              sx={{ marginInline: 2, p: 1 }}
              color="warning"
              variant="outlined"
              onClick={handleReset}
            >
              Reset
            </Button>
            <LoadingButton
              color="info"
              sx={{ m: 2, p: 1.5 }}
              loading={loadingButton}
              variant="contained"
              type="submit"
              icon={<CircularProgress size={29} />}
            >
              Search
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
}
