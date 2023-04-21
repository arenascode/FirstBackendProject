import passport from "passport";
import { Strategy as RegisterStrategy } from "passport-local";
import { Strategy as LoginStrategy } from "passport-local";
import { createHash, isValidPassword } from "../utils/cryptography.js";
import userManagerDB from "../models/users.model.js";

passport.use('register', new RegisterStrategy(
  {passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
    // I Bring here the code I used in the login controller 
    const dataUser = req.body;
    console.log(dataUser);
    try {
      if (dataUser) {
        const userExist = await userManagerDB.findOne({ email: username });
  
        if (userExist) {
          console.log('User Already Exist');
          return done(null, false)
        } else {
          const userCreated = {
            name: dataUser.name,
            lastName: dataUser.lastName,
            email: dataUser.email,
            age: dataUser.age,
            password: createHash(password),
            role: "User"
          };
          console.log(
            `I'm userCreated to save en Atlas ${JSON.stringify(userCreated)}`
          );
          let result = await userManagerDB.create(userCreated);
          return done(null, result)
        }
      }
    } catch (error) {
      return done('Authenticate Error' + error)
    }
  }
))

passport.use('login', new LoginStrategy({ usernameField: 'email' }, async (username, password, done) => {
    
  // first I going to check if the data is from admin or user
    const isAdmin =
      (username === "adminCoder@coder.com" && password === "adminCod3r123");
    console.log(`soy IsAdmin ${isAdmin}`);
    
  if (isAdmin) {
    const adminData = {
      email: username,
      role: "Admin"
    }
    return done(null, adminData)
  } else {
    const userSearched = await userManagerDB.findOne({ email: username })
    console.log(userSearched);
    if (!userSearched) {
      console.log(`user doesn't exist`);
      return done(null, false)
    } else {
      if (!isValidPassword(password, userSearched.password)) return done(null, false);
      delete userSearched.password
      return done(null, userSearched)
    }
    }
}
))

// I must add this for passport works.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// With this Express can use passport like a middlewares in the app
export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

export const registerAuthentication = passport.authenticate('register', { failWithError: true })
export const loginAuthentication = passport.authenticate('login', {failWithError: true})
