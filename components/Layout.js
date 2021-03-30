import React from "react";

// next.js imports
import { Link } from "../routes";

// Material UI imports
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MapIcon from "@material-ui/icons/Map";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  return (
    <div>
      {props.children}
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Link route="/">
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MapIcon />
            </IconButton>
          </Link>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <CameraAltIcon />
          </Fab>
          <div className={classes.grow} />
          <Link route={"/home/"}>
            <IconButton edge="end" color="inherit">
              <HomeIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
