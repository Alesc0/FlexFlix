import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { imagesUrl } from "../../../api/axios";
import LoadMiddle from "../loadMiddle";
import Inner from "./inner";

function FormFilmes(props) {
  const { movie, loading, action, Submit } = props;
  const [switchFoto, setSwitchFoto] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState(1);
  const [errTitulo, setErrTitulo] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [errDescricao, setErrDescricao] = useState(false);
  const [foto, setFoto] = useState("");
  const [errFoto, setErrFoto] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    setFields(movie);
  }, [movie]);

  const setFields = (data) => {
    setTitulo(data.titulo || "");
    setDescricao(data.descricao || "");
    setFoto(data.foto || "");
    setGenero(data.idgenero || "");
  };

  const clearErrors = () => {
    setErrDescricao(false);
    setErrFoto(false);
    setErrTitulo(false);
  };

  const validate = () => {
    let isFormValid = true;

    if (!titulo || titulo.length < 5 || titulo.length > 100) {
      isFormValid = false;
      setErrTitulo(true);
    }
    if (!descricao || descricao.length < 5 || descricao.length > 250) {
      isFormValid = false;
      setErrDescricao(true);
    }
    if (!foto) {
      isFormValid = false;
      setErrFoto(true);
    }

    return isFormValid;
  };

  const handleSetFoto = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFoto(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    setLoadingButton(true);
    e.preventDefault();

    clearErrors();
    if (validate()) {
      Submit();
    }
    setLoadingButton(false);
  };

  const innerProps = [
    titulo,
    setTitulo,
    errTitulo,
    descricao,
    setDescricao,
    errDescricao,
    foto,
    setFoto,
    errFoto,
    genero,
    setGenero,
    handleSetFoto,
    switchFoto,
    setSwitchFoto,
  ];

  return loading ? (
    <LoadMiddle />
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginBlock: 15,
        height: "32em",
      }}
    >
      <img
        width={350}
        style={{ borderRadius: "5px", display: switchFoto ? "none" : "" }}
        alt="preview"
        src={foto}
        onError={(event) => {
          event.target.src = imagesUrl + "/notfoundImage.jpg";
          event.onerror = null;
        }}
      />

      <Box sx={{ flex: 1 }} maxWidth="sm">
        <form style={{ height: "100%" }} onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 3,
              color: "text.primary",
              height: "100%",
            }}
            component={Paper}
          >
            <Typography variant="h4">Add Movie</Typography>
            <Divider />
            <Inner {...innerProps} />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                gap: 2,
                mt: "auto",
              }}
            >
              <Divider />
              <Stack direction="row" spacing={2}>
                <Button
                  component={Link}
                  to="/list"
                  color="error"
                  variant="contained"
                >
                  Cancel
                </Button>
                <LoadingButton
                  loading={loadingButton}
                  variant="contained"
                  color="info"
                  type="submit"
                  loadingIndicator={<CircularProgress size={28} />}
                >
                  Confirm
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default FormFilmes;
