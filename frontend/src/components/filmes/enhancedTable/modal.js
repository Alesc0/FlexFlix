import { Box, Button, Card, CardContent, Divider } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  width: "450px",
};

export default function InfoModal(props) {
  const { open, handleClose, data, handleClick } = props;

  return (
    <Modal open={open} onClose={handleClose}>
      <Card style={style}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Delete</Typography>
          <Divider />
          <Typography variant="h5">
            Are you sure you want to delete {data.length} movie
            {data.length > 1 && "s"}?
          </Typography>
          <Typography color="error" variant="subtitle1">
            This action is not recommended as it can't be undone.
          </Typography>
          <Divider />
          <Box
            sx={{ display: "flex", flexDirection: "row", gap: 2, ml: "auto" }}
          >
            <Button color="error" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button color="info" variant="contained" onClick={handleClick}>
              Confirm
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Modal>
  );
}
