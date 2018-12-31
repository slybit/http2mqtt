const config = require('./config').parse();
const logger = require('./logger');
const mqtt = require('mqtt');


let justStarted = true;

let setMqttHandlers = function(mqttClient) {
    mqttClient.on('connect', function () {
        logger.info('MQTT connected');
        mqttClient.subscribe('#');
    });

    mqttClient.on('close', function () {
        logger.info('MQTT disconnected');
    });

    mqttClient.on('reconnect', function () {
        logger.info('MQTT trying to reconnect');
    });

    mqttClient.on('message', function (topic, message, packet) {
        // ignore the initial retained messages
        if (!packet.retain) justStarted = false;
        if (!justStarted || config.mqtt.retained) {
            // message is a buffer
            logger.silly("MQTT received %s : %s", topic, message)
            message = message.toString();
            //parse(topic, message);
        } else {
            logger.silly("MQTT ignored initial retained  %s : %s", topic, message)
        }
    });
}


const mqttClient = mqtt.connect(config.mqtt.url, config.mqtt.options);
setMqttHandlers(mqttClient);

module.exports = mqttClient;
