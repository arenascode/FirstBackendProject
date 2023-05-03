import { Router } from "express";
import { authenticationJwtView } from "../middlewares/passport.js";

const routerSessionsViews = Router();

// Home View 
routerSessionsViews.get('/',(req, res) => {
  res.redirect('/login')
})
// Regiter View
routerSessionsViews.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "Registrate",
  });
});

// Login View
routerSessionsViews.get("/login", (req, res) => {
  res.render("login", {
    pageTitle: "Login",
  });
});

// Profile View
routerSessionsViews.get('/profile',authenticationJwtView, (req, res) => {
  console.log(`req.user en RouterView ${JSON.stringify(req.user)}`);
  res.render('userProfile', {
    pageTitle: "Your Profile",
    user: req.user
  })
})

// Logout View
routerSessionsViews.get('/logout', (req, res) => {
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
    })
    res.redirect("/login")
})

export default routerSessionsViews