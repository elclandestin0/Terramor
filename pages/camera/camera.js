import React, { useState } from "react";

// Material UI imports
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

// styles
const useStyles = makeStyles((theme) => ({
  center: {
    textAlign: "center",
  },
}));

// Ethereum imports
import Landmark from "../../ethereum/landmark";
import web3 from "../../ethereum/web3";

// next.js imports
import dynamic from "next/dynamic";

// terramor imports without SSR rendering
const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// QR Reader import with SSR disabled
const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => "loading ...",
  ssr: false,
});

// global variable to assist the user into not scanning
// twice in a row
let scanned = false;

const Camera = () => {
  // styles
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // if scan is handled well, we send the data to scanLandmark()
  const handleScan = (data) => {
    if (data && !scanned) {
      // we parse the data from the QR code and assign them into
      // variables
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      const name = parsedData[0];
      const latLng = parsedData[1];
      const landmarkAddress = parsedData[2];
      const tokenWorth = parseInt(parsedData[3]);
      const salt = parseInt(parsedData[4]);
      const address = parsedData[5];
      const landmark = Landmark(address);
      scanned = true;
      scanLandmark(landmark, name, latLng, landmarkAddress, tokenWorth, salt);
    }
  };

  // here we scan the landmark at the contract
  const scanLandmark = async (
    landmark,
    landmarkName,
    latLng,
    landmarkAddress,
    tokenWorth,
    salt
  ) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      // get our account from MetaMask first ...
      const accounts = await web3.eth.getAccounts();
      // .. then scan the landmark using that account
      await landmark.methods
        .scanLandmark(landmarkName, latLng, landmarkAddress, tokenWorth, salt)
        .send({ from: accounts[0], gas: "5555555" })
        .then(() => {
          // if it's successful, the landmark transfers coins
          // to the user.
          setSuccess("You earned " + tokenWorth + " TerraCoin!");
          setError("");
          scanned = false;
        });
    } catch (err) {
      scanned = false;
      console.log(err);
      setSuccess("");
      setError(err.message);
    }
    setLoading(false);
  };

  // error handling if QR code didn't work
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Layout>
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <Container>
          <Card>
            <CardHeader
              title="Scan Landmark's QR Code"
              subheader="Scan the QR Code of a Landmark"
            />
            {loading && (
              <CardContent className={classes.center}>
                <div>
                  <CircularProgress />
                </div>
              </CardContent>
            )}
            {error && (
              <CardContent className={classes.center}>
                <Alert severity="error">{error}</Alert>
              </CardContent>
            )}
            {success && (
              <CardContent className={classes.center}>
                <Alert severity="success">{success}</Alert>
              </CardContent>
            )}
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default Camera;
