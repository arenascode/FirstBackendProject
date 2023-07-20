import { Server as SocketIoServer } from "socket.io";
import connectedServer from "../../main.js";
import { winstonLogger } from "../../utils/logger.js";

export async function handleGet(req, res, next) {
  const io = new SocketIoServer(connectedServer);

  io.on("connection", async (socket) => {
    winstonLogger.info("New client Connecteed");
    const welcomeMessage = `Welcome to our shop. What can we do for you?`;

    io.sockets.emit("Welcome", welcomeMessage);

    socket.on("response", async (response) => {
      winstonLogger.info(`I'm a response ${response}`);
    });
  });

  res.render("chat", {
    pageTitle: "Chat",
  });
}
