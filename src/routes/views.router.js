import { Router } from "express";

const routerSessionsViews = Router();

// const privateAccess = (req, res, next) => {
//   if (!req.session) return res.redirect("/login");
//   next();
// };

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
routerSessionsViews.get('/profile', (req, res) => {
  console.log(req.session.user);
  res.render('userProfile', {
    user: req.session.user
  })
})


export default routerSessionsViews