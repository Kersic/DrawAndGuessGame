const { uuid } = require('uuidv4');

const rooms = [
    {
        id: uuid(),
        name: 'Room 1',
        users:[],
        mainUser: null,
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 2',
        users:[],
        mainUser: null,
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 3',
        users:[],
        mainUser: null,
        hasStarted:false,
    },
    {
        id: uuid(),
        name: 'Room 4',
        users:[],
        mainUser: null,
        hasStarted:false,
    },
];

module.exports = {rooms};