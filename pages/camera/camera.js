import React, { useState } from "react";

// Material UI imports
import { Card, CardContent, CardHeader, Container } from "@material-ui/core";

// Ethereum imports
import Landmark from "../../ethereum/landmark";
import web3 from "../../ethereum/web3";
import terraCoin from "../../ethereum/terraCoin";

// next.js imports
import dynamic from "next/dynamic";

// QR Reader import with SSR disabled
const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => "loading ...",
  ssr: false,
});

const Camera = () => {
  const [result, setResult] = useState("");
  let scanned = false;

  // if scan is handled well, we send the data to scanLandmark()
  const handleScan = async (data) => {
    if (data && !scanned) {
      const parsedData = JSON.parse(data);
      const name = parsedData[0];
      const latLng = parsedData[1];
      const landmarkAddress = parsedData[2];
      const img = parsedData[3];
      const tokenWorth = parseInt(parsedData[4]);
      const salt = parseInt(parsedData[5]);
      const address = parsedData[6];
      const landmark = Landmark(address);
      scanned = true;
      setResult("verifying QR code ... please wait!");
      scanLandmark(
        landmark,
        name,
        latLng,
        landmarkAddress,
        img,
        tokenWorth,
        salt
      );
    }
  };

  // here we scan the landmark at the contract
  const scanLandmark = async (
    landmark,
    landmarkName,
    latLng,
    landmarkAddress,
    img,
    tokenWorth,
    salt
  ) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await landmark.methods
        .scanLandmark(
          landmarkName,
          latLng,
          landmarkAddress,
          img,
          tokenWorth,
          salt
        )
        .send({ from: accounts[0], gas: "5555555" })
        .then(async () => {
          setResult(
            "About to transfer " +
              tokenWorth +
              " coin to account: " +
              accounts[0]
          );
        })
        .then(() => {
          setResult("You earned " + tokenWorth + " TerraCoin!");
          scanned = false;
        });
    } catch (err) {
      scanned = false;
      console.log(err);
      setResult("Failed");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
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
  );
};

export default Camera;
