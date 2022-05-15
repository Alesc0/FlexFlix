import { Box, CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import { useCallback, useEffect, useState } from "react";
import EnhancedTable from "../../components/filmes/enhancedTable/enhancedTable";

export default function ListFilmes() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [val, toggle] = useState(false);

  const refetch = useCallback(() => {
    toggle((prev) => !prev);
  }, [toggle]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        //requests
        const { data: responseFilmes } = await axios.get("/filme/list");
        //set states
        setMovies(responseFilmes);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [setMovies, refetch]);
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
    <Box sx={{ marginInline: 10, mt: 10 }}>
      <EnhancedTable
        data={movies}
        loading={loading}
        setLoading={setLoading}
        setMovies={setMovies}
      />
    </Box>
  );
}
