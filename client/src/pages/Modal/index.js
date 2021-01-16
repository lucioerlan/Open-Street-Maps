import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Snackbar,
  SnackbarContent,
  TextField,
  Tooltip,
} from '@material-ui/core';
import { red, green, amber } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MaskedInput from 'react-text-mask';
import Draggable from 'react-draggable';
import './styles.css';
import api from '../../services/api';

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: green[800],
  },
  error: {
    backgroundColor: red[600],
  },
  warning: {
    backgroundColor: amber[600],
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '-',
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
    />
  );
}

export default function Modal() {
  const classes = useStyles();
  const [alert, setAlert] = useState({ message: null, variant: null });
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    id: '',
    tracking: '',
    lat: '',
    lon: '',
    plate: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function submitHandler(e) {
    e.preventDefault();
    setTimeout(() => setAlert({ message: null, variant: null }), 4000);

    if (!state) {
      setAlert({
        message: 'Fill in all fields to save!',
        variant: 'warning',
      });
    } else {
      try {
        await api.post('/tracking', state, setOpen(false));
        setAlert({
          message: 'Data successfully saved!',
          variant: 'success',
        });
      } catch (err) {
        setAlert({
          message: 'Error saving!',
          variant: 'error',
        });
      }
    }
  }

  const MySnackbar = () => (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
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
    <Fragment>
      <form onSubmit={submitHandler}>
        <Tooltip title="Add Tracking">
          <Button
            color="primary"
            variant="contained"
            id="MuiFab-primary"
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Add Tracking
          </DialogTitle>
          <DialogContent>
            <TextField
              value={state.id}
              required
              name="id"
              label="ID"
              style={{ margin: 20 }}
              type="text"
              color="primary"
              margin="normal"
              variant="outlined"
              inputProps={{
                maxLength: 13,
              }}
              onChange={e => setState({ ...state, id: e.target.value })}
            />

            <TextField
              value={state.tracking}
              required
              name="tracking"
              label="Tracking"
              style={{ margin: 20 }}
              type="text"
              color="primary"
              margin="normal"
              variant="outlined"
              inputProps={{
                maxLength: 11,
              }}
              onChange={e => setState({ ...state, tracking: e.target.value })}
            />

            <TextField
              value={state.lat}
              required
              name="lat"
              label="Lat"
              style={{ margin: 20 }}
              type="text"
              color="primary"
              margin="normal"
              variant="outlined"
              InputProps={{
                inputComponent: TextMaskCustom,
                value: state.lat,
                onChange: e => setState({ ...state, lat: e.target.value }),
              }}
              onChange={e => setState({ ...state, lat: e.target.value })}
            />

            <TextField
              value={state.lon}
              required
              name="lon"
              label="Lon"
              style={{ margin: 20 }}
              type="text"
              color="primary"
              margin="normal"
              variant="outlined"
              InputProps={{
                inputComponent: TextMaskCustom,
                value: state.lon,
                onChange: e => setState({ ...state, lon: e.target.value }),
              }}
              onChange={e => setState({ ...state, lon: e.target.value })}
            />

            <TextField
              value={state.plate}
              name="plate"
              label="Plate"
              style={{ margin: 20 }}
              type="text"
              color="primary"
              margin="normal"
              variant="outlined"
              inputProps={{
                maxLength: 17,
              }}
              onChange={e => setState({ ...state, plate: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={submitHandler} color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <MySnackbar />
    </Fragment>
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
