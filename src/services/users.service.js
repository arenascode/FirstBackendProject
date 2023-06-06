import { usersRepository } from "../repositories/users.repository.js";
import { winstonLogger } from "../utils/logger.js";

class UserService {
  async registerUser(newUserData) {
    const dataNewUser = newUserData;
    winstonLogger.debug(`dataNewUser Service ${dataNewUser}`);
    const registeredUser = await usersRepository.create(dataNewUser);
    // await emailService.sendMail({to: newUserData})
    return registeredUser;
  }

  async getAllUsers(category, limit, page, order) {
    const queryFilter = category;

    if (order === "undefined" || order == undefined) {
      order = 1;
    }

    if (isNaN(limit) || limit === "undefined") {
      limit = 10;
    }

    if (isNaN(page)) {
      page = 1;
    }
    const paginationOptions = {
      order: order,
      limit: limit,
      page: page,
      lean: true,
    };
    const usersList = await usersRepository.readMany(
      queryFilter,
      paginationOptions
    );

    return usersList;
  }

  async findUser(userId) {
    const searchedUser = await usersRepository.findById(userId);
    winstonLogger.debug(searchedUser);
    return searchedUser;
  }
  async findUserByCriteria(criteria) {
    const searchedUser = await usersRepository.findOne(criteria);
    return searchedUser;
  }
  
  async updateUserById(userID, newData) {
    const updatedUser = await usersRepository.updateOneById(userID, newData);
    return updatedUser;
  }

  async deleteUserById(userId) {
    const deletedUser = await usersRepository.deleteOne(userId);
    return deletedUser;
  }
}

const userService = new UserService();
export default userService;
