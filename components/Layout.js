import React, { useState, useEffect } from "react";

// next.js imports
import { Link } from "../routes";

// ethereum imports
import web3 from "../ethereum/web3";
import terraCoin from "../ethereum/terraCoin";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Typography,
} from "@material-ui/core/";
import MapIcon from "@material-ui/icons/Map";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import RoomIcon from "@material-ui/icons/Room";

// styles for this page
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

const Layout = (props) => {
  // states for our account and balance
  const [account, setAccount] = useState("0x000000000000");
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

  const truncate = (str) => {
    return str.length > 10 ? str.substring(0, 10) + "..." : str;
  };

  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="body1" className={classes.title}>
            {truncate(account)}
          </Typography>
          <Typography variant="body1">{balance} TC 💵 </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Link route="/">
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MapIcon />
            </IconButton>
          </Link>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <Link route="/camera/">
              <CameraAltIcon />
            </Link>
          </Fab>
          <div className={classes.grow} />
          <Link route={"/landmarks/"}>
            <IconButton edge="end" color="inherit">
              <RoomIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
