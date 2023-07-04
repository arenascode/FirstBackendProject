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
import userService from "../../services/users.service.js";
import { uploader } from "../../utils/multer.js";

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

// Upload with Any()
// routerUsers.post('/:uid/documents', uploader.any([{name:'profileImg', maxCount: 1}, {name:'productImg', maxCount: 3}, {name:'userDocument', maxCount: 1}]), uploadDocumentsController)

//Upload with Array()
// routerUsers.post('/:uid/documents', uploader.array('profileImg', 'productImg', 'userDocument'), uploadDocumentsController)

//Upload with fields()
routerUsers.post(
  "/:uid/documents",
  uploader.fields([
    { name: "profileImg", maxCount: 3 },
    { name: "productImg", maxCount: 3 },
    { name: "userDocument", maxCount: 3 },
  ]),
  uploadDocumentsController
);