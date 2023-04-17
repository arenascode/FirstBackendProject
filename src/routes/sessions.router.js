import { Router } from "express";
import userManagerDB from "../models/users.model.js";
import session from "express-session";

const routerSessions = Router()

routerSessions.post('/register', async (req, res) => {
  const dataUser = req.body
  console.log(dataUser);
  if (dataUser) {
    const userExist = await userManagerDB.findOne({ email: dataUser.email })
    console.log(`I'am userExist ${userExist}`);

    if (userExist) {
      return res.status(422).json({ status: 'error', error: 'User Already Exist' })
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

routerSessions.post('/login', async (req, res) => {
  const { userMail, userPass } = req.body
  const userExist = await userManagerDB.findOne({
    $and: [{ email: userMail }, { password: userPass }]
  });
  if (!userExist) return res.status(401).send({
    status: "error",
    error: "Invalid credentials"
  })
  req.session.user = {
      id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      age: userExist.age
  }
    res.send({
      status: "success",
      payload: req.session,
      message: "¡login succesfull! :)",
    });
})

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