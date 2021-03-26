import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Container>
      <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.2.0/mapbox-gl.css" rel="stylesheet"/>
      </Head>
      <Component {...pageProps} />
    </Container>
  );
};

export default MyApp;
