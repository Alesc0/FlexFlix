import {
  Box,
  Button,
  CircularProgress,
  InputLabel,
  Divider,
  FormControl,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EditFilmes() {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [generos, setGeneros] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //requests
        const { data: responseFilme } = await axios.get("/filme/get/" + id);
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setMovie(responseFilme);
        setGeneros(responseGeneros);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(movie);
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
        flexDirection: "column",
        gap: 2,
        m: "5em auto",
        p: 3,
        color: "text.primary",
      }}
      component={Paper}
      maxWidth="sm"
    >
      <FormControl>
        <TextField id="txtTitle" label="Title" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtDescription" label="Description" variant="outlined" />
      </FormControl>
      <FormControl>
        <TextField id="txtPhoto" label="Link to Photo" variant="outlined" />
      </FormControl>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl>
          <InputLabel id="label-select"> Genre </InputLabel>
          <Select sx={{ minWidth: 125 }} label="Centro" labelId="label-select">
            {generos.length > 0 ? (
              generos.map((row) => (
                <MenuItem key={row.idgenero} value={row.idgenero}>
                  {row.descricao}
                </MenuItem>
              ))
            ) : (
              <MenuItem value={-1}> {"Sem centros disponíveis!"} </MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, ml: "auto" }}>
        <Button component={Link} to="/list" color="error" variant="contained">
          Voltar
        </Button>
        <Button color="info" variant="contained">
          Confirmar
        </Button>
      </Box>
    </Box>
  );
}

export default EditFilmes;
