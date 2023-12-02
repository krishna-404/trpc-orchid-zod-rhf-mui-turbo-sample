import winston from "winston";
import envVars from "./config";

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const logger = winston.createLogger({
  level: envVars.NODE_ENV === 'prod' ? 'info' : 'debug',
  format: winston.format.combine(
    enumerateErrorFormat(),
    envVars.NODE_ENV === 'prod' ? winston.format.uncolorize() : winston.format.colorize(),
    winston.format.json(),
    winston.format.printf(({ level, message }) => `${level}: ${typeof message === 'object' ? JSON.stringify(message, null, 2) : message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error']
    }),
  ]
});

if (envVars.NODE_ENV === 'prod') {
  logger.add(new winston.transports.File({
    filename: `${(new Date().toISOString()).substring(0,9)}error.log`, level: 'error'
  }));
  logger.add(new winston.transports.File({
    filename: `${(new Date().toISOString()).substring(0,9)}combined.log`
  }));
};