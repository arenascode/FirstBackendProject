import { Router } from "express";
import * as userController from "../../controllers/api/users.controller.js";
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

//Get users
routerUsers.get("/", userController.getUsers);

//Get one user by ID
routerUsers.get("/:uid",authenticationJwtApi,checkItIsAdmin, userController.getUserById);

// Updated user by ID
routerUsers.put("/:uid", userController.updateUser);

// Delete user by ID
routerUsers.delete("/:uid", userController.deleteUser);

//Change user Role
routerUsers.post("/premium/:uid", userController.changeUserRole)

// Upload User documents
routerUsers.post('/:uid/documents', uploader.any('profileImg', 'productImg', 'userDocument'), userController.uploadDocuments)
