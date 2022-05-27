import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios, { imagesUrl } from "../../api/axios";
import LoadMiddle from "../../components/filmes/loadMiddle";
import Inner from "../../components/filmes/form/inner";

function EditFilmes() {
  const [movie, setMovie] = useState({});
  const [titulo, setTitulo] = useState("");
  const [errTitulo, setErrTitulo] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [errDescricao, setErrDescricao] = useState(false);
  const [foto, setFoto] = useState("");
  const [errFoto, setErrFoto] = useState(false);
  const [switchFoto, setSwitchFoto] = useState(false);
  const [genero, setGenero] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //requests
        const { data: responseFilme } = await axios.get("/filme/get/" + id);
        //set states
        setMovie(responseFilme);
        setFields(responseFilme);
      } catch (error) {
        toast.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const setFields = (data) => {
    setTitulo(data.titulo);
    setDescricao(data.descricao);
    setFoto(data.foto);
    setGenero(data.idgenero);
  };

  const reset = () => {
    setFields(movie);
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

  const handleSubmit = async (e) => {
    setLoadingButton(true);

    e.preventDefault();
    clearErrors();

    if (validate()) {
      let m = {};
      m.titulo = titulo;
      m.descricao = descricao;
      m.foto = foto;
      m.idgenero = genero;

      if (JSON.stringify(m) === JSON.stringify(movie)) {
        toast.info("You have to make changes in order to confirm!", {
          toastId: "no-changes-id",
        });
        setLoadingButton(false);
        return;
      }

      try {
        //requests
        const formData = new FormData();
        formData.append(typeof foto === "string" ? "foto" : "file", foto);
        formData.append("descricao", descricao.trim());
        formData.append("titulo", titulo.trim());
        formData.append("idgenero", genero);
        const data = await axios.put("/filme/update/" + id, formData);
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
            <Typography variant="h4">Edit Movie</Typography>
            <Divider />

            <Inner {...innerProps} />
            <Container
              disableGutters
              sx={{
                mt: "auto",
              }}
            >
              <Divider />
              <Stack direction="row" sx={{ mt: 1 }}>
                <Button color="warning" variant="outlined" onClick={reset}>
                  Reset
                </Button>
                <Stack direction="row" spacing={2} sx={{ ml: "auto" }}>
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
            </Container>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditFilmes;
