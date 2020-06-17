import { LeafletProvider, MapLayer, withLeaflet } from "react-leaflet";
import { Marker as LeafletMarker } from "leaflet";
import React from "react";

class SteinMarker extends MapLayer {
  componentDidMount() {
    super.componentDidMount();
    if (this.props.selected) {
      this.leafletElement.openPopup();
    }

    this.leafletElement.on("click", () =>
      this.props.onSelectStein(this.props.id)
    );
  }

  componentWillUnmount() {
    this.leafletElement.off("click");
    super.componentWillUnmount();
  }

  componentDidUpdate(prevProps) {
    super.componentDidUpdate(prevProps);
    if (prevProps.selected && !this.props.selected) {
      this.leafletElement.closePopup();
    }
    if (!prevProps.selected && this.props.selected) {
      this.leafletElement.openPopup();
    }
  }

  createLeafletElement(props) {
    const el = new LeafletMarker(props.position, this.getOptions(props));
    this.contextValue = { ...props.leaflet, popupContainer: el };
    return el;
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    } 
  }

  render() {
    const { children } = this.props;
    return children == null || this.contextValue == null ? null : (
      <LeafletProvider value={this.contextValue}>{children}</LeafletProvider>
    );
  }
}

SteinMarker.defaultProps = {
  selected: false
};

export default withLeaflet(SteinMarker);
