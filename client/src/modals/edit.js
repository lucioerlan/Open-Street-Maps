/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';
import api from 'src/services/api';
import { makeStyles } from '@material-ui/styles';
import { red, green, amber } from '@material-ui/core/colors';
import Textfields from 'src/form/textfield';

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[600]
  },
  warning: {
    backgroundColor: amber[600]
  }
}));

const ModalEdit = (props) => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ message: null, variant: null });
  const { input } = props; // SEE
  const [open, setOpen] = useState(props.open);
  const [state, setState] = useState({
    id: input._id,
    tracking: input.tracking,
    lat: input.lat,
    lon: input.lon,
    plate: input.plate
  });

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);
    try {
      await api.put('/update-mapa', state);
      setTimeout(() => setAlert({
        message: 'Success in changing information!',
        variant: 'success'
      }),
      500);
      setTimeout(() => props.onClose(), 1700);
    } catch (err) {
      setAlert({
        message: 'Error saving!',
        variant: 'error'
      });
    }
  };

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={!!alert.message}
    >
      <SnackbarContent
        className={classes[alert.variant]}
        message={alert.message}
      />
    </Snackbar>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          component: 'form',
          onSubmit: submitHandler
        }}
      >
        <DialogTitle id="max-width-dialog-title">
          Some information can be edited
        </DialogTitle>
        <DialogContent>
          <Textfields setState={setState} state={state} />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <MySnackbar />
    </>
  );
};

export default ModalEdit;
