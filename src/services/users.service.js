import { usersRepository } from "../repositories/users.repository.js"

class UserService {
  
  async registerUser(newUserData) {
    const dataNewUser = newUserData
    const registeredUser = await usersRepository.create(newUserData)
  // await emailService.sendMail({to: newUserData})
    return registeredUser
  }
  
  async getAllUsers(category, limit, page, order) {
    const queryFilter = category

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
      lean: true
    }
    const usersList = await usersRepository.readMany(queryFilter, paginationOptions)

    return usersList
  }
  
  async findUser(criteria) {
    const searchedUser = await usersRepository.readOne(criteria)
    return searchedUser
  }
}

export const userService = new UserService()
