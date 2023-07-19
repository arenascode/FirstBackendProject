import { Router } from "express";
import * as passport from "../../middlewares/passport.js";
import * as sessionController from "../../controllers/api/sessions.controller.js";

const routerSessions = Router();

// User Register
//passport.registerAuthentication
routerSessions.post("/register", passport.registerAuthentication, sessionController.registerSessions);

// User Login Local Strategy
//passport.loginAuthentication
routerSessions.post("/login", passport.loginAuthentication, sessionController.loginSession);

// User Login Github Strategy
//passport.githubAuthentication
routerSessions.get("/github", passport.githubAuthentication);

//passport.githubAuthentication_CB
routerSessions.get("/githubcallback", passport.githubAuthentication_CB, sessionController.githubSession);

// Current
//passport.authenticationJwtApi
routerSessions.get("/current", passport.authenticationJwtApi, sessionController.getCurrentSession);

// User Logout
routerSessions.get("/logout/:userId", sessionController.logoutSession);

//mail to start with recover account process
routerSessions.post("/mailToRecoverPass", sessionController.mailToRecoverPassword);

// reset Password
routerSessions.post("/resetPassword", sessionController.resetPassword);

export default routerSessions;
