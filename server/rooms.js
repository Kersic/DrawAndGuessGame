const { uuid } = require('uuidv4');

const rooms = [
    {
        id: uuid(),
        name: 'Room 1',
        users:[],
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 2',
        users:[],
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 3',
        users:[],
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 4',
        users:[],
        hasStarted:false,
    },
];

const addUserInRoom = ( socketId, user, roomId ) => {
    const room = rooms.find((room) => room.id === roomId);
    if(!room) return { error: 'Room not found' };

    const userIndex = room.users.findIndex((u) => u._id.toString() === user._id.toString());
    if(userIndex > -1){
        room.users[userIndex].active = true;
        room.users[userIndex].socketId = socketId;
        return { userRoom: roomId};

    } else if(!room.hasStarted) {
        const newUser = {
            socketId: socketId,
            _id: user._id,
            username: user.username,
            allPoints: user.points,
            pointsThisGame: 0,
            hasPlayed: false,
            active: true,
        }
        room.users.push(newUser);
        console.log("user added");
        return { userRoom: roomId};
    } else {
        return { error: 'Game has started cannot add new players' }
    }
}

const removeUserFromRoom = (userId, roomId) => {
    const room = rooms.find((room) => room.id === roomId);
    if(!room) return { error: 'Room not found' };

    const userIndex = room.users.findIndex((u) => u._id.toString() === userId.toString());
    if(userIndex > -1){
        room.users.splice(userIndex, 1);
        return { error: null };
    } else {
        return { error: "User is not in room" };
    }
}

const setUserInactive = (socketId) => {
    let userFound = false;

    rooms.map((room)=> {
        const userIndex = room.users.findIndex((u) => u.socketId.toString() === socketId.toString());
        if(userIndex > -1){
            userFound = true;
            room.users[userIndex].active = false;
            return { error: null };
        }
    })

    return { error: "User not found in any room" };
}

module.exports = {rooms, addUserInRoom, removeUserFromRoom, setUserInactive };