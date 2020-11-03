import React, {useState} from 'react'
import {createUseStyles} from "react-jss";
import {
    belowBreakpoint, black,
    blue, breakpoint2,
    breakpoint4, classNames,
    cornerRadius, lightOrange,
    LuckiestGuy,
    orange,
    red, shadowAllDirections, shadowButtonRight, textShadow,
    white
} from "../mixins";
import RoundedInput from "./RoundedInput";
import { NavLink } from "react-router-dom";


const useStyles = createUseStyles({
    background: {
        minHeight: "100vh",
        padding: "40px",
        ...belowBreakpoint(breakpoint4, {
            padding: "20px",
        }),
        backgroundColor: lightOrange,
    },
    paper: {
        backgroundColor: white,
        minHeight: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: cornerRadius,
        boxShadow: shadowAllDirections,
        textAlign: "center",
    },
    title: {
        fontFamily: LuckiestGuy,
        fontSize: "90px",
        color: red,
        margin: "40px",
        textShadow: textShadow,
        ...belowBreakpoint(breakpoint4, {
            margin: "20px",
            marginTop: "40px",
            fontSize: "60px",
        })
    },
    gamesWrapper: {
        width: "90%",
        display: "grid",
        gridTemplateColumns: "auto auto auto auto",
        ...belowBreakpoint(breakpoint2, {
            gridTemplateColumns: "auto auto ",
        }),
        ...belowBreakpoint(breakpoint4, {
            gridTemplateColumns: "auto ",
        }),
        marginBottom: "20px",
    },
    gameBox: {
        backgroundColor: blue,
        margin: "10%",
        height: "200px",
        borderRadius: cornerRadius,
        display: "flex",        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        boxShadow: textShadow,
        ...belowBreakpoint(breakpoint2, {
            margin: "7%",
        }),
        ...belowBreakpoint(breakpoint4, {
            margin: "5%",
        }),
        cursor: "pointer",
        textDecoration: "none",
        color: black,
    },
    roomName: {
        fontFamily: LuckiestGuy,
        fontSize: "30px",
        color: white,
        textShadow: textShadow,
    },
    roomJoinButton: {
        backgroundColor: white,
        padding: "5px 20px",
        borderRadius: "15px",
        boxShadow: textShadow,
        "&:hover": {
            boxShadow: "1px 1px 1px gray",
        }
    },
    addRoom: {
        fontSize: "70px",
    },
});


const Dashboard = () => {
    const classes = useStyles();
    const [userName, setUsername] = useState("");
    const colors = [orange, red, blue];
    const rooms = [
        {
            id: 1,
            name: 'Room 1',
        },
        {
            id: 2,
            name: 'Room 2',
        },
        {
            id: 3,
            name: 'Room 3',
        },
        {
            id: 4,
            name: 'Room 4',
        },
        {
            id: 5,
            name: 'Room 5',
        },
    ]

    return (
        <div className={classes.background} >
            <div className={classes.paper}>
                <div className={classes.title}>DRAW AND GUESS</div>
                <div>
                    <RoundedInput value={userName} setValue={setUsername} placeholder={"Username..."} />
                </div>

                <div className={classes.gamesWrapper}>
                    <div className={classes.gameBox}>
                        <div className={classNames(classes.roomName, classes.addRoom)}>
                            +
                        </div>
                    </div>
                    {rooms.map((room, index) => (
                        <NavLink exact to={`/game?id=${room.id}&name=${userName}`} key={room.id} style={{backgroundColor: colors[index % colors.length]}} className={classes.gameBox}>
                            <div className={classes.roomName}>{room.name}</div>
                            <div className={classes.roomJoinButton}>Join </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Dashboard;