import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { TextField, Button } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import InputMask from "react-input-mask";


function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

class DraggableDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      id: '',
      tracking: '',
      lat: '',
      lon: '',
      plate: ''

    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };


  handleClose = () => {
    this.setState({ open: false });

  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  submitHandler = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/tracking', this.state)

      .then(response => {
        NotificationManager.success('Data successfully saved!');

        this.handleClose();


      })

      .catch(error => {
        NotificationManager.error('Error saving!');
        console.log(error)
      })
  };

  render() {

    const { id, tracking, lat, lon, plate } = this.state

    return (

      <div>
        <form onSubmit={this.submitHandler}>
          <React.Fragment>
            <Tooltip title={"Add Record"}>
              <Button color="primary" variant="contained" id="MuiFab-primary" onClick={this.handleClickOpen}>
                <AddIcon />
              </Button>
            </Tooltip>
          </React.Fragment>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
          >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Add Record</DialogTitle>

            <DialogContent>

              <InputMask
                id="outlined-name"
                mask="999999999-9"
                value={id}
                onChange={this.changeHandler}>
                {() =>
                  <TextField
                    id="id"
                    required={true}
                    name="id"
                    label="ID"
                    value={id}
                    style={{ margin: 20 }}
                    type="text"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 100
                    }}
                    onChange={this.changeHandler} />}

              </InputMask>

              <InputMask
                id="outlined-name"
                mask=""
                value={tracking}
                onChange={this.changeHandler}>
                {() =>
                  <TextField
                    id="tracking"
                    required={true}
                    name="tracking"
                    label="Tracking"
                    value={tracking}
                    style={{ margin: 20 }}
                    type="text"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 20
                    }}
                    onChange={this.changeHandler} />}

              </InputMask>

              <InputMask
                id="outlined-name"
                mask="-99.9999"
                value={lat}
                onChange={this.changeHandler}>
                {() =>
                  <TextField
                    id="lat"
                    required={true}
                    name="lat"
                    label="Lat"
                    value={lat}
                    style={{ margin: 20 }}
                    type="text"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 100
                    }}
                    onChange={this.changeHandler} />}

              </InputMask>

              <InputMask
                id="outlined-name"
                mask="-99.9999"
                value={lon}
                onChange={this.changeHandler}>
                {() =>
                  <TextField
                    id="lon"
                    required={true}
                    name="lon"
                    label="Lon"
                    value={lon}
                    style={{ margin: 20 }}
                    type="text"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 100
                    }}
                    onChange={this.changeHandler} />}
              </InputMask>


              <InputMask
                id="outlined-name"
                mask=""
                value={plate}
                onChange={this.changeHandler}>
                {() =>
                  <TextField
                    id="plate"
                    required={true}
                    name="plate"
                    label="Plate"
                    value={plate}
                    style={{ margin: 20 }}
                    type="text"
                    color="secondary"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      maxLength: 20
                    }}
                    onChange={this.changeHandler} />}
              </InputMask>


            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={this.submitHandler} color="primary">
                Save
          </Button>
              <Button variant="outlined" onClick={this.handleClose} color="primary">
                Cancel
          </Button>

            </DialogActions>
          </Dialog>

        </form>
        <NotificationContainer />

      </div >


    );
  };


};

export default DraggableDialog;