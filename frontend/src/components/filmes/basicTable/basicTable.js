import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function BasicTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>TITLE</TableCell>
            <TableCell align="left">DESCRIPTIOn</TableCell>
            <TableCell align="center">GENRE</TableCell>
            <TableCell align="right">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.idfilme}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.titulo}
              </TableCell>
              <TableCell align="left">{row.descricao}</TableCell>
              <TableCell align="center">{row.genero.descricao}</TableCell>
              <TableCell align="center">
                {
                  <IconButton component={Link} to={"/edit/" + row.idfilme}>
                    <Edit color="info" />
                  </IconButton>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
