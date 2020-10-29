import React from 'react'
import {createUseStyles} from "react-jss";
import {
    aboveBreakpoint, belowBreakpoint, blue,
    breakpoint2,
    breakpoint4,
    cornerRadius,
    lightOrange,
    orange, red, shadowAllDirections, shadowTopLeft,
    white,
} from "../mixins";
import RoundedInput from "./RoundedInput";

const chatWrapperSize = 50;

const useStyles = createUseStyles({
    background: {
        backgroundColor: lightOrange,
        minHeight: "100vh",
        display: "grid",
        ...aboveBreakpoint(breakpoint4, {
            gridTemplateColumns: "7fr 3fr",
        }),
        ...aboveBreakpoint(breakpoint2, {
            gridTemplateColumns: "8fr 2fr",
        }),


    },
    paper: {
        margin: "40px 0 40px 40px",
        ...belowBreakpoint(breakpoint4, {
            margin: "20px 20px 0 20px",
            borderBottomLeftRadius: 0,
            borderTopRightRadius: cornerRadius,
        }),
        backgroundColor: white,
        borderTopLeftRadius: cornerRadius,
        borderBottomLeftRadius: cornerRadius,
    },
    rightColumn: {
        boxShadow: shadowTopLeft,
        display: "grid",
        gridTemplateRows: `auto ${chatWrapperSize}px auto`,
        backgroundColor: orange,
    },
    chatWrapper: {
        backgroundColor: orange,
    },
    chatInputWrapper:{
        backgroundColor: blue,
        boxShadow: shadowAllDirections,
        zIndex: 5,
        borderTopLeftRadius: cornerRadius,
        borderBottomLeftRadius: cornerRadius,
        ...aboveBreakpoint(breakpoint4, {
            marginLeft: `-${20}px`,
        }),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "20px",
    },
    sendButton: {
        borderRadius: cornerRadius,
        backgroundColor: white,
        width: "30px",
        margin: " 0 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    scoreWrapper: {
        marginTop: `-${chatWrapperSize / 2}px`,
        backgroundColor: red,
    }
});


const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <div className={classes.paper}>

            </div>
            <div className={classes.rightColumn}>
                <div className={classes.chatWrapper}>

                </div>
                <div className={classes.chatInputWrapper}>
                    <RoundedInput />
                    <div className={classes.sendButton}>
                        ᗌ
                    </div>
                </div>
                <div className={classes.scoreWrapper}>

                </div>
            </div>
        </div>
    )
}

export default Dashboard;