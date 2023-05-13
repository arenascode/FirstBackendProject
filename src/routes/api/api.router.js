import { Router } from "express";
import routerSessions from "./sessions.router.js";
import routerProducts from "./products.router.js";
import { routerUsers } from "./users.router.js";

export const apiRouter = Router();

//Products
apiRouter.use("/products", routerProducts);

//sessions 
apiRouter.use("/sessions", routerSessions);

//Users
apiRouter.use('/users', routerUsers)
