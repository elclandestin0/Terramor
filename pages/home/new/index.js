// react imports
import React, { useState } from "react";
import { QRCode } from "react-qr-svg";

// next.js imports
import dynamic from "next/dynamic";

// terramor imports
const Layout = dynamic(() => import("../../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// ethereum imports
import LandmarkFactory from "../../../ethereum/landmarkFactory";
import Landmark from "../../../ethereum/landmark";
import web3 from "../../../ethereum/web3";

// Material UI imports
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  Container,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// styles
const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: "100%",
    marginTop: "10px",
  },
  center: {
    textAlign: "center",
  },
  button: {
    marginTop: "20px",
  },
  qrCode: {
    marginTop: "30px",
    marginBottom: "60px",
  },
}));

const AddLandmark = () => {
  // styles
  const classes = useStyles();

  // states for landmark creation
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [token, setToken] = useState(0);

  // state for summary returned
  const [summary, setSummary] = useState("");

  // here we add the landmark after setting the form values.
  // afterwards, when it is successful, we call the returnSummary()
  // function in order to construct our QR Code that we need to use.
  const addLandmark = async () => {
    console.log("attempting to add landmark");
    const accounts = await web3.eth.getAccounts();
    const latLng = `[${latitude}, ${longitude}]`;
    try {
      await LandmarkFactory.methods
        .createLandmark(name, latLng, address, img, token)
        .send({ from: accounts[0] })
        .then((landmarkAddress) => {
          const address = landmarkAddress.events[0].address;
          const landmark = Landmark(address);
          generateQRCode(landmark, accounts[0]);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const generateQRCode = async (landmark, account) => {
    await landmark.methods
      .returnSummary()
      .call({ from: account })
      .then((q) => {
        setSummary(JSON.stringify(q));
        console.log("summary returned! " + qrCode);
        console.log(q);
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <Layout>
      <Container>
        <Card>
          <CardHeader
            title="Add Landmark"
            subheader="Only the manager of the Landmark Factory contract can add Landmarks!"
          />
          <CardContent className={classes.center}>
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={classes.fullWidth}
              id="outlined-basic"
              label="Landmark Name"
              variant="outlined"
            />
            <TextField
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
              }}
              className={classes.fullWidth}
              type="Number"
              id="outlined-basic"
              label="Latitude"
              variant="outlined"
            />
            <TextField
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
              }}
              className={classes.fullWidth}
              type="Number"
              id="outlined-basic"
              label="Longitude"
              variant="outlined"
            />
            <TextField
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              className={classes.fullWidth}
              id="outlined-basic"
              label="Landmark Address"
              variant="outlined"
            />
            <TextField
              value={img}
              onChange={(e) => {
                setImg(e.target.value);
              }}
              className={classes.fullWidth}
              id="outlined-basic"
              label="Image URL"
              variant="outlined"
            />
            <TextField
              value={token}
              onChange={(e) => {
                setToken(e.target.value);
              }}
              className={classes.fullWidth}
              type="Number"
              id="outlined-basic"
              label="Token Worth"
              variant="outlined"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={addLandmark}
            >
              CREATE
            </Button>
            {summary && (
              <QRCode
                className={classes.qrCode}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 256 }}
                value={summary}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default AddLandmark;
