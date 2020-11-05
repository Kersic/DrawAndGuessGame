const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser')
const defaultRouter = require('./Routes/defaultRouter');
const userRouter = require('./Routes/userRouter');
const roomRouter = require('./Routes/roomRouter');
const {databaseCredentials} = require("./config");
const {getDataFromToken} = require("./helperFunctions");
const userModel = require('./Models/user');

//const { addUser, removeUser, getUser } = require('./users');

const {addUserInRoom, removeUserFromRoom, setUserInactive} = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());
app.use(defaultRouter);
app.use('/user', userRouter);
app.use('/rooms', roomRouter);

io.on('connect', (socket) => {
    socket.on('join', ({ roomId, token }, callback) => {
        console.log("user joined");
        getDataFromToken(token, (tokenData) => {
            userModel.findOne({_id: tokenData.user._id})
                .then(user => {
                    const { userRoom, error } = addUserInRoom(socket.id, user, roomId );
                    if(error) return callback(null, error);
                    socket.join(userRoom);
                    callback(null);
                })
                .catch(err => {
                    return callback(null, "User not found");
                });

           // socket.emit('message', { user: null, text: `Welcome ${user.name}!`});
           // socket.broadcast.to(user.roomId).emit('message', { user: null, text: `${user.name} has joined!` });

        }, (err) => {
            return callback(err);
        });
    });

    socket.on('sendMessage', (message, callback) => {
        // const user = getUser(socket.id);
        // io.to(user.room).emit('message', { user: user.name, text: message });
        // callback();
    });

    socket.on('leaveRoom', ({roomId, token}, callback) => {
        console.log("user left room");
        getDataFromToken(token, (tokenData) => {
            removeUserFromRoom(tokenData.user._id, roomId);
            callback();
        }, (err) => {
            return callback(err);
        });
    });

    socket.on('disconnect', () => {
         console.log("user has left");
        setUserInactive(socket.id);
    })
});

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || databaseCredentials,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB'));
mongoose.Promise = global.Promise;

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));