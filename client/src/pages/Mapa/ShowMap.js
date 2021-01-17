import React, { Component } from 'react';
import {
  Map,
  TileLayer,
  Popup,
  FeatureGroup,
  withLeaflet,
  LayersControl,
  ScaleControl,
} from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L, { divIcon } from 'leaflet';
import FullscreenControl from 'react-leaflet-fullscreen';
import PrintControlDefault from 'react-leaflet-easyprint';
import { EditControl } from 'react-leaflet-draw';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import GeoSearch from './GeoSearch';
import { IconRed, IconBlue } from '../../components/IconsMap';
import './styles.css';
import SteinMarker from './SteinMarker';

const PrintControl = withLeaflet(PrintControlDefault);
const defaultIconMarkup = renderToStaticMarkup(<IconBlue />);
const defaultMarkerIcon = divIcon({ html: defaultIconMarkup });
const activeIconMarkup = renderToStaticMarkup(<IconRed />);
const activeMarkerIcon = divIcon({ html: activeIconMarkup });

// build layers control group
const { BaseLayer } = LayersControl;

// input gold key google

const goldkey = 'AIzaSyAfW6kN66wZbJdRFIBVVFj8bUH3st0EQjw';

class ShowMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-14.5463, -52.7941],
      zoom: 5,
    };
    this.handleCenterOnPopup.bind(this);
  }

  handleCenterOnPopup(latLng) {
    this.setState({
      center: latLng,
    });
  }

  render() {
    const { steine, selectedStein, onSelectStein } = this.props;
    const { center, zoom } = this.state;
    return (
      <div id="mapid" role="application">
        <Map center={center} zoom={zoom} style={{ height: '100vh' }}>
          <FullscreenControl position="topleft" />
          <GeoSearch />
          <FeatureGroup ref={this._onFeatureGroupReady}>
            <EditControl
              position="topleft"
              onDrawStart={this._onDrawStart}
              onCreated={this._onCreated}
              onEdited={this._onEdited}
              onDeleted={this._onDeleted}
              draw={{
                polyline: {
                  icon: new L.DivIcon({
                    iconSize: new L.Point(8, 8),
                    className: 'leaflet-div-icon leaflet-editing-icon',
                  }),
                  shapeOptions: {
                    guidelineDistance: 10,
                    color: 'navy',
                    weight: 3,
                  },
                },
                // rectangle: false,
                // circlemarker: false,
                // circle: false,
                // polygon: false
              }}
            />
          </FeatureGroup>

          {steine.map(stein => {
            const position = [stein.lat, stein.lon];
            const isSelected = stein.id === selectedStein;

            return (
              <SteinMarker
                position={position}
                id={stein.id}
                key={stein.id}
                selected={isSelected}
                onSelectStein={onSelectStein}
                icon={isSelected ? activeMarkerIcon : defaultMarkerIcon}
                zIndexOffset={isSelected ? 20000 : 10000}
                click={() => onSelectStein(stein.id)}
              >
                <Popup onOpen={() => this.handleCenterOnPopup(position)}>
                  <span>
                    tracking: {stein.tracking} <br />
                    plate: {stein.plate} <br />
                    lat: {stein.lat} <br />
                    lon: {stein.lon} <br />
                  </span>
                </Popup>
              </SteinMarker>
            );
          })}
          <PrintControl
            ref={ref => {
              this.printControl = ref;
            }}
            position="topleft"
            sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
            hideControlContainer={false}
          />
          <PrintControl
            position="topleft"
            sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
            hideControlContainer={false}
            title="Export as PNG"
            exportOnly
          />
          <LayersControl position="topright">
            {/* https://wiki.openstreetmap.org/wiki/Tile_servers */}
            <BaseLayer checked name="Esri National">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
              />
            </BaseLayer>
            <BaseLayer name="Leaflet Roadmap">
              <ReactLeafletGoogleLayer
                googleMapsLoaderConf={{ KEY: goldkey }}
                type="roadmap"
              />
            </BaseLayer>
            <BaseLayer name="Leaflet Hybrid">
              <ReactLeafletGoogleLayer
                googleMapsLoaderConf={{ KEY: goldkey }}
                type="hybrid"
              />
            </BaseLayer>
            <BaseLayer name="Leaflet Terrain">
              <ReactLeafletGoogleLayer
                googleMapsLoaderConf={{ KEY: goldkey }}
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
            <BaseLayer name="Wikimedia Hike">
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="http://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png"
              />
            </BaseLayer>
          </LayersControl>
          <ScaleControl position="bottomleft" />
        </Map>
      </div>
    );
  }
}
export default ShowMap;
