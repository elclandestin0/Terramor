import React from "react";

// our landmark Factory deployed on Rinkeby
import LandmarkFactory from "../ethereum/landmarkFactory";

// next.js imports
import dynamic from "next/dynamic";

// terramor component imports without SSR rendering
const Map = dynamic(() => import("../components/Map"), {
  loading: () => "Loading...",
  ssr: false,
});

const Layout = dynamic(() => import("../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

const Page = ({ landmarks }) => {
  return (
    <Layout>
      <Map landmarks={landmarks} />
    </Layout>
  );
};

export default Page;

// call landmarks from our contract first and inject it into our page
export async function getServerSideProps() {
  const landmarks = await LandmarkFactory.methods.landmarks().call();
  return { props: { landmarks } };
}
