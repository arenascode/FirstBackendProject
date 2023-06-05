import { Router } from "express";
import { authenticationJwtView } from "../../middlewares/passport.js";
import { homeViewController, logOutController, loginViewController, profileViewController, registerViewController } from "../../controllers/web/web.controller.js";
import { restorePassService } from "../../services/restorePassword.service.js";
import { decodeToken } from "../../utils/cryptography.js";


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

//To recover Password 
routerSessionsViews.get('/mailToRecoverPassword', (req, res, next) => {
  res.render("mailToRecoverPass", {
    pagetitle: "MailToRecoverPass"
  })
})

routerSessionsViews.get('/api/sessions/passwordReset', async (req, res, next) => {
  console.log(`RouterSessions View ${req.query}`);
  // restorePassService.finalizeRecovery(req.query)
  const userData = { id: req.query.id, token: req.query.token };
  try {
    const itsTokenExpired = await decodeToken(userData.token)
    if (!itsTokenExpired) {
    res.json({Message: `The time to restore your password expired. Please send us a email again`})
  } else {
    res.render('resetPassword', {
      pagetitle: "Enter New Pass",
      user: userData
    })
  }
  } catch (error) {
    res.render('redirectRestorePass', {
      pagetitle: 'TimeExpired',
      error: error.Message
    });
  }
  // console.log(` I'm TokenExpired in RS view${JSON.stringify(itsTokenExpired)}`);
  
})

export default routerSessionsViews