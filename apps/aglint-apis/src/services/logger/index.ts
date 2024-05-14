// const winston = require('winston')
import {createLogger, format, transports} from 'winston';
const {combine} = format;

const devlopmentLogger = () => {
  return createLogger({
    level: 'info',
    defaultMeta: {service: 'schedule-agents', version: 1.0},
    format: combine(
      format.timestamp(), // Add timestamp
      format.json() // Log format as JSON
    ),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'app.log',
      }),
    ],
  });
};
// const winston = require('winston')
// const productionLogger = () => {
//   return createLogger({
//     level: 'info',
//     // format: winston.format.simple(),
//     format: combine(timestamp(), json()),
//     defaultMeta: {service: 'schedule-agents'},
//     transports: [
//       new transports.Console(),
//       new transports.File({
//         filename: 'errors.log',
//       }),
//     ],
//   });
// };

export const appLogger = devlopmentLogger();
