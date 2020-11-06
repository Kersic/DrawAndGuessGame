import React, {useEffect, useRef, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    belowBreakpoint, blue,
    breakpoint4,
    center,
    cornerRadius, LuckiestGuyFont, red,
    shadowAllDirections,
    white
} from "../../mixins";
import CanvasDraw from "react-canvas-draw";
import UndoIcon from '@material-ui/icons/Undo';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = createUseStyles({
    paper: {
        height: "100%",
        ...belowBreakpoint(breakpoint4, {
            borderBottomLeftRadius: 0,
            borderTopRightRadius: cornerRadius,
        }),
        backgroundColor: white,
        borderTopLeftRadius: cornerRadius,
        borderBottomLeftRadius: cornerRadius,
        boxShadow: shadowAllDirections,
        ...center,
        flexDirection: "column",
    },
    countDownWrapper: {
        position: "absolute",
    },
    countDownPlayer: {
        ...LuckiestGuyFont,
        color: blue,
        fontSize: "40px",
    },
    countDownTime: {
        ...LuckiestGuyFont,
        color: red,
        fontSize: "70px",
        margin: "20px",
    },
    buttons: {
        position: "absolute",
        display: "flex",
    },
    clearButton: {
        color: red,
        cursor: "pointer",
    },
    undoButton: {
        color: blue,
        cursor: "pointer",
        marginLeft: "4px",
    }
});

const DrawingPanel = ({saveableCanvas, sendCanvasData, drawingPanelData, alertMessage, time, isEnabled}) => {
    const classes = useStyles();
    const [canvasSize, setCanvasSize] = useState(0);

    useEffect(() => {
       if(window.innerWidth < window.innerHeight){
           setCanvasSize(window.innerWidth > breakpoint4 ? window.innerWidth * 0.8 : window.innerWidth * 0.8);
       } else {
           setCanvasSize(window.innerHeight > breakpoint4 ? window.innerHeight * 0.8 : window.innerHeight * 0.8);
       }
    }, [])

    const clear = () => {
        saveableCanvas.current?.clear()
    }

    const undo = () => {
        saveableCanvas.current?.undo()
    }

    //https://www.npmjs.com/package/react-canvas-draw
    //https://embiem.github.io/react-canvas-draw/
    //https://github.com/embiem/react-canvas-draw/blob/master/demo/src/index.js
    return (
        <div className={classes.paper} >
            {(time > 0 || alertMessage)&&
                <div className={classes.countDownWrapper}>
                    {alertMessage && <div className={classes.countDownPlayer}>{alertMessage}</div>}
                    {time > 0 && <div className={classes.countDownTime}>{time}</div>}
                </div>
            }
            <div>
            <div className={classes.buttons}>
                <ClearIcon className={classes.clearButton} onClick={clear} />
                <UndoIcon className={classes.undoButton} onClick={undo}/>
            </div>
            <CanvasDraw
                ref={saveableCanvas}
                disabled={!isEnabled}
                onChange={sendCanvasData}
                canvasWidth={canvasSize}
                canvasHeight={canvasSize}
                brushRadius={3}
                loadTimeOffset={5}
                immediateLoading={true}
                lazyRadius={2}
                hideGrid={false}
                style={{border: "solid 1px #ebebeb"}}
                saveData={drawingPanelData}
            />
            </div>
        </div>
    )
}

export default DrawingPanel;
