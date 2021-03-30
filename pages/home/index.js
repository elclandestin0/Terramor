import React, { useEffect, useState } from "react";
import web3 from "../../ethereum/web3";
import terraCoin from "../../ethereum/terraCoin";

// terramor imports
const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// next.js imports
import dynamic from "next/dynamic";

// Material UI imports
import { Container, Typography } from "@material-ui/core";

const Home = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function getHomeInformation() {
      let accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      let balance = await terraCoin.methods.balanceOf(account).call();
      setBalance(balance);
    }

    getHomeInformation();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h4" component="h2">
          Home
        </Typography>
        <Typography variant="h5" component="h2">
          Account: {truncate(account)}
        </Typography>
        <Typography variant="h5" component="h2">
          Balance: {balance}
        </Typography>
      </Container>
    </Layout>
  );
};

export default Home;
