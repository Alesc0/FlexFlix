import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../api/axios";
import FilmeSlider from "../../components/filmes/filmeSlider/filmeSlider";
import ImgSlider from "../../components/filmes/ImgSlider/imgSlider";
import LoadMiddle from "../../components/filmes/loadMiddle";
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
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <LoadMiddle />
  ) : (
    <>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        sx={{ maxHeight: "50em" }}
      >
        <ImgSlider />
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingInline: 5,
          top: -60,
        }}
      >
        {generos.map((row, i) =>
          movies.filter((e) => e.genero.idgenero === row.idgenero).length !==
          0 ? (
            <Box
              key={row.idgenero}
              display="flex"
              position="relative"
              flexDirection="column"
            >
              <Typography variant="h5">{row.descricao}</Typography>
              <FilmeSlider
                handleOpen={handleOpen}
                setMovie={setMovie}
                data={movies.filter((e) => e.genero.idgenero === row.idgenero)}
              />
            </Box>
          ) : null
        )}
      </Box>
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
