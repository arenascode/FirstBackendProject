import { Router } from "express";
import userManagerDB from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/cryptography.js";
import { githubAuthentication, githubAuthentication_CB, loginAuthentication, registerAuthentication } from "../middlewares/passport.js";
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

// to send the user
// routerSessions.get("/profile", function (req, res) {
//   // Obtener los datos del usuario
//   let user = req.user
//   delete user.password
//   console.log(`request line 23 sessionsRouter ${JSON.stringify(user)}`);
//   // Devolver los datos del usuario en formato JSON
//   res.send(user);
// });

// User Logout 
routerSessions.get("/logout", logoutSessionController);

export default routerSessions