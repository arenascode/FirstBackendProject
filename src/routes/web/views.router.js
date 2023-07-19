import { Router } from "express";
import { authenticationJwtView } from "../../middlewares/passport.js";
import * as viewsController from "../../controllers/web/sessions.web.controller.js";

const routerSessionsViews = Router();

// Home View 
routerSessionsViews.get('/', viewsController.home)

// Regiter View
routerSessionsViews.get("/register", viewsController.register);

// Login View
routerSessionsViews.get("/login", viewsController.login );

// Profile View
routerSessionsViews.get('/profile',authenticationJwtView, viewsController.profile)

// Logout View
routerSessionsViews.get('/logout', viewsController.logOut)

//To recover Password 
routerSessionsViews.get('/mailToRecoverPassword', viewsController.mailToRecoverPassword)

routerSessionsViews.get('/api/sessions/passwordReset', viewsController.resetPassword)

export default routerSessionsViews