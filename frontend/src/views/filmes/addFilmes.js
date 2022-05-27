import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios, { imagesUrl } from "../../api/axios";
import Inner from "../../components/filmes/form/inner";
import LoadMiddle from "../../components/filmes/loadMiddle";

function EditFilmes() {
  const [titulo, setTitulo] = useState("");
  const [errTitulo, setErrTitulo] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [errDescricao, setErrDescricao] = useState(false);
  const [foto, setFoto] = useState("");
  const [errFoto, setErrFoto] = useState(false);
  const [switchFoto, setSwitchFoto] = useState(false);
  const [genero, setGenero] = useState(1);
  const [loadingButton, setLoadingButton] = useState(false);

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

  const handleSubmit = async (e) => {
    setLoadingButton(true);
    e.preventDefault();

    clearErrors();
    if (validate()) {
      try {
        //requests
        const formData = new FormData();
        formData.append(typeof foto === "string" ? "foto" : "file", foto);
        formData.append("descricao", descricao.trim());
        formData.append("titulo", titulo.trim());
        formData.append("idgenero", genero);
        const data = await axios.post("/filme/create", formData);
        toast.success(data.data);
      } catch (error) {
        for (const [key, value] of Object.entries(error.response.data)) {
          toast.error(value, { toastId: key });
        }
      }
    }
    setLoadingButton(false);
  };

  const innerProps = {
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
    switchFoto,
    setSwitchFoto,
  };

  return (
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

            <Inner {...innerProps} />
            <Stack
              sx={{
                mt: "auto",
              }}
            >
              <Divider />
              <Stack direction="row" spacing={2} sx={{ ml: "auto", mt: 1 }}>
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
            </Stack>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditFilmes;
