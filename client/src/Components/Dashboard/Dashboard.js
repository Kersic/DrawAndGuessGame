import React, {useState} from 'react'
import {createUseStyles} from "react-jss";
import {
    belowBreakpoint, black,
    blue, breakpoint2,
    breakpoint4, center, classNames,
    cornerRadius, lightOrange,
    LuckiestGuy,
    orange,
    red, shadowAllDirections, shadowButtonRight, textShadow,
    white
} from "../../mixins";
import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import RoomForm from "./RoomForm";
import useRooms from "../../Hooks/useRooms";

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
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        ...belowBreakpoint(breakpoint2, {
            gridTemplateColumns: "1fr 1fr ",
        }),
        ...belowBreakpoint(breakpoint4, {
            gridTemplateColumns: "auto ",
        }),
        marginBottom: "20px",
    },
    gameBox: {
        backgroundColor: blue,
        margin: "25px",
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
        overflow: "auto",
    },
    roomName: {
        fontFamily: LuckiestGuy,
        fontSize: "30px",
        color: white,
        textShadow: textShadow,
        textTransform: "uppercase"
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
    logout: {
        backgroundColor: orange,
        ...center,
        fontFamily: LuckiestGuy,
        color: white,
        boxShadow: shadowButtonRight,
        paddingTop: "2px",
        fontSize: "15px",
        margin: "20px 20px 0 0",
        width: "30px",
        height: "30px",
        borderRadius: "20px",
        alignSelf: "flex-end",
        cursor: "pointer"
    },
    roomUsers: {
        fontFamily: LuckiestGuy,
        fontSize: "20px",
        color: white,
        textShadow: textShadow,
        margin: "0 20px"
    },
    disabled: {
        cursor: "default",
        opacity: "0.5",
        "&:hover": {
            boxShadow: "1px 1px 1px gray",
        }
    }
});


const Dashboard = () => {
    const classes = useStyles();
    const {logout} = useAuth();
    const colors = [orange, red, blue];
    const [addingNewRoom, setAddingNewRoom] = useState(false);
    const {rooms} = useRooms();


    return (
        <div className={classes.background} >
            <div className={classes.paper}>
                <div className={classes.logout} onClick={logout}>X</div>
                <div className={classes.title}>DRAW AND GUESS</div>

                <div className={classes.gamesWrapper}>
                    <div className={classes.gameBox} onClick={()=> !addingNewRoom ? setAddingNewRoom(true) : null}>
                        <RoomForm setAddingNewRoom={setAddingNewRoom} addingNewRoom={addingNewRoom} />
                    </div>
                    {rooms.map((room, index) => (
                        <NavLink exact to={`/waiting-lobby?id=${room.id}`} key={room.id} style={{backgroundColor: colors[index % colors.length]}} className={classes.gameBox}>
                            <div className={classes.roomName}>{room.name}</div>
                            <div className={classes.roomUsers}>{room.users.length + "/8" }</div>
                            <div className={classNames(classes.roomJoinButton, room.hasStarted ? classes.disabled : "")}>Join </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Dashboard;