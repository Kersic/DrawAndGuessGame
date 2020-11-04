const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser')
const defaultRouter = require('./Routes/defaultRouter');
const userRouter = require('./Routes/userRouter');
const {databaseCredentials} = require("./config");
const {getDataFromToken} = require("./helperFunctions");

const { addUser, removeUser, getUser } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(bodyParser.json());
app.use(defaultRouter);
app.use('/user', userRouter);

io.on('connect', (socket) => {
    socket.on('join', ({ roomId, token }, callback) => {
        console.log("user joined");
        console.log(roomId);
        console.log(token);
        getDataFromToken(token, (tokenData) => {
            console.log(tokenData.user);
            const { error, user } = addUser({ id: socket.id, name: tokenData.user.username, roomId });

            if(error) return callback(error);
            socket.join(user.room);

            socket.emit('message', { user: null, text: `Welcome ${user.name}!`});
            socket.broadcast.to(user.room).emit('message', { user: null, text: `${user.name} has joined!` });

            callback();
        }, (err) => {
            return callback(err);
        });


    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        console.log("user has left");
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: null, text: `${user.name} has left.` });
        }
    })
});

var mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || databaseCredentials,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to DB'));
mongoose.Promise = global.Promise;

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));