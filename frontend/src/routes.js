import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

// layouts
import DefaultLayout from "./views/defaultLayout";
// paginas
import Filmes from "./views/filmes/filmes";
import AddFilmes from "./views/filmes/addFilmes";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Filmes />} />
          <Route path="/add" element={<AddFilmes />} />
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
