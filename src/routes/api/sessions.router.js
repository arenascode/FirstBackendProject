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

routerSessions.post('/mailToRecoverPass', async (req, res, next) => {
  const mailToRecoverPass = req.body
  console.log(mailToRecoverPass);
  const updatedPassUser = await restorePassService.initializeRecovery(mailToRecoverPass)
  console.log(`Searched returned in Router ${updatedPassUser}`);
  res.json({
    message: 'Mail received'
  })
})

routerSessions.post('/resetPassword', async (req, res, next) => {
  console.log(`contenido routerPassReset en req.query ${JSON.stringify(req.query)}`);
  const tokenInfo = req.body
  console.log(`I'm body of RouterSessPost ${JSON.stringify(tokenInfo)}`);
  const result = await restorePassService.finalizeRecovery(tokenInfo)
  // if (!result) res['sendAuthError']
  console.log(`Result in Router ${result}`);
  //res.status(200).send('your password was restored succesfull')
  // res.json({message: `endpoing works!`})

  // const userData = {userId: req.query.id, userToken: req.query.token}
  // res.render(`resetPassword`, {
  //   pagetitle: "Reset Your Passwords",
  //   userId: userData
  // })
})

export default routerSessions;
