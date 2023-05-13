import { Router } from "express";
import { deleteUserController, getUserByIdController, getUsersController, updateUserController } from "../../controllers/api/users.controller.js";

export const routerUsers = Router()

routerUsers.get('/', getUsersController)

routerUsers.get('/:uid',getUserByIdController)

routerUsers.put('/:uid', updateUserController)

routerUsers.delete('/:uid', deleteUserController)