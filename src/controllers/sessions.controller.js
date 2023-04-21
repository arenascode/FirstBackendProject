export function registerSessionsController(req, res, next) {
  res.status(201).json(req.user);
}

export function loginSessionController(req, res, next) {
  if (!req.user) return res.status(400).send({ status: "error", error: "Invalid Credentials" })
  console.log(`req.user in LoginController ${JSON.stringify(req.user)}`);
  res.status(201).json(req.user);
}