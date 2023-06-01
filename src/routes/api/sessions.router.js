import { Router } from "express";
import {
  authenticationJwtApi,
  githubAuthentication,
  githubAuthentication_CB,
  loginAuthentication,
  registerAuthentication,
} from "../../middlewares/passport.js";
import {
  getCurrentSessionController,
  githubSessionController,
  loginSessionController,
  logoutSessionController,
  registerSessionsController,
} from "../../controllers/api/sessions.controller.js";

const routerSessions = Router();
// User Register

routerSessions.post(
  "/register",
  registerAuthentication,
  registerSessionsController
);

// User Login Local Strategy
routerSessions.post("/login", loginAuthentication, loginSessionController);

// User Login Github Strategy
routerSessions.get("/github", githubAuthentication);
routerSessions.get(
  "/githubcallback",
  githubAuthentication_CB,
  githubSessionController
);

// Current

routerSessions.get(
  "/current",
  authenticationJwtApi,
  getCurrentSessionController
);

// User Logout
routerSessions.get("/logout", logoutSessionController);

routerSessions.post('/recoverpass', (req, res, next) => {
  const mailToRecoverPass = req.body
  console.log(mailToRecoverPass);

  res.json({
    message: 'Mail received'
  })
})

export default routerSessions;
