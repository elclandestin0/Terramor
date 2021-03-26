import React from "react";
import landmarkFactory from "../ethereum/landmarkFactory";

const TestPage = ({landmarks}) => {
    const renderLandmarks = () => {
        console.log(landmarks);
    }
    return (<div>Yo{renderLandmarks()}</div>)
}

export async function getServerSideProps () {
    const landmarks = await landmarkFactory.methods.landmarks().call();
    return {props: {landmarks}};
}

export default TestPage;