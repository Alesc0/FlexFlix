import { Box, Drawer } from "@mui/material";

export default function SideBar({ anchor, state, handleSidebar, inner }) {
  return (
    <Drawer anchor={anchor} open={state} onClose={handleSidebar(false)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 300,
          height: "100%",
        }}
        role="presentation"
      >
        {inner()}
      </Box>
    </Drawer>
  );
}
