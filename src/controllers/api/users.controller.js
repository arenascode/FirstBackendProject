import UserDTO from "../../repositories/users.dto.js";
import userService from "../../services/users.service.js";
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
  const userID = req.params.uid;
  const searchedUser = await userService.findUser(userID);
  let userToRender
  if (searchedUser) {
    userToRender = new UserDTO(searchedUser);
    res.render("user", {
      pageTitle: "userByID",
      userExist: Boolean(searchedUser),
      user: userToRender,
      userId: userID,
    })
  } else {
    res.render("user", {
      pageTitle: "userByID",
      userExist: Boolean(searchedUser),
      user: userToRender,
      userId: userID,
    });
  }
}

export async function updateUserController(req, res, next) {
  const userID = req.params.uid;
  const newData = req.body;
  const updatedUser = await userService.updateUserById(userID, newData);
  res.status(201).json(updatedUser);
}

export async function deleteUserController(req, res, next) {
  const userId = req.params.uid;
  await userService.deleteUserById(userId);
  res
    .status(204)
    .json({ message: `The user with ${userId} was deleted succesfully` });
}

export async function changeUserRoleController(req, res, next) {
  const roleSelected = req.body.role;
  try {
    winstonLogger.info(`I'm roleSelected ${roleSelected}`);
    const userId = req.params.uid;
    const findUser = await userService.findUser(userId);
    if (!findUser) throw new Error(`User not found`);
    if (roleSelected === findUser.role)
      throw new Error(`you already have that role assigned`);
    if (roleSelected === "premium") {
      const searchedNames = [
        "userId",
        "proofOfAddress",
        "proofAccountStatement",
      ];
      const containNameFiles = searchedNames.every((namefile) =>
        findUser.documents.some((file) => file.name == namefile)
      );
      console.log(containNameFiles);
      if (!containNameFiles) {
        throw new Error("Some document is missing");
      } else {
        findUser.role = roleSelected;
      }
    } else {
      findUser.role = roleSelected;
    }
    await findUser.save();
    res.send(`The user role was updated to ${roleSelected} sucessfully`);
  } catch (error) {
    if (error.message === "User not found") {
      res.json({ errorMsg: "User Not Found. Try again." });
    }
    if (error.message === "Some document is missing") {
      res.json({
        errorMsg:
          "Some document is missing. Please provide all required documents.",
      });
    }
    if (error.message === `you already have that role assigned`) {
      res.json({
        errorMsg: `you already have the ${roleSelected} role assigned`,
      });
    } else {
      res.json({ errorMsg: "An error ocurred. Please try again later." });
    }
  }
}

export async function uploadDocumentsController(req, res, next) {
  try {
    const userFiles = req.files;
    console.log(req.files);
    console.log(req.params.uid);

    let documents = [];
    userFiles.forEach((file) => {
      const fileToSave = {
        name: file.fieldname,
        reference: file.path,
      };
      documents.push(fileToSave);
    });
    console.log(documents);
    await userService.updateUserById(req.params.uid, {
      documents: documents,
      status: true,
    });

    res.send("Thank you, we received your documents sucessfully!");
  } catch (error) {
    console.log(error);
  }
}
