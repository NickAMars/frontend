import Selector from "./components/Selector";
import AddGroupButton from "./components/AddGroupButton";
import Grid from "@material-ui/core/Grid";
import Display from "./components/Display";
import "./index.css";
import { useState } from "react";
import ModalForm from "./components/ModalForm";
function App() {
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const getColor = (selectedColor) => {
    // collect the color from select
    setColor(selectedColor);
  };
  const afterLoad = () => {
    setLoading(!loading);
  };
  const open = () => setOpen(true);
  const closed = () => setOpen(false);
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item xs style={{ padding: "15px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Selector getColor={getColor} loading={loading} />
            </Grid>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <AddGroupButton open={open} />
            <ModalForm afterLoad={afterLoad} close={closed} isOpen={isOpen} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} style={{ maxWidth: "100vw" }}>
        <Display color={color} loading={loading} />
      </Grid>
    </Grid>
  );
}

export default App;
