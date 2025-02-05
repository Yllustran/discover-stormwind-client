import React from "react";
import { MapContainer, ImageOverlay, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import mapImage from "../../../assets/images/mapview.jpg";
import L from "leaflet";
import './MapView.css'

const MapView = () => {
  const bounds = [
    [0, 0],
    [2666, 4000],
  ];

  const MiddleMarker = [1333, 2000];

  return (
    <div className="d-flex justify-content-center align-items-center vh-50 w-100 m-0 p-0">
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1}
        minZoom={-1.57}
        maxZoom={0}
        scrollWheelZoom={true}
        className="border border-dark bg-transparent w-100 w-md-75 w-lg-50 map-container">
        <ImageOverlay url={mapImage} bounds={bounds} />
        <Marker position={MiddleMarker}>
          <Popup>Voici un marqueur !</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
