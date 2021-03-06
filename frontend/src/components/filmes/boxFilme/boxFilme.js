import { Box, Card, Typography, useTheme } from "@mui/material";
import { imagesUrl } from "../../../api/axios";

function BoxFilme({ data }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "12em",
        bgcolor: "background.default",
      }}
    >
      <img
        src={
          data.foto.startsWith("https://")
            ? data.foto
            : `${imagesUrl}/${data.foto}`
        }
        alt={data.titulo}
        style={{ objectFit: "cover" }}
        onError={(event) => {
          event.target.src = imagesUrl + "/notfoundImage.jpg";
          event.onerror = null;
        }}
      />
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          height: "100%",
          width: "100%",
          background: `linear-gradient(to bottom,transparent 25%,${theme.palette.background.default} 200%)`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          p: 1.5,
          width: "100%",
          textAlign: "left",
        }}
      >
        <Typography color="primary.lighter" variant="body2">
          {data.titulo}
        </Typography>
        <Typography color="primary.lighter" variant="caption">
          {data.genero.descricao}
        </Typography>
      </Box>
    </Card>
  );
}

export default BoxFilme;
