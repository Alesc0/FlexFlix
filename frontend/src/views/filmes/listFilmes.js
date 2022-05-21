import { Box, CircularProgress } from "@mui/material";
import axios from "../../api/axios";
import { useCallback, useEffect, useState } from "react";
import EnhancedTable from "../../components/filmes/enhancedTable/enhancedTable";
import { toast } from "react-toastify";

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
        toast.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [setMovies, val]);

  return (
    <Box sx={{ marginInline: 10, mt: 10 }}>
      <EnhancedTable
        data={movies}
        isLoading={loading}
        setLoading={setLoading}
        setMovies={setMovies}
        refetch={refetch}
      />
    </Box>
  );
}
