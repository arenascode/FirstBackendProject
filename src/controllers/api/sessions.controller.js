import UserDTO from "../../repositories/users.dto.js";
import userService from "../../services/users.service.js";
import { generateAToken } from "../../utils/cryptography.js";
import { winstonLogger } from "../../utils/logger.js";

// Register
export function registerSessionsController(req, res, next) {
  res.cookie("jwt_authorization", generateAToken(req.user), {
    signed: true,
    httpOnly: true,
  });
  res.status(201).json(req.user);
}

// Login
export function loginSessionController(req, res, next) {
  if (!req.user)
    return res
      .status(400)
      .send({ status: "error", error: "Invalid Credentials" });
  winstonLogger.info(`req.user in LoginController ${JSON.stringify(req.user)}`);
  res.cookie("jwt_authorization", generateAToken(req.user), {
    signed: true,
    httpOnly: true,
  });
  console.log(req.user);
  res.status(201).json(req.user);
}

// Current Session
export function getCurrentSessionController(req, res, next) {
  const userDTO = new UserDTO(req.user)
  if (!req.user) res.redirect('/login')
  res.json(userDTO);
}

//Logout
export async function logoutSessionController (req, res, next) {
  try {
    const userId = req.params.userId
    console.log(`user in logout ${userId}`);
    await userService.updateUserById(userId, {last_conection: new Date().toString()})
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
export function githubSessionController (req, res, next) {
    res.cookie("jwt_authorization", generateAToken(req.user), {
      signed: true,
      httpOnly: true,
    });
    res.redirect("/profile");
  }