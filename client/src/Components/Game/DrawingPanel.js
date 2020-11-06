import React, {useEffect, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    belowBreakpoint,
    breakpoint4,
    center,
    cornerRadius,
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
});

const DrawingPanel = () => {
    const classes = useStyles();
    const [canvasSize, setCanvasSize] = useState(0);

    useEffect(() => {
       if(window.innerWidth < window.innerHeight){
           setCanvasSize(window.innerWidth > breakpoint4 ? window.innerWidth * 0.8 : window.innerWidth * 0.8);
       } else {
           setCanvasSize(window.innerHeight > breakpoint4 ? window.innerHeight * 0.8 : window.innerHeight * 0.8);
       }
    }, [])

    //https://www.npmjs.com/package/react-canvas-draw
    //https://embiem.github.io/react-canvas-draw/
    //https://github.com/embiem/react-canvas-draw/blob/master/demo/src/index.js
    return (
        <div className={classes.paper} onClick={() => console.log("draw")}>
            <CanvasDraw
                disabled={false}
                onChange={(e) => console.log(e)}
                canvasWidth={canvasSize}
                canvasHeight={canvasSize}
                brushRadius={3}
                loadTimeOffset={5}
                lazyRadius={2}
                hideGrid={false}
                style={{border: "solid 1px #ebebeb"}}
            />
        </div>
    )
}

export default DrawingPanel;
