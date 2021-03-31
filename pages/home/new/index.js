// react imports
import React, { useState } from "react";
import Layout from "../../../components/Layout";

// ethereum imports
import landmarkFactory from "../../../ethereum/landmarkFactory";
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
}));

const AddLandmark = () => {
  // styles
  const classes = useStyles();

  // states
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [token, setToken] = useState(0);

  const addLandmark = async () => {
    console.log("attempting to add landmark");
    const accounts = await web3.eth.getAccounts();
    const latLng = `[${latitude}, ${longitude}]`;
    try {
      const landmark = await landmarkFactory.methods
        .createLandmark(name, latLng, address, img, token)
        .send({ from: accounts[0] });
      console.log("Landmark added!");
      console.log(landmark.options.address);
    } catch (err) {
      console.log(err);
    }
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
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default AddLandmark;
