import userService from "../../services/users.service.js";

export async function getUsers(req, res, next) {
  const users = await userService.getAllUsers()
  res.status(200).json(users)
}
export async function getUserById(req, res, next) {
  console.log(req.params.uid);
  const userById = await userService.findUser(req.params.uid)
  res.status(200).json(userById)
}