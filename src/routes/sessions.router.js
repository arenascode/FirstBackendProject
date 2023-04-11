import { Router } from "express";
import userManagerDB from "../models/users.model.js";

const routerSessions = Router()

routerSessions.get('/register', (req, res) => {
  res.render('register', {
    pageTitle: 'Registrate'
  })
})

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
export default routerSessions