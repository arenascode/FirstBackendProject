import { winstonLogger } from "../../utils/logger.js";
import { decodeToken } from "../../utils/cryptography.js";
//Home
export function home (req, res) {
  res.redirect('/login')
}

//Register 
export function register (req, res) {
  res.render("register", {
    pageTitle: "Registrate",
  });
}

// Login
export function login (req, res) {
  res.render("login", {
    pageTitle: "Login",
  });
}

// Profile -- this isn't use 
export function profile (req, res) {
  winstonLogger.info(`req.user en RouterView ${JSON.stringify(req.user)}`);
  res.render('userProfile', {
    pageTitle: "Your Profile",
    user: req.user
  })
}

// Logout
export function logOut(req, res) {
  const user = req.user 
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
    })
    res.redirect("/login")
}

//View for send mail to recover Password
export async function mailToRecoverPassword(req, res, next) {
  res.render("mailToRecoverPass", {
    pagetitle: "MailToRecoverPass",
  });
}

export async function resetPassword(req, res, next) {
  const userData = { id: req.query.id, token: req.query.token };
  try {
    const itsTokenExpired = await decodeToken(userData.token);
    if (!itsTokenExpired) {
      res.json({
        Message: `The time to restore your password expired. Please send us a email again`,
      });
    } else {
      res.render("resetPassword", {
        pagetitle: "Enter New Pass",
        user: userData,
      });
    }
  } catch (error) {
    res.render("redirectRestorePass", {
      pagetitle: "TimeExpired",
      error: error.Message,
    });
  }
}