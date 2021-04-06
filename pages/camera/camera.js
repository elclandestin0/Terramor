import React, { useState } from "react";

// Material UI imports
import { Card, CardContent, CardHeader, Container } from "@material-ui/core";

// Ethereum imports
import Landmark from "../../ethereum/landmark";
import web3 from "../../ethereum/web3";

// terramor imports without SSR rendering
const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// next.js imports
import dynamic from "next/dynamic";

// QR Reader import with SSR disabled
const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => "loading ...",
  ssr: false,
});

// global variable to assist the user into not scanning
//  twice in a row
let scanned = false;

const Camera = () => {
  const [result, setResult] = useState("");
  // if scan is handled well, we send the data to scanLandmark()
  const handleScan = async (data) => {
    if (data && !scanned) {
      // we parse the data from the QR code and assign them into
      // variables
      const parsedData = JSON.parse(data);
      const name = parsedData[0];
      const latLng = parsedData[1];
      const landmarkAddress = parsedData[2];
      const tokenWorth = parseInt(parsedData[3]);
      const salt = parseInt(parsedData[4]);
      const address = parsedData[6];
      const landmark = Landmark(address);
      scanned = true;
      setResult("verifying QR code ... please wait!");
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
      // get our account from MetaMask first ...
      const accounts = await web3.eth.getAccounts();

      // .. then scan the landmark using that account
      await landmark.methods
        .scanLandmark(landmarkName, latLng, landmarkAddress, tokenWorth, salt)
        .send({ from: accounts[0], gas: "5555555" })
        .then(() => {
          // if it's successful, the landmark transfers coins
          // to the user.
          setResult("You earned " + tokenWorth + " TerraCoin!");
          scanned = false;
        });
    } catch (err) {
      scanned = false;
      console.log(err);
      setResult("Failed");
    }
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
            <CardContent>{result}</CardContent>
          </Card>
        </Container>
      </div>
    </Layout>
  );
};

export default Camera;
