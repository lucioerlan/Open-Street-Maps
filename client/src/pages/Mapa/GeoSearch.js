import { withLeaflet, MapControl } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

class GeoSearch extends MapControl {
  createLeafletElement(opts) {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      position: 'topleft',
    });
    this.props = opts;
    return searchControl;
  }

  componentDidMount() {
    const { map } = this.props.leaflet;
    map.addControl(this.leafletElement);
  }
}

export default withLeaflet(GeoSearch);
