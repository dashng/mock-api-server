const path = require("path");

const winston = require('winston');
const _ = require("lodash");

var fs = require('fs');

function Logger(level = 'info', fileName) {
    var logLevels = ['info', 'error', 'warn'];

    if (_.indexOf(logLevels, level) === -1) {
        throw new Error(`Logger type shoule be one of ${_.join(logLevels, ' ,')}`);
    }

    if (!fileName) {
        fileName = path.basename(__filename);
    }

    var logDir = path.normalize(__dirname + `./../log/`);

    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    const logger = winston.createLogger({
        level: level,
        format: winston.format.json(),
        transports: [
            new winston.transports.File({
                filename: logDir + `${_.first(fileName.split('.'))}`,
                level: level,
                maxsize: 1024,
                handleExceptions: true,
                datePattern: '.yyyy-MM-dd',
                maxFiles: 10
            })
        ]
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    }
    return logger;
}

module.exports = Logger;