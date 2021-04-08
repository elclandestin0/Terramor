// react imports
import React, { useState } from "react";
import { QRCode } from "react-qr-svg";

// next.js imports
import dynamic from "next/dynamic";

// terramor imports without SSR rendering
const Layout = dynamic(() => import("../../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// ethereum imports
import LandmarkFactory from "../../../ethereum/landmarkFactory";
import terraCoin from "../../../ethereum/terraCoin";
import Landmark from "../../../ethereum/landmark";
import web3 from "../../../ethereum/web3";

// Material UI imports
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  Container,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
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
    marginBottom: "80px",
  },
  formStatus: {
    marginTop: "10px",
  },
}));

const AddLandmark = () => {
  const classes = useStyles();

  // this will be assigned to the created landmark
  let landmarkToAdd;

  // states for landmark creation
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");
  const [token, setToken] = useState(0);

  // states for summary, loading, error and message
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  // here we add the landmark after setting the form values.
  // afterwards, when it is successful, we call the returnSummary()
  // function in order to construct our QR Code that we need to use.
  const addLandmark = async () => {
    const accounts = await web3.eth.getAccounts();
    const latLng = `[${latitude}, ${longitude}]`;
    setLoading(true);
    setSummary("");
    setSuccess("");
    setError("");
    try {
      await LandmarkFactory.methods
        .createLandmark(name, latLng, address, img, token)
        .send({ from: accounts[0] })
        .then(async (data) => {
          // the address that gets returned is made into a new Landmark and
          // assigned to landmarkToAdd so that we can generate the QR code
          const address = data.events[0].address;
          const landmark = Landmark(address);
          console.log("transferign 10 coins");
          landmarkToAdd = landmark;
          console.log("");
          setSuccess(
            "Landmark " +
              truncate(address) +
              " added! Now transfering 10 TerraCoins to this Landmark..."
          );
          setError("");
          // sending 10 coins to this landmark ...
          await terraCoin.methods
            .transfer(landmark.options.address, token * 10)
            .send({ from: accounts[0] });
        })
        .then(() => {
          console.log("about to generate qr code");
          generateQRCode(landmarkToAdd, accounts[0]);
        });
    } catch (err) {
      console.log(err.message);
      setError(err.message);
      setLoading(false);
      setSuccess("");
    }
  };

  // we generate the QR code right after our landmark is successfully
  // added and our coins are transfered.  This will help the creator
  // print out the QR code and place  it in the locations for the user
  // to discover.
  const generateQRCode = async (landmark, account) => {
    await landmark.methods
      .returnSummary()
      .call({ from: account })
      .then((q) => {
        setSummary(JSON.stringify(q));
        setSuccess("QR Code generated!");
        setError("");
      })
      .catch((err) => {
        setError(err.message);
        setSuccess("");
        return err;
      });
    setLoading(false);
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
            {!loading && (
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={addLandmark}
              >
                CREATE
              </Button>
            )}
            {loading && (
              <div>
                <CircularProgress className={classes.formStatus} />
              </div>
            )}
            {error && (
              <Alert severity="error" className={classes.formStatus}>
                {" "}
                {error}{" "}
              </Alert>
            )}
            {success && (
              <Alert severity="success" className={classes.formStatus}>
                {" "}
                {success}{" "}
              </Alert>
            )}
            {summary && (
              <QRCode
                className={classes.qrCode}
                bgColor="#FFFFFF"
                fgColor="#000000"
                level="Q"
                style={{ width: 512 }}
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
