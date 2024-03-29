import passport from "passport";
import { Strategy as RegisterStrategy } from "passport-local";
import { Strategy as LoginStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { isValidPassword } from "../utils/cryptography.js";
import userService from "../services/users.service.js";
import {
  githubCallbackUrl,
  githubClientSecret,
  githubClienteId,
} from "../config/auth.config.js";
import { User } from "../entities/User.js";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { JWT_SECRET_KEY } from "../config/env.config.js";
import { winstonLogger } from "../utils/logger.js";

// JWT Stragegy //
// console.log(JWT_SECRET_KEY);
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          if (req && req.signedCookies) {
            token = req.signedCookies["jwt_authorization"];
          }
          return token;
        },
      ]),
      secretOrKey: JWT_SECRET_KEY,
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload); //payload have token
      } catch (error) {
        done(error);
      }
    }
  )
);

export function authenticationJwtApi(req, res, next) {
  passport.authenticate("jwt", (error, user, info) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized Error" });
    }
    if (!user) {
      winstonLogger.info(`info ${info}`);
      return res.status(401).json({ error: `Token doesn't exist. Please Log in`});
    }
    // El usuario está autenticado correctamente
    req.user = user;
    next();
  })(req, res, next);
}

export function authenticationJwtView(req, res, next) {
  passport.authenticate("jwt", (error, user) => {
    if (error || !user) return res.redirect("/login");
    req.user = user;
    next();
  })(req, res, next);
}

passport.use(
  "register",
  new RegisterStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, username, password, done) => {
      // I Bring here the code I used in the register controller
      const dataUser = req.body;
      winstonLogger.info(dataUser);
      try {
        if (dataUser) {
          const userExist = await userService.findUserByCriteria({
            email: username,
          });
          if (userExist) {
            winstonLogger.info("User Already Exist");
            return done(null, false);
          } else {
            const result = await userService.registerUser(dataUser);
            return done(null, result);
          }
        }
      } catch (error) {
        return done("Authenticate Error" + error);
      }
    }
  )
);

passport.use(
  "login",
  new LoginStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      // first I going to check if the data is from admin or user
      const isAdmin =
        username === "adminCoder@coder.com" && password === "adminCod3r123";
      winstonLogger.info(`soy IsAdmin ${isAdmin}`);

      if (isAdmin) {
        const adminData = {
          email: username,
          role: "admin",
        };
        return done(null, adminData);
      } else {
        console.log(`i'm username in passport ${username}`);
        const userSearched = await userService.findUserByCriteria({
          email: username,
        });
        winstonLogger.info(userSearched);
        if (!userSearched) {
          winstonLogger.info(`user doesn't exist`);
          return done(null, false);
        } else {
          if (!isValidPassword(password, userSearched.password))
            return done(null, false);
          userSearched.last_conection = new Date().toString();
          userSearched.save();
          delete userSearched.password;
          return done(null, userSearched);
        }
      }
    }
  )
);

// Login with Github Strategy
passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: githubClienteId,
      clientSecret: githubClientSecret,
      callbackURL: githubCallbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      winstonLogger.info(profile._json.name); // its advisable to do this to see all the information that comes from the Github profile.
      let user;
      try {
        user = await userService.findUserByCriteria({
          email: profile._json.login,
        });
        winstonLogger.info(user);
        if (!user) {
          user = new User({
            name: profile._json.name,
            email: profile._json.login,
            password: "",
          });
          let result = await userService.registerUser(user);
          done(null, result);
        } else {
          done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// With this Express can use passport like a middlewares in the app
export const passportInitialize = passport.initialize();

export const registerAuthentication = passport.authenticate("register", {
  session: false,
  failWithError: true,
});

export const loginAuthentication = passport.authenticate("login", {
  session: false,
  failWithError: true,
});

export const githubAuthentication = passport.authenticate("github", {
  session: false,
  scope: ["user:email"],
});

export const githubAuthentication_CB = passport.authenticate("github", {
  session: false,
  failWithError: true,
});
