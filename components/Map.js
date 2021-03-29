import { useState } from "react";

// MapBox for react made by a team of developers from uber
import ReactMapGL, { Marker, Popup } from "react-map-gl";

export default function Map({ landmarks }) {
  // clicking a marker will show popup
  const [showPopup, setShowPopup] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    // The latitude and longitude of the center of Montreal
    latitude: 45.5017,
    longitude: -73.5673,
    zoom: 10,
  });

  const renderLandmarks = () => {
    const markers = landmarks.map((landmark, index) => {
      console.log(landmark);
      const name = landmark[0];
      const latLng = JSON.parse(landmark[1]);
      const lat = latLng[0];
      const lng = latLng[1];
      const landmarkAddress = landmark[2];
      const tokenWorth = landmark[3];

      return (
        <Marker
          key={index}
          latitude={lat}
          longitude={lng}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <div
            onClick={() => setShowPopup(true)}
            style={{
              backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/001/206/198/non_2x/mountain-icon-png.png')`,
              backgroundSize: "cover",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            {showPopup && <Popup
              key={index}
              latitude={lat}
              longitude={lng}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
              offsetTop={-10}
            >
              <div> {name} </div>
            </Popup>}
          </div>
        </Marker>
      );
    });
    return markers;
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken="pk.eyJ1IjoiZWxjbGFuZGVzdGlubyIsImEiOiJja21xZXNmNmkwNzlpMm9waHltcDF2d2FyIn0.AT0kMKikvuNopwV-TqXxqQ"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {renderLandmarks()}
    </ReactMapGL>
  );
}
