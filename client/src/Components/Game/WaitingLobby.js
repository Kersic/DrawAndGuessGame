import React, {useEffect, useState} from 'react';
import BackgroundWrapper from "../BackgroundWrapper";
import {createUseStyles} from "react-jss";
import {blue, classNames, cornerRadius, LuckiestGuyFont, orange, red, textShadow, white} from "../../mixins";
import {useHistory} from "react-router-dom";
import useRooms from "../../Hooks/useRooms";
import queryString from 'query-string';
import io from "socket.io-client";
import {serverURL} from "../../config";
import useAuth from "../../Hooks/useAuth";

const useStyles = createUseStyles({
    message: {
        color: blue,
        ...LuckiestGuyFont,
    },
    roomDataWrapper: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr ",
        width: "100%",
        margin: "40px 0",
    },
    playersTitle: {
        color: orange,
        ...LuckiestGuyFont,
        fontSize: "40px"
    },
    players: {
        color: orange,
        ...LuckiestGuyFont,
        fontSize: "30px",
        margin: "15px",
        display:"flex",
        justifyContent: "space-evenly"
    },
    button: {
        backgroundColor: red,
        maxWidth: "300px",
        borderRadius: cornerRadius,
        boxShadow: textShadow,
        padding: "30px 10px",
        cursor: "pointer",
        margin: "auto",
        marginTop: "30px",
    },
    startGameButton: {
        backgroundColor: blue,
    },
    buttonText: {
        color: white,
        ...LuckiestGuyFont,
        fontSize: "30px",
    },
})

let socket;

const WaitingLobby = ({location}) => {
    const classes = useStyles();

    const {getToken, getUsername, logout} = useAuth();

    let history = useHistory();
    const {rooms, getRooms} = useRooms();
    const { id } = queryString.parse(location.search);
    const [room, setRoom] = useState({
        id: "",
        name: "Room not found",
        users:[],
        hasStarted:false,
    });

    useEffect(() => {
        const currentRoom = rooms ? rooms.find((r) => r.id === id) : null;
        if(currentRoom)
            setRoom(currentRoom);

        if((!socket || !socket.connected) && currentRoom && currentRoom.users.find(u => u.username === getUsername())){
            handleJoin();
        }
    }, [rooms]);

    useEffect(() => {
       return () => {
           handleLeave();
        }
    }, []);

    const handleJoin = () => {
        if((socket && socket.connected)) return;
        const { id } = queryString.parse(location.search);
        socket = io(serverURL);
        socket.emit('join', { roomId:id, token:getToken() }, (error) => {
            if(error) {
                if(error === 'unauthorized user') {
                    logout();
                    return;
                }
                alert(error);
            }
            getRooms();
        });

        console.log(socket);
    }

    const handleLeave = () => {
        if((!socket || !socket.connected)) return;
        socket.emit('leaveRoom', { roomId:id, token:getToken() }, (error) => {
            if(error) {
                alert(error);
            }
            getRooms();
            socket.disconnect();
        });
    }

    const activeUsers = room.users.filter(u => u.active);
    const isConnected = (socket && socket.connected);

    return (
        <BackgroundWrapper title={room.name} backAction={history.goBack}>
            <div className={classes.message}>{activeUsers.length < 3 ? `Waiting for ${3-activeUsers.length} more players to join` : `Waiting for first player to start game`} </div>
            <div className={classes.roomDataWrapper}>
                <div>
                    <div className={classes.playersTitle}>Players:</div>
                    <div>
                    {activeUsers.map(user =>
                        <div key={user.username} className={classes.players}>
                            <div>
                                {user.username}
                            </div>
                            <div>
                                {user.allPoints}
                            </div>
                        </div>
                    )}
                    </div>
                </div>
                <div>
                    <div className={classes.button} onClick={isConnected ? handleLeave : handleJoin}>
                        <div className={classes.buttonText}>{isConnected ? "Leave" : "Join"}</div>
                    </div>
                    {activeUsers.length > 2 && getUsername() === activeUsers[0].username && isConnected &&
                        <div className={classNames(classes.button, classes.startGameButton)} onClick={() => console.log("start game")}>
                            <div className={classes.buttonText}>{"Start game"}</div>
                        </div>
                    }
                </div>
            </div>
        </BackgroundWrapper>
    )
}

export default WaitingLobby;