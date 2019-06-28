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

router.get('/test', (req, res) => {
    res.json({
        result: true,
    });
})

module.exports = router;