import { Router } from "express";
import routerSessions from "./sessions.router.js";

export const apiRouter = Router();

//Products
// apiRouter.use("/users", usersRouter);
apiRouter.use("/sessions", routerSessions);
