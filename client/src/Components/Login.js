import React, {useState} from 'react'
import {createUseStyles} from "react-jss";
import {
    belowBreakpoint, blue, breakpoint2,
    breakpoint4,
    center,
    cornerRadius,
    lightOrange,
    LuckiestGuy, red, textShadow,
    white,
} from "../mixins";
import RoundedInput from "./RoundedInput";
import { NavLink } from "react-router-dom";

export const loginStyles = {
    background: {
        minHeight: "100vh",
        padding: "40px",
        ...belowBreakpoint(breakpoint4, {
            padding: "20px",
        }),
        backgroundColor: lightOrange,
        ...center,
    },
    paper: {
        backgroundColor: red,
        borderRadius: cornerRadius,
        width: "40%",
        padding: "40px 20px",
        flexDirection: "column",
        ...center,
        ...belowBreakpoint(breakpoint2, {
            width: "70%",
        }),
        ...belowBreakpoint(breakpoint4, {
            width: "90%",
        }),
        overflow: "hidden",
    },
    title: {
        fontFamily: LuckiestGuy,
        fontSize: "60px",
        color: white,
        margin: "30px",
        textShadow: textShadow,
    },
    input: {
        color: white,
        fontFamily: LuckiestGuy,
        textShadow: textShadow,
        margin: "20px 0px",
        width: "400px",
        ...belowBreakpoint(breakpoint4, {
            width: "200px",
        }),
    },
    button: {
        margin: "35px 0 15px 0",
        width: "200px",
        borderRadius: "15px",
        backgroundColor: blue,
        color: white,
        fontFamily: LuckiestGuy,
        boxShadow: textShadow,
        textShadow: textShadow,
        height: "30px",
        ...center,
        paddingTop: "3px",
        cursor: "pointer",
    },
    textButton: {
        color: white,
        fontFamily: LuckiestGuy,
        textShadow: textShadow,
        cursor: "pointer",
    }
};

const useStyles = createUseStyles(loginStyles);

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={classes.background}>
            <div className={classes.paper}>
                <div className={classes.title}>LOGIN</div>
                <div className={classes.input}>
                    <div>EMAIL</div>
                    <RoundedInput value={email} setValue={setEmail}  />
                </div>
                <div className={classes.input}>
                    <div>PASSWORD</div>
                    <RoundedInput value={password} setValue={setPassword} />
                </div>
                <div className={classes.button}>
                    LOGIN
                </div>
                <NavLink to={'/register'} className={classes.textButton}>REGISTER</NavLink>
            </div>
        </div>
    )
}

export default Login;