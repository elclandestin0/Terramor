import React, { useState } from "react";

// next.js imports
import dynamic from "next/dynamic";

// QR Reader import with SSR disabled
const QrReader = dynamic(() => import("react-qr-reader"), {
  loading: () => "loading ...",
  ssr: false,
});

const Camera = () => {
  const [result, setResult] = useState("");
  const handleScan = (data) => {
    if (data) {
      setResult(data);
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
        style={{ width: "100vw", height: "100vh" }}
      />
      <p>{result}</p>
    </div>
  );
};

export default Camera;
