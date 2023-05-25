import { winstonLogger } from "../../utils/logger.js";

//Home
export function homeViewController (req, res) {
  res.redirect('/login')
}

//Register 
export function registerViewController (req, res) {
  res.render("register", {
    pageTitle: "Registrate",
  });
}

// Login
export function loginViewController (req, res) {
  res.render("login", {
    pageTitle: "Login",
  });
}

// Profile
export function profileViewController (req, res) {
  winstonLogger.info(`req.user en RouterView ${JSON.stringify(req.user)}`);
  res.render('userProfile', {
    pageTitle: "Your Profile",
    user: req.user
  })
}

// Logout
export function logOutController (req, res) {
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
    })
    res.redirect("/login")
}
