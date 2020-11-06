const {getDataFromToken} = require("./helperFunctions");
const {getRoom, isUserInRoom} = require('./rooms');
const {getTimeStringFromSeconds} = require('./helperFunctions');
const {words} = require('./words');

const handleGame = (socket, io, roomId) => {
    setTimeout(()=>nextPlayerCountDown(io, roomId), 1000);


}

const nextPlayerCountDown = (io, roomId) => {
    const {room} = getRoom(roomId);
    const possiblePlayers = room.users.filter(u => u.active && !u.hasPlayed);
    if(possiblePlayers && possiblePlayers.length > 0){
       room.currentPlayer = possiblePlayers[Math.floor(Math.random() * possiblePlayers.length)];
       room.currentPlayer.hasPlayed = true;
    } else {
        io.to(roomId).emit('message', { user: null, text: `Room can close`});
        return;
    }

    const allGames =  room.users.filter(u => u.active || (!u.hasPlayed && u.hasPlayed))?.length;
    const playedGames =  room.users.filter(u => u.hasPlayed)?.length;
    room.gamesPlayed = playedGames + "/" + allGames;

    room.currentWord = words[Math.floor(Math.random() * words.length)];
    io.to(room.currentPlayer.socketId).emit('currentWord', room.currentWord);
    let counter = 4;
    let countDown = setInterval(() => {
        counter--;
        io.to(roomId).emit('nextPlayerCountdown', { currentPlayer: room.currentPlayer.username, time: counter, gamesPlayed: room.gamesPlayed});
        if(counter === 0){
            clearInterval(countDown);
            remainingTimeCountDown(io, roomId);
        }
    }, 1000);

    //console.log("test message send");
    //io.to(roomId).emit('message', { user: null, text: `Test message`});
}

const remainingTimeCountDown = (io, roomId) => {
    const {room} = getRoom(roomId);

    let counter = 60;//3 * 60;
    room.countDown = setInterval(() => {
        counter--;
        io.to(roomId).emit('timeCountdown', { time: getTimeStringFromSeconds(counter), users: room.users});
        if(counter <= 0){
            room.currentPlayer = null;
            clearInterval(room.countDown);
            showResultAndGivePoints(io, roomId, null);
        }
    }, 1000);
}

const showResultAndGivePoints = (io, roomId, user) => {
    const {room} = getRoom(roomId);
    io.to(roomId).emit('roundFinished');
    if(user !== null){
        clearInterval(room.countDown);
        //give points;
        io.to(roomId).emit('result', { winner: user.username, word: room.currentWord});
    } else {
        io.to(roomId).emit('result', { winner: null, word: room.currentWord});
    }
    room.currentPlayer = null;
    room.currentWord = "";

    setTimeout(()=>nextPlayerCountDown(io, roomId), 4000);
}

module.exports = {handleGame, showResultAndGivePoints};