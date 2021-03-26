import { useState } from "react";
import ReactMapGL from "react-map-gl";
export default function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    // The latitude and longitude of the center of London
    latitude: 45.5017,
    longitude: -73.5673,
    zoom: 10,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="pk.eyJ1IjoiZWxjbGFuZGVzdGlubyIsImEiOiJja21xZXNmNmkwNzlpMm9waHltcDF2d2FyIn0.AT0kMKikvuNopwV-TqXxqQ"
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
}
