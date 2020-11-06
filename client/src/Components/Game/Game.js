import React, {useEffect, useRef, useState} from 'react'
import {createUseStyles} from "react-jss";
import queryString from 'query-string';
import io from "socket.io-client";

import {
    aboveBreakpoint, belowBreakpoint, blue,
    breakpoint2,
    breakpoint4, center, classNames,
    cornerRadius,
    lightOrange, LuckiestGuy,
    orange, red, shadowAllDirections, shadowButtonLeft, shadowButtonRight, shadowTopLeft, textShadow,
    white,
} from "../../mixins";
import RoundedInput from "../RoundedInput";
import DrawingPanel from "./DrawingPanel";
import {serverURL} from "../../config";
import Chat from "../Chat/Chat";
import useAuth from "../../Hooks/useAuth";

const chatWrapperSize = 50;
const infoBoxSizes = 70;

const useStyles = createUseStyles({
    background: {
        backgroundColor: lightOrange,
        height: "100vh",
        display: "grid",
        ...aboveBreakpoint(breakpoint4, {
            gridTemplateColumns: "7fr 3fr",
        }),
        ...aboveBreakpoint(breakpoint2, {
            gridTemplateColumns: "8fr 2fr",
        }),
    },
    paper: {
        marginLeft: "40px",
        marginTop: `-${infoBoxSizes/2}px`,
        marginBottom: `-${infoBoxSizes/2}px`,
        ...belowBreakpoint(breakpoint4, {
            marginBottom: `-${infoBoxSizes}px`,
            marginLeft: "20px",
        }),
    },
    numOfGames: {
        backgroundColor: orange,
        height: "100%",
        width: "140px",
        borderBottomRightRadius: cornerRadius,
        boxShadow: shadowButtonRight,
        ...center,
        justifyContent: "start",
        paddingLeft: "30px",
    },
    timeWrapper: {
        backgroundColor: red,
        height: "100%",
        width: "140px",
        ...aboveBreakpoint(breakpoint4, {
            borderBottomRightRadius: cornerRadius,
            width: "150px",
        }),
        borderBottomLeftRadius: cornerRadius,
        boxShadow: shadowButtonLeft,
        ...center,
    },
    wordToDraw: {
        backgroundColor: blue,
        height: "100%",
        width: "200px",
        borderTopRightRadius: cornerRadius,
        boxShadow: shadowButtonRight,
        textTransform: "uppercase",
        ...center,
        justifyContent: "start",
        paddingLeft: "30px",
    },
    topRightBox: {
        ...belowBreakpoint(breakpoint4, {
            display: "none",
        })
    },
    sideBoxes: {
        zIndex: 5,
        pointerEvents: "none",
        fontFamily: LuckiestGuy,
        color: white,
        fontSize: "25px",
        display: "flex",
        justifyContent: "space-between"
    },
    leftColumn: {
        display: "grid",
        gridTemplateRows: `${infoBoxSizes}px auto ${infoBoxSizes}px`,
        ...belowBreakpoint(breakpoint4, {
            minHeight: window.innerWidth * 1.3,
        })
    },
    rightColumn: {
        boxShadow: shadowTopLeft,
        display: "grid",
        gridTemplateRows: `50fr ${chatWrapperSize}px 50fr`,
        backgroundColor: orange,
        ...belowBreakpoint(breakpoint4, {
            minHeight: "700px",
        }),
        zIndex: 5,
        height: "100vh",
    },
    chatWrapper: {
        backgroundColor: orange,
        overflow: "scroll"
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
        cursor: "pointer",
        boxShadow: textShadow,
    },
    scoreWrapper: {
        marginTop: `-${chatWrapperSize / 2}px`,
        backgroundColor: red,
        overflow: "scroll"
    },
    resultList: {
        backgroundColor:white,
        borderRadius: "15px",
        margin: "20px",
        marginTop: "40px",
        padding: "10px",
    },
    resultListData: {
        display: "flex",
        padding: "10px",
        justifyContent: "space-between",
        borderTop: '1px solid gray'
    },
    resultListHeader: {
        borderTop: 'none',
        fontWeight: "bold",
        color: "gray",
    }
});

let socket;

const Game = ({location}) => {
    const classes = useStyles();
    const {getToken, getUsername, logout} = useAuth();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [time, setTime] = useState("");
    const [nextGameTime, setNextGameTime] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [alertMessage, setAlertMessage] = useState("");
    const [currentWord, setCurrentWord] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState("");
    const [drawingPanelData, setDrawingPanelData] = useState("");
    const [users, setUsers] = useState([]);
    const { id } = queryString.parse(location.search);
    const saveableCanvas = useRef(null);

    useEffect(() => {
        socket = io(serverURL);
        socket.emit('join', { roomId:id, token:getToken() }, (error) => {
            if(error) {
                if(error === 'unauthorized user') {
                    logout();
                    return;
                }
                alert(error);
            }
        });
        console.log(socket);

        return () => socket.disconnect();

    }, []);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });
        socket.on('timeCountdown', data => {
            setTime(data.time);
            setUsers(data.users);
        });
        socket.on('nextPlayerCountdown', data => {
            setNextGameTime(data.time);
            setCurrentPlayer(data.currentPlayer);
            if(data.time > 0)
                setAlertMessage("Next Player: " + data.currentPlayer);
            else
                setAlertMessage("");
            setGamesPlayed(data.gamesPlayed);
        });
        socket.on('currentWord', word => {
            setCurrentWord(word);
        });
        socket.on('roundFinished', () => {
            saveableCanvas.current?.clear()
            setCurrentWord(null);
        });
        socket.on('canvasDataUpdate', (canvasData) => {
            if(getUsername() === currentPlayer) return;
            //saveableCanvas.current?.loadSaveData(canvasData);
            setDrawingPanelData(canvasData);
        });
        socket.on('result', (data) => {
            console.log(data);
            if(data.winner){
                setAlertMessage(data.winner + " guessed correctly. Word was " + data.word);
            }
            else{
                setAlertMessage("Word was " + data.word);
            }
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', {token: getToken(), roomId: id, message: message}, () => setMessage(''));
        }
    }

    const sendCanvasData = () => {
        if(getUsername() !== currentPlayer) return;
        const canvasData = saveableCanvas.current?.getSaveData();
        socket.emit('canvasData', {token: getToken(), roomId: id, canvasData: canvasData});
        console.log(canvasData);
    }

    return (
        <div className={classes.background}>
            <div className={classes.leftColumn}>
                <div className={classes.sideBoxes}>
                    <div className={classes.numOfGames}>
                        GAMES <br/> {gamesPlayed}
                    </div>
                    <div className={classes.timeWrapper}>
                        {time}
                    </div>
                    <div className={classes.topRightBox} />
                </div>
                <div className={classes.paper}>
                    <DrawingPanel
                        saveableCanvas={saveableCanvas}
                        sendCanvasData={sendCanvasData}
                        drawingPanelData={drawingPanelData}
                        alertMessage={alertMessage}
                        time={nextGameTime}
                        isEnabled={currentPlayer === getUsername() && nextGameTime === 0}
                    />
                </div>
                <div className={classes.sideBoxes}>
                    {currentWord &&
                        <div className={classes.wordToDraw}>
                            {currentWord}
                        </div>
                    }
                </div>
            </div>

            <div className={classes.rightColumn}>
                <div className={classes.chatWrapper}>
                   <Chat messages={messages} />
                </div>
                <div className={classes.chatInputWrapper}>
                    <RoundedInput value={message} setValue={setMessage} placeholder={"Write answer..."} />
                    <div className={classes.sendButton} onClick={sendMessage}>
                        ᗌ
                    </div>
                </div>
                <div className={classes.scoreWrapper}>
                    <div className={classes.resultList}>
                        <div className={classNames(classes.resultListData, classes.resultListHeader)}>
                            <div>NAME</div>
                            <div>POINTS</div>
                        </div>
                        {users.map(user =>
                            <div key={user.username} className={classes.resultListData}>
                                <div style={{opacity: user.active ? "1" : "0.3",
                                    fontWeight: user.username === currentPlayer ? "bold" : "",
                                }}
                                >
                                    {user.username}
                                </div>
                                <div style={{opacity: user.active ? "1" : "0.5"}}>{user.pointsThisGame}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;