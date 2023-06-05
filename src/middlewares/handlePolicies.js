export function checkItIsAdmin(req, res, next) {

  const { role } = req.user;

  if (role === "admin" || role === 'premium') {
    next();
  } else {
    res['sendPermissionError']()
  }
};

export function checkItIsUser(req, res, next) {
  const { role } = req.user;

  if (role === "user") {
    next();
  } else {
    res["sendPermissionError"]();
  }
}

export function checkItIsPremium(req, res, next) {
  const { role } = req.user
  
  if (role === 'premium') {
    next()
  } else {
    res["sendPermissionError"]();
  }
}