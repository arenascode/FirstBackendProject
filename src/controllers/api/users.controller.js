import userService  from "../../services/users.service.js";

export async function getUsersController(req, res, next) {
  let limit = Number(req.query.limit);
  //console.log(`LINE 5 controllerUser ${typeof limit}`);
  let page = parseInt(req.query.page);
  //console.log(page);
  const category = req.query.category;
  //console.log(`Category Line 10 Controller ${category}`);
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
  console.log(userID);
  const searchedUser = await userService.findUser(userID)
  res.json(searchedUser) 
}

export async function updateUserController(req, res, next) {
  const userID = req.params.uid;
  const newData = req.body
  console.log(userID);
  const updatedUser = await userService.updateUserById(userID, newData);
  res.json(updatedUser); 
}

export async function deleteUserController(req, res, next) {
  const userId = req.params.id
  const deletedUser = await userService.deleteUserById(userId)
  res.json(deletedUser)
}