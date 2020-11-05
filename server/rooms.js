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

module.exports = {rooms};