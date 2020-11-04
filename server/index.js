const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./Routes/defaultRouter');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, roomId }, callback) => {
        console.log("user joined");
        const { error, user } = addUser({ id: socket.id, name, roomId });

        if(error) return callback(error);
        socket.join(user.room);

        socket.emit('message', { user: null, text: `Welcome ${user.name}!`});
        socket.broadcast.to(user.room).emit('message', { user: null, text: `${user.name} has joined!` });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', { user: null, text: `${user.name} has left.` });
        }
    })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));