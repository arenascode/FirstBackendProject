import UserDTO from "../../repositories/users.dto.js";
import userService from "../../services/users.service.js";
import { generateAToken } from "../../utils/cryptography.js";
import { winstonLogger } from "../../utils/logger.js";
import { restorePassService } from "../../services/restorePassword.service.js";
// Register
export function registerSessions(req, res, next) {
  res.cookie("jwt_authorization", generateAToken(req.user), {
    signed: true,
    httpOnly: true,
  });
  res.status(201).json(req.user);
}

// Login
export function loginSession(req, res, next) {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", error: "Invalid Credentials" });
  res.cookie("jwt_authorization", generateAToken(req.user), {
    signed: true,
    httpOnly: true,
  });
  res.status(201).json(req.user);
}

// Current Session
export function getCurrentSession(req, res, next) {
  const userDTO = new UserDTO(req.user)
  if (!req.user) res.redirect('/login')
  res.json(userDTO);
}

//Logout
export async function logoutSession (req, res, next) {
  try {
    const userId = req.params.userId
    await userService.updateUserById(userId, { last_conection: new Date().toString() })
    //Here I call the service to delete user after 2 days of inactivity and send mail to them notifying them
    await userService.deleteUserForInactivity(userId);
    
    res.clearCookie("jwt_authorization", {
      signed: true,
      httpOnly: true,
    });
    res.redirect("/login");
  } catch (error) {
    winstonLogger.error(error)
  }
}

//Github Session
export function githubSession (req, res, next) {
    res.cookie("jwt_authorization", generateAToken(req.user), {
      signed: true,
      httpOnly: true,
    });
    res.redirect("/profile");
}

//Controler mailToRecoverPass
export async function mailToRecoverPassword(req, res, next) {
  try {
    const mailToRecoverPass = req.body;
    const updatedPassUser = await restorePassService.initializeRecovery(
      mailToRecoverPass
    );
    res.json({
      message: "Mail received",
    });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
}

export async function resetPassword(req, res, next) {
    try {
      const tokenInfo = req.body;

      const result = await restorePassService.finalizeRecovery(tokenInfo);
      let newToken = generateAToken(result);
      console.log(newToken);

      res.cookie("jwt_authorization", newToken, {
        signed: true,
        httpOnly: true,
      });

      res.status(200).send("your password was restored");
    } catch (error) {
      res.status(400).json({ errorMsg: error.message });
    }
}