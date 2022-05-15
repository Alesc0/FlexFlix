import { Card, CardContent, CardMedia, Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  display: "flex",
};

export default function InfoModal(props) {
  const { open, handleClose, data } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Card style={style}>
        <CardMedia
          component="img"
          sx={{ width: 300 }}
          image={data.foto || ""}
          alt={data.titulo || ""}
        />
        <Box
          sx={{ display: "flex", flexGrow: 1, flexDirection: "column", p: 2 }}
        >
          <CardContent sx={{ flex: "0 1 auto", p: 0 }}>
            <Typography component="div" variant="h5">
              {data.titulo || null}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {data.genero ? data.genero.descricao : ""}
            </Typography>
            <Divider />
          </CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pt: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              component="div"
            >
              {data.descricao || ""}
            </Typography>
          </Box>
          <Box display="flex" marginTop="auto">
            <Box sx={{ mr: "auto" }}>
              <Button
                color="warning"
                variant="outlined"
                component={Link}
                to={"/IMDB/" + (data.titulo || "")}
                target="_blank"
              >
                IMDB
              </Button>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <Button color="error" variant="contained" onClick={handleClose}>
                Voltar
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </Modal>
  );
}
