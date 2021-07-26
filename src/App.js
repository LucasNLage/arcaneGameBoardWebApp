import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Theme from "../src/theme/theme.js"
import Login from "./components/login/login.js"
import MainPage from "./components/mainPage/mainpage.js"
import GamePage from "./components/gamepage/gamepage.js"
import AIGamePage from "./components/aiGamepage/sfGamepage"
import CustomGamePage from "./components/customGamepage/customGamepage"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { w3cwebsocket as W3WebSocket } from 'websocket';

import './App.css';


// Websocket URL
// const URL = "ws:\\127.0.0.1:8000"
// const URL = "wss:\\agbackend.herokuapp.com/"
const URL = "ws:\\192.168.1.75:8000"

// Establishes connection to websocket
const client = new W3WebSocket(URL);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100vh",
    overflowY: "hidden"
  },
}));


function App() {

  useEffect(() => {
    client.onopen = () => {
      console.log("Websocket Client Connected")
    }
    client.onmessage = (message) => {
      console.log("message was:", message)
      console.log("\n\nmessage data was:", message.data)
    }
  }, [])

  const classes = useStyles();


  return (
    <ThemeProvider theme={Theme} >
      <Router basename="/">
        <Switch>
          <Route exact path="/">
            <div className={classes.root}>
              <Login />
            </div>
          </Route>
          <Route path="/main">
            <div className={classes.root}>
              <MainPage />
            </div>
          </Route>
          <Route path="/gamepage">
            <div className={classes.root}>
              <GamePage />
            </div>
          </Route>
          <Route path="/aigamepage">
            <div className={classes.root}>
              <AIGamePage />
            </div>
          </Route>
          <Route path="/customgamepage">
            <div className={classes.root}>
              <CustomGamePage />
            </div>
          </Route>
        </Switch>
      </Router>

    </ThemeProvider>
  );
}

export default App;
