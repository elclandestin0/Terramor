import React, { useState } from "react";

// Material UI imports
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@material-ui/core";

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

  // if scan is handled well, we send the data to scanLandmark()
  const handleScan = async (data) => {
    if (data) {
      setResult(data);
      const parsedData = JSON.parse(data);
      const name = parsedData[0];
      const latLng = parsedData[1];
      const landmarkAddress = parsedData[2];
      const img = parsedData[3];
      const tokenWorth = parseInt(parsedData[4]);
      const salt = parseInt(parsedData[5]);
      const address = parsedData[6];
      const landmark = Landmark(address);
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
      const manager = await landmark.methods.manager().call();
      console.log(accounts[0]);
      console.log(manager);
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
          console.log("about to transfer");
          await landmark.methods
            .transferFrom(manager, accounts[0], tokenWorth)
            .send({ from: manager, gas: "5555555" });
        })
        .then(() => {
          setResult("You earned " + tokenWorth + " TerraCoin!");
        });
    } catch (err) {
      console.log(err);
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
