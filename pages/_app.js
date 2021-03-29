import App from "next/app";
import Head from "next/head";
import React from "react";

// all styles
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
