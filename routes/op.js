const express = require('express');
const router = express.Router();
const { secrets } = require('../config.js');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

router.use((req, res, next) => {
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        let err = (token !== 'super');
        if (err) {
            return res.json({ message: 'invalid admin token' });
        } else {            
            next();
        }
    } else {
        // if there is no token
        return res.json({
            message: 'No token provided.'
        });
    }
});

/* ------------------------------------------------------------------------------------------
Users
------------------------------------------------------------------------------------------ */

router.post('/users', (req, res) => {
    let users = secrets.get('users');
    if (!req.body.username) {
        res.json({
            result: false,
            message: 'No username provided'
        });
        return;
    } else if (users[req.body.username]) {
        res.json({
            result: false,
            message: 'User already exists. Use DELETE first to update user.'
        });
    } else {
        let pwd = req.body.password ? req.body.password : randtoken.uid(10);

        secrets.set('users:' + req.body.username + ':password', pwd);
        secrets.save();
        res.json({
            result: true,
            message: 'User created.',
            password: pwd,
        });
    }   
})


router.delete('/users/:userId', (req, res) => {
    let users = secrets.get('users');
    if (!users[req.body.username]) {
        res.json({
            result: false,
            message: 'User not found.'
        });
    } else {
        secrets.clear('users:' + req.body.username);
        secrets.save();
        res.json({
            result: true,
            message: 'User deleted.'
        });
    }

    
})

module.exports = router;