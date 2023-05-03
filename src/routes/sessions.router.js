import { Router } from "express";
import userManagerDB from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/cryptography.js";
import { authenticationJwtApi, githubAuthentication, githubAuthentication_CB, loginAuthentication, registerAuthentication } from "../middlewares/passport.js";
import { loginSessionController, logoutSessionController, registerSessionsController } from "../controllers/sessions.controller.js";

const routerSessions = Router()
// User Register

routerSessions.post('/register', registerAuthentication, registerSessionsController)

// User Login Local Strategy
routerSessions.post('/login', loginAuthentication, loginSessionController)

// User Login Github Strategy
routerSessions.get('/github', githubAuthentication)
routerSessions.get(
  "/githubcallback",
  githubAuthentication_CB,
  (req, res, next) => {
    res.redirect("/profile");
  }
);

// Current

routerSessions.get('/current', authenticationJwtApi, (req, res, next) => {
  const getUser = req.user
  res.send(getUser)
})

// User Logout 
routerSessions.get("/logout", logoutSessionController);

export default routerSessions