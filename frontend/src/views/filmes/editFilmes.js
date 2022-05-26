import {
  Box,
  Button,
  CircularProgress,
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

function EditFilmes() {
  const [movie, setMovie] = useState({});
  const [generos, setGeneros] = useState([]);
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

  const errorList = {
    titulo: "The title must be between 5 and 100 characters long.",
    descricao: "The description must be between 5 and 250 characters long.",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //requests
        const { data: responseFilme } = await axios.get("/filme/get/" + id);
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setMovie(responseFilme);
        setGeneros(responseGeneros);
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

  const handleChange = (e) => {
    setFoto("");
    setSwitchFoto(e.target.checked);
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
  return loading ? (
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
            <TextField
              id="txtTitle"
              label="Title"
              variant="outlined"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              error={errTitulo}
              helperText={errTitulo ? errorList.titulo : ""}
            />
            <TextField
              id="txtDescription"
              label="Description"
              multiline
              variant="outlined"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              error={errDescricao}
              helperText={errDescricao ? errorList.descricao : ""}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id="foto"
                label="Link to Photo"
                variant="outlined"
                value={foto}
                onChange={(e) => setFoto(e.target.value)}
                error={errFoto}
                autoComplete="off"
                sx={{
                  flex: 1,
                  display: switchFoto ? "none" : "",
                }}
              />
              <input
                onChange={handleSetFoto}
                type="file"
                accept="image/*"
                style={{
                  flex: 1,
                  display: switchFoto ? "" : "none",
                }}
              />
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Link
                <Switch value={switchFoto} onChange={handleChange} />
                Foto
              </Stack>
            </Stack>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl>
                <InputLabel id="genre-select">Genre</InputLabel>
                <Select
                  label="Genre"
                  value={genero}
                  labelId="genre-select"
                  onChange={(e) => setGenero(e.target.value)}
                >
                  {generos.map((row) => (
                    <MenuItem key={row.idgenero} value={row.idgenero}>
                      {row.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Button color="warning" variant="outlined" onClick={reset}>
                  Reset
                </Button>
                <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
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
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default EditFilmes;
