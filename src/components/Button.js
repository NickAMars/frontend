import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import * as axios from "axios";
import { convertIntoBody } from "../helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500px",
  border: "1px solid #aaa",
  boxShadow: 24,
  p: 4,
  bgcolor: "background.paper",
  borderRadius: 2,
};

export default function AddGroupButton({ finishPost }) {
  // opens the model up to use
  const [modal, setModal] = useState(false);
  //  adding the form fields
  const [info, setInfo] = useState([
    { name: "", color: "", errorName: false, errorColor: false },
  ]);
  const [valid, setValid] = useState([false]);

  const handleOpen = () => setModal(true);
  const handleClose = () => {
    //place back to the original state
    setInfo([{ name: "", color: "", errorName: false, errorColor: false }]);
    setModal(false);
    setValid([false]);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // cerate a new instance of state
    const newState = [...info];
    // change the target instance of the state
    newState[index][name] = value;

    setInfo(newState);
  };
  const addFields = () => {
    setInfo([
      ...info,
      { name: "", color: "", errorName: false, errorColor: false },
    ]);
    setValid([...valid, false]);
  };
  const removeField = (index) => {
    const validState = [...valid.slice(0, index), ...valid.slice(index + 1)];
    const newState = [...info.slice(0, index), ...info.slice(index + 1)];

    setValid(validState);
    setInfo(newState);
  };
  const errorHandler = (text, index, error) => {
    // if value is empty. display am error message to the user
    const newState = [...info];
    const validState = [...valid];
    if (text.length === 0) {
      newState[index][error] = true;
      setInfo(newState);
    } else if (newState[index][error]) {
      newState[index][error] = false;
      setInfo(newState);
    }
    // when both of them are true we set the set validate to true for that index
    validState[index] =
      !newState[index]["errorColor"] && !newState[index]["errorName"];
    setValid(validState);
  };

  const isNotValid = !(
    valid.every((isValid) => isValid === true) && info.length !== 0
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // updating the database
    const body = convertIntoBody(info);
    axios
      .post(`http://localhost:8080/api/1.0.0/groups`, body)
      .then((result) => {
          // update the call to display the tree
          finishPost();
      });
    handleClose();
  };
  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add Group
      </Button>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              alignItems: "space-between",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Typography
                id="modal-title"
                variant="h5"
                component="h2"
                sx={{ marginBottom: 2 }}
              >
                Add Group
              </Typography>
              <Tooltip title="close the dialog" placement="right">
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon color="error" fontSize="medium" />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ alignSelf: "end", height: "fit-content" }}>
              <Tooltip title="adding a person" placement="right">
                <IconButton
                  color="success"
                  aria-label="add"
                  onClick={addFields}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                height: "300px",
                marginBottom: "20px",
                paddingTop: 5,
              }}
            >
              {info.length !== 0 ? (
                info.map((user, i) => (
                  <Grid container spacing={2} key={i}>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        type="text"
                        variant="outlined"
                        value={user["name"]}
                        onBlur={() => {
                          errorHandler(user["name"], i, "errorName");
                        }}
                        inputProps={{ maxLength: 50 }}
                        helperText={
                          user["errorName"] && user["name"].length === 0
                            ? "Name cannot be empty"
                            : ""
                        }
                        error={user["errorName"] && user["name"].length === 0}
                        onChange={(event) => handleInputChange(event, i)}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        name="color"
                        label="Color"
                        type="text"
                        variant="outlined"
                        value={user["color"]}
                        onBlur={() => {
                          errorHandler(user["color"], i, "errorColor");
                        }}
                        inputProps={{ maxLength: 50 }}
                        helperText={
                          user["errorColor"] && user["color"].length === 0
                            ? "Color cannot be empty"
                            : ""
                        }
                        error={user["errorColor"] && user["color"].length === 0}
                        onChange={(event) => handleInputChange(event, i)}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      {/* <svg data-testid="DeleteIcon"></svg> */}
                      <Tooltip title="removing a person" placement="right">
                        <IconButton
                          aria-label="remove"
                          color="error"
                          onClick={() => removeField(i)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    id="modal-title"
                    component="h6"
                    sx={{ marginBottom: 2 }}
                    color="#777"
                  >
                    Please add a person for submittion
                  </Typography>
                </div>
              )}
            </div>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isNotValid}
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
}
