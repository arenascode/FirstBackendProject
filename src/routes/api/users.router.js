import { Router } from "express";
import {
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

routerUsers.post("/premium/:uid", async (req, res, next) => {
  const roleSelected = req.body.role
  winstonLogger.info(`I'm roleSelected ${roleSelected}`)
  const userId = req.params.uid
  console.log(userId);
  const findUser = await userService.findUser(userId)
  console.log(findUser);
  if (!findUser) throw new Error(`User not found`)
  findUser.role = roleSelected
  await findUser.save()
  res.json({ findUser })
})
