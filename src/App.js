import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Theme from "../src/theme/theme.js"
import Login from "./components/login/login.js"
import MainPage from "./components/mainPage/mainpage.js"
import GamePage from "./components/gamepage/gamepage.js"
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100vh"
  },
}));


function App() {


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
        </Switch>
      </Router>

    </ThemeProvider>
  );
}

export default App;
