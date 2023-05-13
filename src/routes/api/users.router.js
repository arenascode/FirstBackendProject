import { Router } from "express";
import { getUsersController } from "../../controllers/api/users.controller.js";

export const routerUsers = Router()

routerUsers.get('/', getUsersController)

// routerUsers.get('/:uid', getUserByIdController)

// routerUsers.put('/:uid', updateUserController)

// routerUsers.delete('/:uid', deleteUserController)