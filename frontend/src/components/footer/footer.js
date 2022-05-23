import { Box } from "@mui/material";

export default function Footer() {
  const date = new Date();
  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
        pt: 0,
        bgcolor: "background.paper",
        mt: "auto",
      }}
    >
      <p>© {date.getFullYear()} Copyright</p>

      <a
        style={{ textDecoration: "none", color: "grey", fontWeight: "bold" }}
        href="https://github.com/Alesc0/"
      >
        HitGub
      </a>
    </Box>
  );
}
