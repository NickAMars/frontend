import React, { PureComponent } from "react";
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

export default class ModalForm extends PureComponent {
  state = {
    body: [{ name: "", color: "", errorName: false, errorColor: false }],
    valid: [false],
    modal: false,
  };
  handleInputChange = (e, index) => {
    const { name, value } = e.target;
    // cerate a new instance of state
    const newBody = [...this.state.body];
    // change the target instance of the state
    newBody[index][name] = value;
    // change the state of the body
    this.setState({ body: newBody });
  };

  addFields = () => {
    this.setState({
      body: [
        ...this.state.body,
        { name: "", color: "", errorName: false, errorColor: false },
      ],
      valid: [...this.state.valid, false],
    });
  };
  removeField = (index) => {
    const validState = [
      ...this.state.valid.slice(0, index),
      ...this.state.valid.slice(index + 1),
    ];
    const newBody = [
      ...this.state.body.slice(0, index),
      ...this.state.body.slice(index + 1),
    ];
    this.setState({ body: newBody, value: validState });
  };
  errorHandler = (text, index, error) => {
    // if value is empty. display am error message to the user
    const newBody = [...this.state.body];
    const validState = [...this.state.valid];
    if (text.length === 0) {
      newBody[index][error] = true;
    } else if (newBody[index][error]) {
      newBody[index][error] = false;
    }
    // when both of them are true we set the set validate to true for that index
    validState[index] =
      !newBody[index]["errorColor"] && !newBody[index]["errorName"];
    this.setState({ valid: validState, body: newBody });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // updating the database
    const body = convertIntoBody(this.state.body);
    axios
      .post(`http://localhost:8080/api/1.0.0/groups`, body)
      .then((result) => {
        // update the call to display the tree
        this.props.afterLoad();
      });
    this.handleClose();
  };
  handleOpen = () => this.setState({ modal: true }); // setModal(true);
  handleClose = () => {
    this.props.close();
    this.setState({
      body: [{ name: "", color: "", errorName: false, errorColor: false }],
      valid: [false],
      modal: false,
    });
  };

  componentDidMount() {}
  static getDerivedStateFromProps(props, state) {
    if (props.isOpen && props.isOpen !== state.modal) {
      return { modal: props.isOpen };
    } else return null;
  }
  render() {
    const isNotValid = !(
      this.state.valid.every((isValid) => isValid === true) &&
      this.state.body.length !== 0
    );
    return (
      <Modal
        open={this.state.modal}
        onClose={this.handleClose}
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
                <IconButton aria-label="close" onClick={this.handleClose}>
                  <CloseIcon color="error" fontSize="medium" />
                </IconButton>
              </Tooltip>
            </div>
            <div style={{ alignSelf: "end", height: "fit-content" }}>
              <Tooltip title="adding a person" placement="right">
                <IconButton
                  color="success"
                  aria-label="add"
                  onClick={this.addFields}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <hr />
          <form onSubmit={this.handleSubmit}>
            <div
              style={{
                overflowY: "auto",
                overflowX: "hidden",
                height: "300px",
                marginBottom: "20px",
                paddingTop: 5,
              }}
            >
              {this.state.body.length !== 0 ? (
                this.state.body.map((user, i) => (
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
                          this.errorHandler(user["name"], i, "errorName");
                        }}
                        inputProps={{ maxLength: 50 }}
                        helperText={
                          user["errorName"] && user["name"].length === 0
                            ? "Name cannot be empty"
                            : ""
                        }
                        error={user["errorName"] && user["name"].length === 0}
                        onChange={(event) => this.handleInputChange(event, i)}
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
                          this.errorHandler(user["color"], i, "errorColor");
                        }}
                        inputProps={{ maxLength: 50 }}
                        helperText={
                          user["errorColor"] && user["color"].length === 0
                            ? "Color cannot be empty"
                            : ""
                        }
                        error={user["errorColor"] && user["color"].length === 0}
                        onChange={(event) => this.handleInputChange(event, i)}
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
                          onClick={() => this.removeField(i)}
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
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClose}
              >
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
    );
  }
}
