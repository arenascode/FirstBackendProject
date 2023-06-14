import { Router } from "express";
import routerSessions from "./sessions.router.js";
import routerProducts from "./products.router.js";
import { routerUsers } from "./users.router.js";
import { routerChat } from "./chat.router.js";
import { routerDocs } from "./documentation.Router.js";

export const apiRouter = Router();

//Products
apiRouter.use("/products", routerProducts);

//sessions 
apiRouter.use("/sessions", routerSessions);

//Users
apiRouter.use('/users', routerUsers)

//Chat
apiRouter.use('/chat', routerChat)

apiRouter.use('/docs', routerDocs)
