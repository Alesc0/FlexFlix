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
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../api/axios";

function EditFilmes() {
  const [movie, setMovie] = useState({});
  const [generos, setGeneros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [errTitulo, setErrTitulo] = useState(false);
  const [labelTitulo, setLabelTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [errDescricao, setErrDescricao] = useState(false);
  const [labelDescricao, setLabelDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [errFoto, setErrFoto] = useState(false);
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
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setMovie(responseFilme);
        setGeneros(responseGeneros);
        setFields(responseFilme);
      } catch (error) {
        console.log(error);
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
    setLabelTitulo("");
    setLabelDescricao("");
  };

  async function handleSubmit(e) {
    setLoadingButton(true);

    e.preventDefault();
    clearErrors();
    if (!titulo || titulo.length < 5 || titulo.length > 100) {
      setErrTitulo(true);
      setLabelTitulo("The title must be between 5 and 100 characters long.");
    }
    if (!descricao || descricao.length < 5 || descricao.length > 250) {
      setErrDescricao(true);
      setLabelDescricao(
        "The description must be between 5 and 250 characters long."
      );
    }
    if (!foto) setErrFoto(true);

    if (errDescricao || errFoto || errTitulo) return;

    let m = Object.assign({}, movie);
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
      await axios.put("/filme/update/" + id, {
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        foto: foto.trim(),
        idgenero: genero,
      });
      toast.success("Movie updated with success!");
    } catch (error) {
      toast.error(error);
    }
    setLoadingButton(false);
  }
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
        mt: 20,
      }}
    >
      <img
        width={350}
        style={{ borderRadius: "5px" }}
        alt="Unavailable!"
        src={foto}
      />

      <Box sx={{ flexGrow: 1 }} maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 3,
              color: "text.primary",
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
              helperText={labelTitulo}
            />
            <TextField
              id="txtDescription"
              label="Description"
              multiline
              variant="outlined"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              error={errDescricao}
              helperText={labelDescricao}
            />
            <TextField
              id="foto"
              label="Link to Photo"
              variant="outlined"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              error={errFoto}
            />
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <FormControl>
                <InputLabel id="genre-select">Genre</InputLabel>
                <Select
                  label="Genre"
                  value={genero}
                  labelId="genre-select"
                  onChange={(e) => setGenero(e.target.value)}
                >
                  {generos.length > 0 ? (
                    generos.map((row) => (
                      <MenuItem key={row.idgenero} value={row.idgenero}>
                        {row.descricao}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={1}>{"Sem generos disponíveis!"}</MenuItem>
                  )}
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
