const express = require('express');
const router = express.Router();
const {rooms} = require('../rooms');
const {verifyToken} = require("../helperFunctions");

router.get('/', verifyToken, (req, res) => {
    res.json(rooms);
});

router.post('/', verifyToken, (req, res) => {
    if(!req.body.id) {
        res.status(500).json({message:"missing room id"});
        return;
    }
    if(!req.body.name) {
        res.status(500).json({message:"missing room name"});
        return;
    }
    const room = {
        id: req.body.id,
        name: req.body.name,
        users:[req.authData.username],
        mainUser: req.authData.username,
        hasStarted:false,
    }
    rooms.push(room);
    res.json(room);
});

module.exports = router;