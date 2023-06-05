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
import { restorePassService } from "../../services/restorePassword.service.js";
import { generateAToken } from "../../utils/cryptography.js";

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

routerSessions.post("/mailToRecoverPass", async (req, res, next) => {
  try {
    const mailToRecoverPass = req.body;
  console.log(mailToRecoverPass);
  const updatedPassUser = await restorePassService.initializeRecovery(
    mailToRecoverPass
  );
  console.log(`Searched returned in Router ${updatedPassUser}`);
  res.json({
    message: "Mail received",
  });
  } catch (error) {
    res.status(400).json({errorMsg: error.message})
  }
});

routerSessions.post("/resetPassword", async (req, res, next) => {
  try {
    const tokenInfo = req.body;
  
    const result = await restorePassService.finalizeRecovery(tokenInfo);
    console.log(`Result in Router ${result}`);
    let newToken = generateAToken(result)
    console.log(newToken);

    res.cookie("jwt_authorization", newToken, { signed: true, httpOnly: true })
    
    res.status(200).send("your password was restored");

  } catch (error) {
    console.log(`I'm error SessRouter ${error}`);
    res.status(400).json({ errorMsg: error.message });
  }

  //res.status(200).send('your password was restored succesfull')
});

export default routerSessions;
