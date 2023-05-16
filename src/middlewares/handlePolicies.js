export function checkItIsAdmin(req, res, next) {

  const { role } = req.user;

  if (role === "admin") {
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