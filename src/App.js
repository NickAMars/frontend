import Selector from "./components/Selector";
import AddGroupButton from "./components/Button";
import Grid from "@material-ui/core/Grid";
import Display from "./components/Display";
import "./index.css";
import { useState } from "react";
function App() {
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(true);
  const getColor = (selectedColor) => {
    // collect the color from select
    setColor(selectedColor);
  };
  const finishPost = () => {
    setLoading(!loading);
  };
  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Grid item xs style={{ padding: "15px" }}>
        <Grid container>
          <Grid item xs={6}>
            <Selector getColor={getColor} loading={loading}/>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <AddGroupButton finishPost={finishPost} />
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
