import React, { useState } from "react";

// our landmark Factry deployed on Rinkeby
import landmarkFactory from "../ethereum/landmarkFactory";

// dynamic import helps with CSR for our map
import dynamic from "next/dynamic";

// load the map component without SSR
const Map = dynamic(() => import("../components/Map"), {
  loading: () => "Loading...",
  ssr: false,
});

const Page = ({ landmarks }) => {
  return (
    <div>
      <Map landmarks={landmarks} />
    </div>
  );
};

export default Page;

// call landmarks from our contract first and inject it into our page
export async function getServerSideProps() {
  const landmarks = await landmarkFactory.methods.landmarks().call();
  return { props: { landmarks } };
}
