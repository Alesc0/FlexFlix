import { Box, CircularProgress, Typography } from "@mui/material";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import FilmeSlider from "../../components/filmes/filmeSlider/filmeSlider";
import ImgSlider from "../../components/filmes/ImgSlider/imgSlider";
import InfoModal from "../../components/filmes/modal/modal";

function Filmes() {
  const [movies, setMovies] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [getMovie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //requests
        const { data: responseFilmes } = await axios.get("/filme/list");
        const { data: responseGeneros } = await axios.get("/genero/list");
        //set states
        setMovies(responseFilmes);
        setGeneros(responseGeneros);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      <ImgSlider />
      {generos.map((row, i) =>
        movies.filter((e) => e.genero.idgenero === row.idgenero).length !==
        0 ? (
          <Box
            key={row.idgenero}
            display="flex"
            position="relative"
            flexDirection="column"
            sx={{ top: -100, pl: 5 }}
          >
            <Typography variant="h5">{row.descricao}</Typography>
            <FilmeSlider
              key={row.idgenero}
              handleOpen={handleOpen}
              setMovie={setMovie}
              data={movies.filter((e) => e.genero.idgenero === row.idgenero)}
            />
          </Box>
        ) : null
      )}
      <InfoModal
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
        data={getMovie}
        loading={loading}
      />
    </>
  );
}

export default Filmes;
