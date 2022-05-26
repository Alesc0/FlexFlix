import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const errorList = {
  titulo: "The title must be between 5 and 100 characters long.",
  descricao: "The description must be between 5 and 250 characters long.",
};

function Inner(props) {
  const [generos, setGeneros] = useState([]);
  const {
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
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //requests
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setGeneros(responseGeneros);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFoto("");
    setSwitchFoto(e.target.checked);
  };

  return (
    <>
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
    </>
  );
}

export default Inner;
