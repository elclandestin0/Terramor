import React, { useState } from "react";

// react map gl imports
import { Marker, Popup } from "react-map-gl";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";


// styles for the card
const useStyles = makeStyles({
  root: {
    minWidth: 100,
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
const MapElement = ({ lat, lng, name, landmarkAddress, tokenWorth, index }) => {
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
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {name}
              </Typography>
              <Typography variant="h5" component="h2">
                {tokenWorth} TC 💰
              </Typography>
              <Typography variant="body2" component="p">
                [{lat}, {lng}]
              </Typography>
            </CardContent>
          </Popup>
        </Card>
      )}
    </div>
  );
};

export default MapElement;
