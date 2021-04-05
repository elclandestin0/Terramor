import React, { useState } from "react";

// react map gl imports
import { Marker, Popup } from "react-map-gl";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardHeader, Paper } from "@material-ui/core/";

// styles for this component
const useStyles = makeStyles({
  root: {
    maxWidth: 100,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// This component contains the marker and the popup
const MapElement = ({
  lat,
  lng,
  name,
  img,
  tokenWorth,
  index,
}) => {
  // show and close popup
  const [showPopup, setShowPopup] = useState(false);
  const classes = useStyles();

  return (
    <div>
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
        ></div>
      </Marker>
      {showPopup && (
        <Paper>
        <Card className={classes.root}>
          <Popup
            key={index + 1}
            latitude={lat}
            longitude={lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(false)}
            offsetTop={-10}
          >
            <CardHeader title={name} subheader={tokenWorth + " TerraCoin 💰"}/>
            <CardMedia
              style={{ height: "200px", width:"200px" }}
              component="img"
              image={img}
            />
          </Popup>
        </Card>
        </Paper>
      )}
    </div>
  );
};

export default MapElement;
