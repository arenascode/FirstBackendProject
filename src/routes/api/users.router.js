import { Router } from "express";
import {
  changeUserRoleController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
} from "../../controllers/api/users.controller.js";
import { validateParam } from "../../utils/validations.js";
import { winstonLogger } from "../../utils/logger.js";
import userService from "../../services/users.service.js";

export const routerUsers = Router();

routerUsers.param("uid", (req, res, next, userId) => {
  winstonLogger.info(`we received user ID: ${userId}`);
  if (!validateParam(userId))
    throw new Error(`the user ID doesn't have a valid format`);
  next();
});

routerUsers.get("/", getUsersController);

routerUsers.get("/:uid", getUserByIdController);

routerUsers.put("/:uid", updateUserController);

routerUsers.delete("/:uid", deleteUserController);

routerUsers.post("/premium/:uid", changeUserRoleController)