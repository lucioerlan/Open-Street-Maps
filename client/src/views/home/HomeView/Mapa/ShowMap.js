import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Map, ScaleControl } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import SteinMarker from './SteinMarker';
import {
  Control, IconMap, Layers, Balloon
} from './components';

const useStyles = makeStyles(() => ({
  mapaLayout: {
    width: '100vw',
    height: '100vh'
  },
  popup: {
    fontSize: '15px',
    lineHeight: '28px'
  }
}));

const ShowMap = ({ steine, onSelectStein, selectedStein }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [center, setCenter] = useState([-28.16770242, -52.03145528]);
  const zoom = 9;

  const defaultIconMarkup = renderToStaticMarkup(<IconMap theme={theme.palette.primary.main} />);
  const defaultMarkerIcon = divIcon({ html: defaultIconMarkup });

  const handleOnContextMenu = useCallback(
    (event) => {
      setCenter([event.lat, event.lon]);
    },
    [setCenter]
  );

  return (
    <div className={classes.mapaLayout} role="application">
      <Map
        center={center}
        zoom={zoom}
        ondblclick={handleOnContextMenu}
        className={classes.mapaLayout}
      >
        {steine.map((stein) => {
          const latlon = [stein.lat, stein.lon];
          const isSelected = stein.tracking === selectedStein.tracking;

          return (
            <SteinMarker
              position={latlon}
              tracking={stein.tracking}
              key={stein.id}
              selected={isSelected}
              onSelectStein={onSelectStein}
              icon={defaultMarkerIcon}
              zIndexOffset={isSelected ? 20000 : 10000}
              onchange={() => onSelectStein(stein.tracking)}
            >
              <Balloon
                stein={stein}
                setCenter={setCenter}
                latlon={latlon}
                formControl={classes.popup}
              />
            </SteinMarker>
          );
        })}
        <Layers position="topright" />
        <FullscreenControl position="topright" />
        <Control position="topright" />
        <ScaleControl position="topright" />
      </Map>
    </div>
  );
};

export default ShowMap;
