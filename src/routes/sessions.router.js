import { Router } from "express";
import userManagerDB from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils/cryptography.js";
import { registerAuthentication } from "../middlewares/passport.js";
import { registerSessionsController } from "../controllers/sessions.controller.js";

const routerSessions = Router()
// User Register

routerSessions.post('/register', registerAuthentication, registerSessionsController)

// User Login 
routerSessions.post('/login', async (req, res) => {
  const { userMail, userPass } = req.body
  // We going to verify if the login data is user or admin 
  const isAdmin = (userMail === 'adminCoder@coder.com' && userPass === 'adminCod3r123')
  console.log(`soy IsAdmin ${isAdmin}`)
  
  if (isAdmin) {
    req.session.user = {
      email: userMail,
      role: "Admin"
    }
    res.render('userProfile', {
      user: req.session.user
    })
    
  } else {
    // If the user doesn't a Admin, will searche in the DB
    const userExist = await userManagerDB.findOne({
      $and: [{ email: userMail }, /*{ password: userPass }*/]
    })
    console.log(`I'm userExist Line 55 ${userExist}`);
    if (!userExist) return res.status(404).send({
    status: "error",
    error: "Invalid credentials"
    })
    if (!isValidPassword(userPass, userExist.password)) return res.status(401).send({ status: "error", error: "Incorrect Password" })
    delete userExist.password
    req.session.user = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      age: userExist.age,
      role: "User"
  };
    res.render("userProfile", {
      user: req.session.user
    });
  res.send({
      status: "success",
      payload: req.session,
      message: "¡login succesfull! :)",
    });  
  }
})
// User Logout 
routerSessions.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res.status(500).send({
        status: "error",
        error: "Couldn't logout",
      })
    else {
      console.log(`see you later`);
    }
    });
    res.redirect("/login");
});

export default routerSessions