// 'use strict';
// const { createLogger, format, transports } = require('winston');
// const fs = require('fs');
// const path = require('path');

// const env = process.env.NODE_ENV || 'development';
// const logDir = 'log';

// // Create the log directory if it does not exist
// if (!fs.existsSync(logDir)) {
//   fs.mkdirSync(logDir);
// }

// const filename = path.join(logDir, 'results.log');

// const logger = createLogger({
//   // change level if in dev environment versus production
//   level: env === 'development' ? 'debug' : 'info',
//   format: format.combine(
//     format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss'
//     }),
//     format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
//   ),
//   transports: [
//     new transports.Console({
//       level: 'info',
//       format: format.combine(
//         format.colorize(),
//         format.printf(
//           info => `${info.timestamp} ${info.level}: ${info.message}`
//         )
//       )
//     }),
//     new transports.File({ filename })
//   ]
// });

// module.exports = logger;

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