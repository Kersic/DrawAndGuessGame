const {getDataFromToken} = require("./helperFunctions");
const userModel = require('./Models/user');
const {addUserInRoom, removeUserFromRoom, setUserInactive, startGame, isUserInRoom, isUserDrawing} = require('./rooms');
const {handleGame} = require('./gameHandling');

const handleConnection = (socket, io) => {
    socket.on('join', ({ roomId, token }, callback) => {
        console.log("user joined");
        getDataFromToken(token, (tokenData) => {
            userModel.findOne({_id: tokenData.user._id})
                .then(user => {
                    const { userRoom, gameStarted, error } = addUserInRoom(socket.id, user, roomId );
                    if(error) return callback(error);
                    socket.join(userRoom.id);
                    callback();
                    if(gameStarted) {
                        socket.emit('message', { user: null, text: `Welcome ${user.username}! Guess what other players are drawing with typing the exact word into the chat.`});
                        socket.emit('nextPlayerCountdown', { currentPlayer: userRoom.currentPlayer.username, time: 0, gamesPlayed: userRoom.gamesPlayed});
                        if(user.username === userRoom.currentPlayer.username){
                            socket.emit('currentWord', userRoom.currentWord);
                        }
                    }
                })
                .catch(() => {
                    return callback("User not found");
                });

            // socket.emit('message', { user: null, text: `Welcome ${user.name}!`});
            // socket.broadcast.to(user.roomId).emit('message', { user: null, text: `${user.name} has joined!` });

        }, (err) => {
            return callback(err);
        });
    });

    socket.on('sendMessage', ({token, roomId, message}, callback) => {
        console.log("send Message");
        getDataFromToken(token, (tokenData) => {
            const { error } = isUserInRoom(roomId, tokenData.user);
            if(error) return callback(error);
            console.log("send Message to room members " + roomId);
            io.to(roomId).emit('message', { user: tokenData.user.username, text: message });
            callback();
        }, (err) => {
            return callback(err);
        });

    });

    socket.on('leaveRoom', ({roomId, token}, callback) => {
        console.log("user left room");
        getDataFromToken(token, (tokenData) => {
            const { error } = removeUserFromRoom(tokenData.user._id, roomId);
            if(error) return callback(error);
            callback();
        }, (err) => {
            return callback(err);
        });
    });

    socket.on('startGame', ({roomId, token}, callback) => {
        console.log("startGame");
        getDataFromToken(token, (tokenData) => {
            console.log(tokenData);
            const { error } = startGame(roomId, tokenData.user);
            if(error) return callback(error);
            io.to(roomId).emit('gameStarted');
            callback();
            handleGame(socket, io, roomId);
        }, (err) => {
            return callback(err);
        });
    });

    socket.on('canvasData', ({token, roomId, canvasData}) => {
        getDataFromToken(token, (tokenData) => {
            const { isDrawing, error } = isUserDrawing(roomId, tokenData.user);
            if(error || !isDrawing) return;
            socket.broadcast.to(roomId).emit('canvasDataUpdate', canvasData);
        })
    });

    socket.on('disconnect', () => {
        console.log("user has left");
        setUserInactive(socket.id);
    })
}

module.exports = {handleConnection}
