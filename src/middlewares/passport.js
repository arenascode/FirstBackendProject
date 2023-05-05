import passport from "passport";
import { Strategy as RegisterStrategy } from "passport-local";
import { Strategy as LoginStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { createHash, isValidPassword } from "../utils/cryptography.js";
import userManagerDB from "../models/users.model.js";
import { githubCallbackUrl, githubClientSecret, githubClienteId } from "../config/auth.config.js";
import { User } from "../entities/User.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { JWT_SECRET_KEY } from "../config/auth.config.js";
import { AuthenticationError } from "../errors/AuthenticationError.js";

// JWT Stragegy //

passport.use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req && req.signedCookies) {
      token = req.signedCookies['jwt_authorization']
    }
    return token
  }]), secretOrKey: JWT_SECRET_KEY,
}, async (jwt_payload, done) => {
  try {
    done(null,jwt_payload) //payload have token
  } catch (error) {
    done(error)
  }
}))

export function authenticationJwtApi(req, res, next) {
  passport.authenticate('jwt', (error, user, info) => {
    if (error || !user) return next(new AuthenticationError())
    req.user = user
    next()
  }) (req, res, next)
} 

export function authenticationJwtView(req, res, next) {
  passport.authenticate('jwt', (error, user) => {
    if (error || !user) return res.redirect('/login')
    req.user = user
    next()
  })(req, res, next)
}

passport.use('register', new RegisterStrategy(
  {passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
    // I Bring here the code I used in the register controller 
    const dataUser = req.body;
    console.log(dataUser);
    try {
      if (dataUser) {
        const userExist = await userManagerDB.findOne({ email: username });
  
        if (userExist) {
          console.log('User Already Exist');
          return done(null, false)
        } else {
          const userCreated = new User ({
            name: dataUser.name,
            lastName: dataUser.lastName,
            email: dataUser.email,
            age: dataUser.age,
            password: createHash(password),
            role: "User"
          });
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

// Login with Github Strategy
passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL:githubCallbackUrl
}, async (accessToken, refreshToken, profile, done) => {
  console.log(profile._json.name) // its advisable to do this to see all the information that comes from the Github profile.
  let user
  try {
    user = await userManagerDB.findOne({ email: profile._json.login })
    console.log(user);
    if (!user) {
      user = new User({
        name: profile._json.name,
        email: profile._json.login,
        password: '',
      })
      let result = await userManagerDB.create(user)
      done(null,result)
    } else {
      done(null, user)
    }
  } catch (error) {
    return done(error)
    }
  }
))

// With this Express can use passport like a middlewares in the app
export const passportInitialize = passport.initialize()


export const registerAuthentication = passport.authenticate('register', { session: false, failWithError: true })

export const loginAuthentication = passport.authenticate('login', { session: false, failWithError: true })

export const githubAuthentication = passport.authenticate("github", {
  session: false,scope: ["user:email"],
});

export const githubAuthentication_CB = passport.authenticate('github', {session: false,failWithError: true})