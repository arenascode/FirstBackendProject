import { Router, response } from "express";
import { Server as SocketIoServer } from "socket.io";
import { conectedServer } from "../../app/app.js";
import { checkItIsUser } from "../../middlewares/handlePolicies.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
("../../app/app.js");

export const routerChat = Router();

routerChat.get("/", authenticationJwtApi, checkItIsUser, (req, res, next) => {
  const io = new SocketIoServer(conectedServer);

  io.on("connection", async (socket) => {
    winstonLogger.info("New client Connecteed");
    const welcomeMessage = `Welcome to our shop. What can we do for you?`;

    io.sockets.emit("Welcome", welcomeMessage);

    socket.on("response", async (response) => {
      winstonLogger.info(`I'm a response ${response}`);
    });
    //   socket.on("deleteProduct", async (idProductToDelete) => {
    //     winstonLogger.info(idProductToDelete);
    //     try {
    //       await productsService.deleteById(idProductToDelete);
    //       socket.emit("showProducts", await productsService.getProducts());
    //     } catch (error) {
    //       winstonLogger.error({ errorMessage: error });
    //     }
    //   });

    //   socket.on("addProductToCart", async (productToAdd) => {
    //     await cartsService.addNewCart(productToAdd);
    //   });
    //   // socket.emit('cartById', await cartsService.showCartById()
    //   // )
  });

  res.render("chat", {
    pageTitle: "Chat",
  });
});
