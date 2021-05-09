import React from 'react';
import { FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

export const Control = ({ position }) => {
  return (
    <FeatureGroup>
      <EditControl
        position={position}
        draw={{
          polyline: {
            shapeOptions: { color: 'red' },
            allowIntersection: false,
            showLength: true,
            metric: false,
            feet: false
          },
          polygon: {
            allowIntersection: false,
            shapeOptions: { color: 'blue' },
            edit: false,
            showLength: true,
            metric: false,
            feet: false,
            showArea: true
          },
          rectangle: {
            shapeOptions: { color: 'green' },
            showLength: true,
            metric: false,
            feet: false,
            showArea: true
          },
          circle: {
            shapeOptions: { color: 'magenta' },
            showLength: true,
            metric: false,
            feet: false,
            showArea: true
          }
        }}
      />
    </FeatureGroup>
  );
};
