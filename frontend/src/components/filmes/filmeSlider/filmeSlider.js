import { Tab, Tabs } from "@mui/material";
import BoxFilme from "../boxFilme/boxFilme";

function FilmeSlider(props) {
  const { data, setMovie, handleOpen, genero } = props;
  return (
    <Tabs
      sx={{ position: "relative" }}
      value={0}
      variant="scrollable"
      TabIndicatorProps={{
        style: {
          display: "none",
        },
      }}
    >
      {data.map((e) => (
        <Tab
          key={e.idfilme}
          icon={<BoxFilme data={e} />}
          onClick={() => {
            setMovie(e);
            handleOpen();
          }}
        />
      ))}
    </Tabs>
  );
}

export default FilmeSlider;
