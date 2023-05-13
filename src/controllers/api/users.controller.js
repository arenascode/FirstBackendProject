import { userService } from "../../services/users.service.js";

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