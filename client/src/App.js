import React from 'react';
import './App.css'
import {YanoneKaffeesatz} from "./mixins";
import { createUseStyles } from 'react-jss';
import {Switch, Route} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Game from "./Components/Game";
import PrivateRoute from "./Components/PriveteRoute";

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
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/game" component={Game} />
                <PrivateRoute path="/" component={Dashboard} />
            </Switch>
        </div>
    );
}

export default App;
