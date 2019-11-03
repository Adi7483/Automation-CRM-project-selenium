
const winston = require('winston');
// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: './logs/log.log',
            level: 'silly',
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf((info) => {
            return `${info.timestamp} - [${info.level}]: ${info.message}`;
        })
    )
};
let logger = winston.createLogger(logConfiguration);
module.exports = logger;