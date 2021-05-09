import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Popup } from 'react-leaflet';
import { Button } from '@material-ui/core';

export const Balloon = ({
  stein, setCenter, latlon, formControl
}) => {
  const navigate = useNavigate();

  return (
    <Popup position={latlon} onOpen={() => setCenter(latlon)}>
      <span className={formControl}>
        Tracking:
        {stein.tracking}
        <br />
        Latitude:
        {stein.lat}
        <br />
        Longitude:
        {stein.lon}
        <br />
        Plate:
        {stein.plate}
        <p />
      </span>
      <Button
        fullWidth
        onClick={() => {
          navigate('/app/home/view', { state: stein._id });
        }}
        color="secondary"
        size="small"
        variant="outlined"
      >
        View Tracking
      </Button>
    </Popup>
  );
};

Balloon.propTypes = {
  stein: PropTypes.object.isRequired,
  setCenter: PropTypes.func.isRequired,
  latlon: PropTypes.array.isRequired,
  formControl: PropTypes.string.isRequired
};
