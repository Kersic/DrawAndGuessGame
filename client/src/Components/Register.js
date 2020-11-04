import React, {useState} from 'react'
import {createUseStyles} from "react-jss";
import RoundedInput from "./RoundedInput";
import {loginStyles} from "./Login";
import {NavLink} from "react-router-dom";

const useStyles = createUseStyles(loginStyles);

const Login = () => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className={classes.background}>
            <div className={classes.paper}>
                <div className={classes.title}>REGISTER</div>
                <div className={classes.input}>
                    <div>EMAIL</div>
                    <RoundedInput value={email} setValue={setEmail}  />
                </div>
                <div className={classes.input}>
                    <div>USERNAME</div>
                    <RoundedInput value={email} setValue={setEmail}  />
                </div>
                <div className={classes.input}>
                    <div>PASSWORD</div>
                    <RoundedInput value={password} setValue={setPassword} />
                </div>
                <div className={classes.input}>
                    <div>REPEAT PASSWORD</div>
                    <RoundedInput value={password} setValue={setPassword} />
                </div>
                <div className={classes.button}>
                    REGISTER
                </div>
                <NavLink to={'/login'} className={classes.textButton}>LOGIN</NavLink>
            </div>
        </div>
    )
}

export default Login;