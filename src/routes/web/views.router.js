import { Router } from "express";
import { authenticationJwtView } from "../../middlewares/passport.js";
import { homeViewController, logOutController, loginViewController, profileViewController, registerViewController } from "../../controllers/web/web.controller.js";


const routerSessionsViews = Router();

// Home View 
routerSessionsViews.get('/', homeViewController)

// Regiter View
routerSessionsViews.get("/register", registerViewController );

// Login View
routerSessionsViews.get("/login", loginViewController );

// Profile View
routerSessionsViews.get('/profile',authenticationJwtView, profileViewController)

// Logout View
routerSessionsViews.get('/logout', logOutController)

export default routerSessionsViews