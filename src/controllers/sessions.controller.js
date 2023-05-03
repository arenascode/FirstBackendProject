import { generateAToken } from "../utils/cryptography.js";

export function registerSessionsController(req, res, next) {
  res.cookie('jwt_authorization', generateAToken(req.user), {
    signed: true,
    httpOnly: true
  })
  res.status(201).json(req.user);
}

export function loginSessionController(req, res, next) {
  if (!req.user) return res.status(400).send({ status: "error", error: "Invalid Credentials" })
  console.log(`req.user in LoginController ${JSON.stringify(req.user)}`);
  res.cookie('jwt_authorization', generateAToken(req.user), {
    signed: true,
    httpOnly: true
  })
  res.status(201).json(req.user)
}

export function getCurrentSessionController(req, res, next) {
  res.json(req.user);
}

export function logoutSessionController(req, res, next) {
  res.clearCookie('jwt_authorization', {
    signed: true,
    httpOnly: true
  })
    res.redirect("/login");
}