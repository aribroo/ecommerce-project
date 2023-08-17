import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...args } = info;
      const formattedMessage = `[${timestamp}] [${level}]: ${message}`;
      return Object.keys(args).length ? `${formattedMessage} ${JSON.stringify(args, null, 2)}` : formattedMessage;
    })
  ),
  transports: [new winston.transports.Console()]
});
