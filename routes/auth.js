const express = require('express');
const router = express.Router();
config = require('../config').parse()
const jwt = require('jsonwebtoken');

router.post('/login', (req,res) => {
    if (config.users[req.body.username] && req.body.password === config.users[req.body.username]) {
        const payload = {
            check:  true
          };
          var token = jwt.sign(payload, config.secret, {
                expiresIn: 1440 // expires in 24 hours
          });
          res.json({
            message: 'authentication done',
            token: token
          });

    } else {
        res.json({message:"invalid login"})
    }
})

module.exports = router;