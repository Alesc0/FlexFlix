import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

// layouts
import DefaultLayout from "./views/defaultLayout";
// paginas
import Filmes from "./views/filmes/filmes";
import AddFilmes from "./views/filmes/addFilmes";
import ListFilmes from "./views/filmes/listFilmes";
import EditFilmes from "./views/filmes/editFilmes";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Filmes />} />
          <Route path="/add" element={<AddFilmes />} />
          <Route path="/list" element={<ListFilmes />} />
          <Route path="/edit/:id" element={<EditFilmes />} />
        </Route>
        <Route path="/imdb/:name" element={<IMDB />} />
      </Routes>
    </BrowserRouter>
  );
}

function IMDB() {
  let { name } = useParams();
  window.location.replace("https://www.imdb.com/find?q=" + name);
}
