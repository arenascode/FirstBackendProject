import { Router } from "express";
import userManagerDB from "../models/users.model.js";

const routerSessions = Router()
// User Register
routerSessions.post('/register', async (req, res) => {
  const dataUser = req.body
  console.log(dataUser);
  if (dataUser) {
    const userExist = await userManagerDB.findOne({ email: dataUser.email })

    if (userExist) {
      return res.status(422).json({ status: 'error', message: 'User Already Exist' })
    } else {
      const userCreated = {
        name: dataUser.name,
        lastName: dataUser.lastName,
        email: dataUser.email,
        age: dataUser.age,
        password: dataUser.password,
      };
      console.log(`I'm userCreated to save en Atlas ${JSON.stringify(userCreated)}`);
      await userManagerDB.create(userCreated)
      res.json({ status: "success", message: "User registered" })
      }
    } else {
    const response = {
      success: false,
      message: "Invalid request",
    };
    res.json(response);
  }
})
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
      $and: [{ email: userMail }, { password: userPass }]
    })
    if (!userExist) return res.status(401).send({
    status: "error",
    error: "Invalid credentials"
  })
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