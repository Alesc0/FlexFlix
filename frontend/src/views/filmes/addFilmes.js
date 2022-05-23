import LoadingButton from "@mui/lab/LoadingButton";
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

function EditFilmes() {
  const [generos, setGeneros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [errTitulo, setErrTitulo] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [errDescricao, setErrDescricao] = useState(false);
  const [foto, setFoto] = useState("");
  const [errFoto, setErrFoto] = useState(false);
  const [genero, setGenero] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const errorList = {
    titulo: "The title must be between 5 and 100 characters long.",
    descricao: "The description must be between 5 and 250 characters long.",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //requests
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setGeneros(responseGeneros);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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

      try {
        //requests
        const data = await axios.post("/filme/create", {
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          foto: foto.trim(),
          idgenero: genero,
        });
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
            <Typography variant="h4">Add Movie</Typography>
            <Divider />
            <TextField
              id="txtTitle"
              label="Title"
              variant="outlined"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              error={errTitulo}
              helperText={errTitulo ? errorList.titulo : ""}
              autoComplete="off"
              autoFocus
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
              autoComplete="off"
            />
            <TextField
              id="foto"
              label="Link to Photo"
              variant="outlined"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              error={errFoto}
              autoComplete="off"
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
        </form>
      </Box>
    </Box>
  );
}

export default EditFilmes;
