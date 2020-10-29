import React from 'react';
import {createUseStyles} from "react-jss";
import {black, white} from "../mixins";

const useStyles = createUseStyles({
    roundedInput: {
        "-webkit-border-radius": "20px",
        "-moz-border-radius": "20px",
        borderRadius: "20px",
        border: "1px solid " + white,
        color: black,
        width: "-webkit-fill-available",
        height: "30px",
        paddingLeft: "10px",
        "&:focus": {
            outline: "none",
        }
    },
});

export const RoundedInput = () => {
    const classes = useStyles();
    return (
        <input className={classes.roundedInput} placeholder={"Write answer..."}/>
    )
}

export default RoundedInput;