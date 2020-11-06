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
    }
});

const DrawingPanel = ({saveableCanvas, sendCanvasData, drawingPanelData, nextPlayer, time, isEnabled}) => {
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

    //https://www.npmjs.com/package/react-canvas-draw
    //https://embiem.github.io/react-canvas-draw/
    //https://github.com/embiem/react-canvas-draw/blob/master/demo/src/index.js
    return (
        <div className={classes.paper} >
            {time > 0 &&
                <div className={classes.countDownWrapper}>
                    <div className={classes.countDownPlayer}>Next Player: {nextPlayer}</div>
                    <div className={classes.countDownTime}>{time}</div>
                </div>
            }
            <div onClick={clear}>clear</div>
            <CanvasDraw
                ref={saveableCanvas}
                disabled={!isEnabled}
                onChange={sendCanvasData}
                canvasWidth={canvasSize}
                canvasHeight={canvasSize}
                brushRadius={3}
                loadTimeOffset={5}
                lazyRadius={2}
                hideGrid={false}
                style={{border: "solid 1px #ebebeb"}}
                saveData={drawingPanelData}
            />
        </div>
    )
}

export default DrawingPanel;
