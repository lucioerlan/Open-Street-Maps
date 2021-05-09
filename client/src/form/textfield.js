import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { MaskCoordinate } from 'src/utils/textMask';

const Textfields = ({ setState, state }) => (
  <>
    <TextField
      required
      value={state.tracking}
      label="Tracking"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      inputProps={{
        maxLength: 11
      }}
      onChange={(e) => setState({ ...state, tracking: e.target.value })}
    />

    <TextField
      required
      value={state.lat}
      label="Latitude"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      InputProps={{
        inputComponent: MaskCoordinate
      }}
      onChange={(e) => setState({ ...state, lat: e.target.value })}
    />

    <TextField
      required
      value={state.lon}
      label="Longitude"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      InputProps={{
        inputComponent: MaskCoordinate
      }}
      onChange={(e) => setState({ ...state, lon: e.target.value })}
    />

    <TextField
      required
      value={state.plate}
      label="Plate"
      style={{ margin: 20 }}
      type="text"
      color="primary"
      margin="normal"
      variant="outlined"
      inputProps={{
        maxLength: 50
      }}
      onChange={(e) => setState({ ...state, plate: e.target.value })}
    />
  </>
);

Textfields.propTypes = {
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired
};

export default Textfields;
