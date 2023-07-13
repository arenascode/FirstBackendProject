import { winstonLogger } from "../utils/logger.js";

export function checkItIsAdmin(req, res, next) {

  const { role } = req.user;

  if (role === "admin") {
    next();
  } else {
    res['sendPermissionError']()
  }
};

export function checkItIsAdminOrPremium(req, res, next) {
  
  const { role } = req.user

  if (role === 'admin' || role === 'premium') {
    next()
  } else {
    res['sendPermissionError']()
  }
}

export function checkItIsUser(req, res, next) {
  const { role } = req.user;

  if (role === 'user' || role === 'premium') {
    next();
  } else {
    res["sendPermissionError"]();
  }
}

export function checkItIsPremium(req, res, next) {
  const { role } = req.user
  
  if (role === 'premium') {
    winstonLogger.debug('Is a premium user')
    next()
  } else {
    res["sendPermissionError"]();
  }
}