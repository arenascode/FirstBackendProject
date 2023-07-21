import { app } from "./app/app.js"
import cluster from "node:cluster"
import { winstonLogger } from "./utils/logger.js"
import { cpus } from "node:os";
import { PORT } from "./config/PortServer.config.js";

// if (cluster.isPrimary) {
//   winstonLogger.info(`I'm primary process. My ID is ${process.pid}`)

// for (let i = 0; i < cpus().length; i++) {
//   cluster.fork()  
// }

//   cluster.on('exit', worker => {
//     winstonLogger.info(`Process ${worker.process.pid} Ended`) 
//     cluster.fork()
//   })
// }

// let connectedServer
// if (cluster.isWorker) {
//   winstonLogger.info(`I'm worker process. My ID is ${process.pid}`);
//   connectedServer = app.listen(PORT, '0.0.0.0', () => {
//     winstonLogger.info(`App Connected To Port ${connectedServer.address().port}`)
//   })
// }
const connectedServer = app.listen(PORT, '0.0.0.0', () => {
  winstonLogger.info(`App Connected To Port ${connectedServer.address().port}`)
})
export default connectedServer