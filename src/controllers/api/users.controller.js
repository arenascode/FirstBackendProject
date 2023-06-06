import userService  from "../../services/users.service.js";
import { winstonLogger } from "../../utils/logger.js";

export async function getUsersController(req, res, next) {
  let limit = Number(req.query.limit);
  let page = parseInt(req.query.page);
  const category = req.query.category;
  let order = req.query.sort;
  
  try {
    const showUsers = await userService.getAllUsers(
      category,
      limit,
      page,
      order
    );
    
    const prevPage = `http://localhost:8080/api/users?page=${showUsers.prevPage}&limit=${limit}&query=${category}&sort=${order}`;

    const nextPage = `http://localhost:8080/api/users?page=${showUsers.nextPage}&limit=${limit}&query=${category}&sort=${order}`;

    const paginationOptions = {
      hasNextPage: showUsers.hasNextPage,
      hasPrevPage: showUsers.hasPrevPage,
      prevLink: prevPage,
      nextLink: nextPage,
      page: page,
      category: category,
      limit: limit,
    };

    res.render("users", {
      pageTitle: "Users",
      usersExist: showUsers.docs.length > 0,
      users: showUsers.docs,
      pagination: paginationOptions,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
}

export async function getUserByIdController(req, res, next) {
  const userID = req.params.uid
  const searchedUser = await userService.findUser(userID)
  res.json(searchedUser) 
}

export async function updateUserController(req, res, next) {
  const userID = req.params.uid;
  const newData = req.body
  const updatedUser = await userService.updateUserById(userID, newData);
  res.json(updatedUser); 
}

export async function deleteUserController(req, res, next) {
  const userId = req.params.id
  const deletedUser = await userService.deleteUserById(userId)
  res.json(deletedUser)
}

export async function changeUserRoleController(req, res, next) {
  const roleSelected = req.body.role
  winstonLogger.info(`I'm roleSelected ${roleSelected}`)
  const userId = req.params.uid
  const findUser = await userService.findUser(userId)
  if (!findUser) throw new Error(`User not found`)
  findUser.role = roleSelected
  await findUser.save()
  res.json({ findUser })
}