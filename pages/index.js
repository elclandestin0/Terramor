import React, { useState } from "react";

// our landmark Factry deployed on Rinkeby
import landmarkFactory from "../ethereum/landmarkFactory";

// dynamic import helps with CSR for our map
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  loading: () => "Loading...",
  ssr: false,
});

const Page = ({ landmarks }) => {
  return (
    <div>
      <Map />
    </div>
  );
};

export default Page;

export async function getServerSideProps() {
  const landmarks = await landmarkFactory.methods.landmarks().call();
  return { props: { landmarks } };
}
