import { Router } from "express";
import {
  changeUserRoleController,
  deleteUserController,
  getUserByIdController,
  getUsersController,
  updateUserController,
  uploadDocumentsController,
} from "../../controllers/api/users.controller.js";
import { validateParam } from "../../utils/validations.js";
import { winstonLogger } from "../../utils/logger.js";
import { uploader } from "../../utils/multer.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
import { checkItIsAdmin } from "../../middlewares/handlePolicies.js";

export const routerUsers = Router();

routerUsers.param("uid", (req, res, next, userId) => {
  winstonLogger.info(`we received user ID: ${userId}`);
  if (!validateParam(userId))
    throw new Error(`the user ID doesn't have a valid format`);
  next();
});

routerUsers.get("/", getUsersController);

routerUsers.get("/:uid",authenticationJwtApi,checkItIsAdmin, getUserByIdController);

routerUsers.put("/:uid", updateUserController);

routerUsers.delete("/:uid", deleteUserController);

routerUsers.post("/premium/:uid", changeUserRoleController)

// Upload with Any()
routerUsers.post('/:uid/documents', uploader.any('profileImg', 'productImg', 'userDocument'), uploadDocumentsController)
