import React from 'react';
import { TileLayer, LayersControl } from 'react-leaflet';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';

const { BaseLayer } = LayersControl;
const Googlekey = process.env.REACT_APP_KEY_GOOGLE_MAPS;

export const Layers = ({ position }) => {
  return (
    <LayersControl position={position}>
      <BaseLayer checked name="Leaflet Roadmap">
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ KEY: Googlekey }}
          type="roadmap"
        />
      </BaseLayer>
      <BaseLayer name="Leaflet Hybrid">
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ KEY: Googlekey }}
          type="hybrid"
        />
      </BaseLayer>
      <BaseLayer name="Leaflet Terrain">
        <ReactLeafletGoogleLayer
          googleMapsLoaderConf={{ KEY: Googlekey }}
          type="terrain"
        />
      </BaseLayer>
      <BaseLayer name="OSM">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <BaseLayer name="OSM-BW">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="http://tile.stamen.com/terrain/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <BaseLayer name="Stamen: Watercolo">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="http://tile.stamen.com/watercolor/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <BaseLayer name="Stamen: Tower">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
        />
      </BaseLayer>
    </LayersControl>
  );
};
