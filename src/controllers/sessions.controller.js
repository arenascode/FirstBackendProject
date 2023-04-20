export function registerSessionsController(req, res, next) {
  res.status(201).json(req.user);
}
