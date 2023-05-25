import { Router } from "express";
import { winstonLogger } from "../../utils/logger.js";

export const loggerTestRouter = Router()

loggerTestRouter.get('/loggerTest/', (req, res, next) => {
  winstonLogger.debug(`this is debug message`);
  winstonLogger.http(`this is http message`);
  winstonLogger.info(`this is info message`);
  winstonLogger.warning(`this is warning message`);
  //This levels doesn't works (error and warning, show error with colorize. TypeError: colors[Colorizer.allColors[lookup]] is not a function)
  // winstonLogger.error(`this is error message`);
  // winstonLogger.fatal(`this is fatal message`);

  res.send(`the endpoint works!`);
})