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
    transports: [new transports.Console()],
  });
};

export const appLogger = devlopmentLogger();
