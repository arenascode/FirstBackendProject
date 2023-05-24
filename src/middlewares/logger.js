import { winstonLogger } from "../utils/logger.js"

export const logger = (req, res, next) => {
  winstonLogger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
  req.logger = winstonLogger
  next()
}