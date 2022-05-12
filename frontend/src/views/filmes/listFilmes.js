import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import BasicTable from "../../components/filmes/basicTable/basicTable";

export default function ListFilmes() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //requests
        const { data: responseFilmes } = await axios.get("/filme/list");
        //set states
        setMovies(responseFilmes);
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
    <Box sx={{ marginInline: 10, pt: 10 }}>
      <BasicTable data={movies} />
    </Box>
  );
}
