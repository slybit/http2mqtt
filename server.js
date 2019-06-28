// TODO: integrate winston with morgan: https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
// TODO: websocket proxy by nginx: https://medium.com/@ibraheemabukaff/how-to-proxy-websockets-with-nginx-e333a5f0c0bb
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    randtoken = require('rand-token'),
    figlet = require('figlet'),
    apiRoutes = require('./routes/api.js'),
    authRoutes = require('./routes/auth.js');
opRoutes = require('./routes/op.js');
const { config, secrets } = require('./config.js');


/* Create and show the admin secret */
const showAdminToken = function () {
    let adminToken = secrets.get('admin_token');
    if (!adminToken) {
        adminToken = randtoken.uid(32);
        secrets.set('admin_token', adminToken);
        secrets.save();
    }
    console.log("ADMIN TOKEN: " + adminToken);
}

/* Setup the API server */
const startServer = function () {
    const app = express();
    app.use(morgan('dev'));

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse application/json
    app.use(bodyParser.json());

    app.listen(config.get('port'), () => {
        console.log('server is running on port ' + config.get('port'));
    });

    app.get('/', (req, res) => {
        res.send('Hello world  app is running on http://localhost:3000/');
    });


    app.use('/auth', authRoutes);
    app.use('/api', apiRoutes);
    app.use('/op', opRoutes);
}




/* Print logo */
figlet('HTTP2MQTT', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    showAdminToken();
    startServer();
});












