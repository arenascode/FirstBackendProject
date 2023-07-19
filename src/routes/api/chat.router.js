import Router from "express";
import { checkItIsUser } from "../../middlewares/handlePolicies.js";
import { authenticationJwtApi } from "../../middlewares/passport.js";
import  * as chatController  from "../../controllers/api/chat.controller.js";
("../../app/app.js");

export const routerChat = Router();

routerChat.get("/", authenticationJwtApi, checkItIsUser, chatController.handleGet);
