nconf = require('nconf');
nconf.formats.yaml = require('nconf-yaml');
const randtoken = require('rand-token');

try {

    const config = new nconf.Provider({
        env: true,
        argv: true,
        store: {
            type: 'file',
            file: './config.yaml',
            format: nconf.formats.yaml
        },
    });

    config.defaults({
        port: 2000,
        loglevel: 'silly',
        mqtt: {
            url: 'mqtt://localhost'
        }
    });


    const secrets = new nconf.Provider({
        env: false,
        argv: false,
        store: {
            type: 'file',
            file: './secrets.yaml',
            format: nconf.formats.yaml
        },
    });

    if (secrets.get('secret') === undefined) {
        secrets.set('secret', randtoken.uid(30));
        secrets.save();
    }

    module.exports = { config, secrets }

} catch (err) {
    console.log(err.message);
    process.exit(1);
}

