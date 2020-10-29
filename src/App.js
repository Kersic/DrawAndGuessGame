import React from 'react';
import './App.css'
import {YanoneKaffeesatz} from "./mixins";
import { createUseStyles } from 'react-jss';
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Game from "./Components/Game";

const useStyles = createUseStyles({
    app: {
        fontFamily: YanoneKaffeesatz,
        fontSize: "20px",
    },
});

function App() {
    const classes = useStyles();
    return (
        <div className={classes.app}>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route exact path="/game">
                    <Game />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
