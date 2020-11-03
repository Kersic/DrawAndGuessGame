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
        minHeight: "100%",
    },
});

function App() {
    const classes = useStyles();
    return (
        <div className={classes.app}>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/" component={Dashboard} />
                <Route path="/game" component={Game} />
            </Switch>
        </div>
    );
}

export default App;
