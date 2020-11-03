import React, {useEffect, useState} from 'react'
import {createUseStyles} from "react-jss";
import queryString from 'query-string';
import io from "socket.io-client";

import {
    aboveBreakpoint, belowBreakpoint, blue,
    breakpoint2,
    breakpoint4, center,
    cornerRadius,
    lightOrange, LuckiestGuy,
    orange, red, shadowAllDirections, shadowButtonLeft, shadowButtonRight, shadowTopLeft,
    white,
} from "../mixins";
import RoundedInput from "./RoundedInput";
import DrawingPanel from "./DrawingPanel";
import {serverURL} from "../config";
import Chat from "./Chat";

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

    },
    scoreWrapper: {
        marginTop: `-${chatWrapperSize / 2}px`,
        backgroundColor: red,
        overflow: "scroll"
    },
});

let socket;

const Game = ({location}) => {
    const classes = useStyles();
    const [roomId, setRoomId] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const { id, name } = queryString.parse(location.search);
        setRoomId(id);
        setUsername("tadeja");

        socket = io(serverURL);

        socket.emit('join', { name, roomId }, (error) => {
            if(error) {
                alert(error);
            }
        });

        console.log(socket);

        console.log(name);
        console.log(id);
    }, [])

    return (
        <div className={classes.background}>
            <div className={classes.leftColumn}>
                <div className={classes.sideBoxes}>
                    <div className={classes.numOfGames}>
                        GAMES <br/> 2/3
                    </div>
                    <div className={classes.timeWrapper}>
                        1:30
                    </div>
                    <div className={classes.topRightBox} />
                </div>
                <div className={classes.paper} onClick={() => console.log("draw")}>
                    <DrawingPanel />
                </div>
                <div className={classes.sideBoxes}>
                    <div className={classes.wordToDraw}>
                        TRAIN
                    </div>
                </div>
            </div>

            <div className={classes.rightColumn}>
                <div className={classes.chatWrapper}>
                   <Chat />
                </div>
                <div className={classes.chatInputWrapper}>
                    <RoundedInput placeholder={"Write answer..."} />
                    <div className={classes.sendButton}>
                        ᗌ
                    </div>
                </div>
                <div className={classes.scoreWrapper}>
                    <div>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        Why do we use it?
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game;