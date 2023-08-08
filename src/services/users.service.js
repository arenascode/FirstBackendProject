import { usersRepository } from "../repositories/users.repository.js";
import { winstonLogger } from "../utils/logger.js";
import cron from "node-cron";
import mailService from "./mail.service.js";

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
    //newData must be an object
    const updatedUser = await usersRepository.updateOneById(userID, newData);
    return updatedUser;
  }

  async deleteUserById(userId) {
    const deletedUser = await usersRepository.deleteOne(userId);
    return deletedUser;
  }

  // async deleteUserForInactivity(userID) {
  //   cron.schedule("0 */24 * * * *", async () => {
  //     winstonLogger.info(
  //       `cron its working each 10 seconds. must be delete user with id: ${userID}`
  //     )
      
  //     const user = await usersRepository.findById(userID);
  //     const userLastConection = new Date(user.last_conection).getTime();
  //     const currentDate = new Date().getTime();
      
  //     const diferenceInMilliseconds = currentDate - userLastConection;
  //     const diferenceInDays = diferenceInMilliseconds / (24 * 60 * 60 * 10000);

  //     if (diferenceInDays >= 1) {
  //       winstonLogger.debug(
  //           `sends a notifitacion to the user advising him that if he doesn't log in again to his account it will be deleted`
  //         );
  //         await mailService.sendMailToAdviceDelitionAccount(user.email,user.name);
  //     } else if (diferenceInDays >= 2) {
  //       winstonLogger.debug(`This account will be deleted due to inactivity`);
  //       await userService.deleteUserById(user._id);
  //       await mailService.sendMailToNotifyDelitionAccount(
  //         user.email,
  //         user.name
  //       );
  //     } else {
  //       winstonLogger.debug(`The user account still active`);
  //     }
  //   });
  // }
}

const userService = new UserService();
export default userService;
