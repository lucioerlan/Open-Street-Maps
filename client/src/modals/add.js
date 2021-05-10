import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Snackbar,
  SnackbarContent,
  Tooltip
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import api from 'src/services/api';
import Textfields from 'src/form/textfield';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[800]
  },
  error: {
    backgroundColor: red[600]
  },
  warning: {
    backgroundColor: amber[600]
  },
  fab: {
    position: 'fixed',
    bottom: 32,
    right: 32,
    zIndex: theme.zIndex.drawer - 100
  }
}));

const ModalAdd = () => {
  const classes = useStyles();
  const [alert, setAlert] = useState({ message: null, variant: null });
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    tracking: '',
    lat: '',
    lon: '',
    plate: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);

    try {
      await api.post('/store-mapa', state);
      setTimeout(() => setAlert({
        message: 'Success in adding information!',
        variant: 'success'
      }),
      300);

      setOpen(false);
    } catch (err) {
      if (err.response.data.message === 'existing tracking') {
        setAlert({
          message: 'Tracking already exists!',
          variant: 'warning'
        });
      } else {
        setAlert({
          message: 'Error saving!',
          variant: 'error'
        });
      }
    }
  };

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
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
      <span
        className={clsx(classes.fab, {
          [classes.shiftFab]: open
        })}
      >
        <Tooltip title="Add Tracking" aria-label="Add Tracking">
          <Fab color="primary" onClick={handleClickOpen}>
            <AddOutlinedIcon />
          </Fab>
        </Tooltip>
      </span>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: submitHandler
        }}
      >
        <DialogTitle>Add Tracking</DialogTitle>
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

export default ModalAdd;
