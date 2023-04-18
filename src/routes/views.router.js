import { Router } from "express";

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
routerSessionsViews.get('/profile', (req, res) => {
  console.log(req.session.user);
  res.render('userProfile', {
    pageTitle: "Profile",
    user: req.session.user
  })
})

// Logout View
routerSessionsViews.get('/logout', (req, res) => {
    req.session.destroy((err) => {
    if (err)
      return res.status(500).send({
        status: "error",
        error: "Couldn't logout",
      })
    else {
      console.log(`see you later`);
    }
    }),
    res.redirect("/login")
})

export default routerSessionsViews