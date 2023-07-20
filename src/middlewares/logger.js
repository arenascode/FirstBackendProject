import { winstonLogger } from "../utils/logger.js"

export const logger = (req, res, next) => {
  winstonLogger.info(`Process ID: ${process.pid} Method: ${req.method} en URL: ${req.url} - ${new Date().toLocaleTimeString()}`)
  req.logger = winstonLogger
  next()
}