import { useState } from "react";

// MapBox for react made by a team of developers from uber
import ReactMapGL from "react-map-gl";

// Terramor imports
import MapElement from "./MapElements";

export default function Map({ landmarks }) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    // The latitude and longitude of the center of Montreal
    latitude: 45.5017,
    longitude: -73.5673,
    zoom: 10,
  });

  const renderMapElements = landmarks.map((landmark, index) => {
    const name = landmark[0];
    const latLng = JSON.parse(landmark[1]);
    const lat = latLng[0];
    const lng = latLng[1];
    const landmarkAddress = landmark[2];
    const tokenWorth = landmark[3];
    return (
      <MapElement
        lat={lat}
        lng={lng}
        name={name}
        landmarkAddress={landmarkAddress}
        tokenWorth={tokenWorth}
        index={index}
      ></MapElement>
    );
  });

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="pk.eyJ1IjoiZWxjbGFuZGVzdGlubyIsImEiOiJja21xZXNmNmkwNzlpMm9waHltcDF2d2FyIn0.AT0kMKikvuNopwV-TqXxqQ"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {renderMapElements}
    </ReactMapGL>
  );
}
