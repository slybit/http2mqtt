const express = require('express');
const router = express.Router();
const { secrets } = require('../config.js');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

router.post('/login', (req, res) => {

    if (secrets.get('users')[req.body.username] &&
        //!secrets.get('users')[req.body.username].refreshToken &&
        req.body.password === secrets.get('users')[req.body.username].password) {
        const payload = {
            check: true
        };
        var token = jwt.sign(payload, secrets.get('secret'), {
            expiresIn: 1440 // expires in 24 hours
        });
        // generate a random, 128 characters refreshtoken to replace the insecure password
        var refreshToken = randtoken.uid(128);
        // store it
        secrets.set('users:' + req.body.username + ':refreshToken',  refreshToken);
        secrets.save();
        res.json({
            result: true,
            token: token,
            refreshToken: refreshToken
        });

    } else {
        res.json({
            result: false,
            message: "invalid login"
        })
    }
})

module.exports = router;