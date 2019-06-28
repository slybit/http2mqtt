const express = require('express');
const router = express.Router();
const {config, secrets} = require('../config.js');
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const mqttclient = require('../mqttclient.js');

router.use((req, res, next) => {
    // check header for the token
    var token = req.headers['access-token'];

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, secrets.get('secret'), (err, decoded) => {
            if (err) {
                return res.json({ message: 'invalid token' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        return res.json({
            message: 'No token provided.'
        });
    }
});

router.post('/publish', (req, res) => {
    //req.body.topic
    logger.info(JSON.stringify(req.body.message, undefined, 4));
    mqttclient.publish(req.body.topic, JSON.stringify(req.body.message))
    res.json({ 'MQTT status' : mqttclient.connected ? 'connected' : 'disconnected'});
})



router.get('/getAllProducts', (req, res) => {
    let products = [
        {
            id: 1,
            name: "cheese"
        },
        {
            id: 2,
            name: "carottes"
        }
    ]
    res.json(products);
})

module.exports = router;