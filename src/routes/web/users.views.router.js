import { Router } from "express";
import { getUserById, getUsers } from "../../controllers/web/users.web.controller.js";

export const routerUserViews = Router()

routerUserViews.get('/users', getUsers)
routerUserViews.get('/userbyid/:uid', getUserById)

