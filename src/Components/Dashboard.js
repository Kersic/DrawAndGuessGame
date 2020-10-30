import React, {useState} from 'react'
import {createUseStyles} from "react-jss";
import {Link} from "react-router-dom";
import JoinGame from "./JoinGame";


const useStyles = createUseStyles({
    background: {

    },
});


const Dashboard = () => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div >
            <JoinGame />
        </div>

    )
}

export default Dashboard;