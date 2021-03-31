import React, { useEffect, useState } from "react";
import web3 from "../../ethereum/web3";
import terraCoin from "../../ethereum/terraCoin";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
// terramor imports
const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// next.js imports
import dynamic from "next/dynamic";

// Material UI imports
import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const Home = () => {
  const classes = useStyles();

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // get accounts
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    };
    // get balance
    const getBalance = async () => {
      const accounts = await web3.eth.getAccounts();
      const balance = await terraCoin.methods.balanceOf(accounts[0]).call();
      setBalance(balance);
    };
    getAccount();
    getBalance();
  }, []);

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  return (
    <Layout>
      <Container>
        <Card>
          <CardHeader
            title="Home"
            subheader="Account information and landmarks discovered"
          />
        </Card>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Account
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {account}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Balance
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {balance} TC 💰
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default Home;
