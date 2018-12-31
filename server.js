// TODO: integrate winston with morgan: https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
// TODO: websocket proxy by nginx: https://medium.com/@ibraheemabukaff/how-to-proxy-websockets-with-nginx-e333a5f0c0bb
const express = require('express'),
bodyParser = require('body-parser'),
morgan      = require('morgan'),
apiRoutes = require('./routes/api'),
authRoutes = require('./routes/auth'),
mqttclient = require('./mqttclient.js');

const app = express();
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('server is running on port 3000')
});

app.get('/', (req, res) => {
    res.send('Hello world  app is running on http://localhost:3000/');
});


app.use('/auth', authRoutes);
app.use('/api', apiRoutes);






