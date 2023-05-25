import winston, { addColors } from "winston";
import { NODE_ENV } from "../config/env.config.js";


const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "white",
    debug: "green",
  },
};

let transports

if (NODE_ENV === 'production') {
  transports = [
    new winston.transports.File({
    level: "info",
    filename: "errors.log",
    format: winston.format.simple(),
    })
    ];
} else {
  transports = [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize({
          colors:customLevelsOptions.colors
        }),
        winston.format.simple()
      )
    })
    ]
}

export const winstonLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: transports
})