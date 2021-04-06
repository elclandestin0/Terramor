import React, { useEffect, useState } from "react";

// Terramor imports
const Layout = dynamic(() => import("../../components/Layout"), {
  loading: () => "Loading...",
  ssr: false,
});

// Ethereum imports
import web3 from "../../ethereum/web3";
import terraCoin from "../../ethereum/terraCoin";
import LandmarkFactory from "../../ethereum/landmarkFactory";
import { Link } from "../../routes";

// next.js imports
import dynamic from "next/dynamic";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
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
  Button,
  Container,
  Typography,
} from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  button: {
    textAlign: "center",
    marginBottom: "100px"
  }
}));

const Home = ({ landmarks }) => {
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
      console.log(balance);
      setBalance(balance);
    };
    getAccount();
    getBalance();
  }, []);

  // MAY DELETE LATER
  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  // all the Landmarks that can be discovered are mapped here
  const renderLandmarkList = landmarks.map((landmark, index) => {
    const name = landmark[0];
    const landmarkAddress = landmark[2];
    const img = landmark[3];
    const tokenWorth = landmark[4];
    return (
      <div>
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={img} />
          </ListItemAvatar>
          <ListItemText
            primary={name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {tokenWorth} TerraCoins 💰
                </Typography>
                {" - " + landmarkAddress}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </div>
    );
  });

  return (
    <Layout>
      <Container>
        <Card>
          <CardHeader
            title="Home"
            subheader="Account information and Landmarks that can be discovered"
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
              {balance} TerraCoins 💰
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader title="List of Landmarks" />
          <List className={classes.root}>{renderLandmarkList}</List>
        </Card>
        <Card>
          <CardContent className={classes.button}>
            <Link route={"/home/new"}>
              <Button variant="contained" color="primary">
                Add Landmark
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};

export default Home;

// get landmarks from ethereum on the  server side before the
// client renders
export async function getServerSideProps() {
  const landmarks = await LandmarkFactory.methods.landmarks().call();
  return { props: { landmarks } };
}
