import usersDaoMongodb from "../dao/user/usersDaoMongoDb.js";
import { winstonLogger } from "../utils/logger.js";

class UserRepository {
  constructor(daoSelected) {
    this.dao = daoSelected;
  }

  async create(userToSave, options) {
    winstonLogger.info(`createUser Repo ${userToSave}`);
    return await this.dao.createNewUser(userToSave);
  }

  async findById(userId, options) {
    return await this.dao.findUserById(userId);
  }

  async findOne(criteria, options) {
    console.log(`criteria passed to DAO from Repo ${criteria}`);
    return await this.dao.findOne(criteria);
  }

  async readMany(queryFilter, paginationOptions) {
    // make sure to receive an objet as paginate options
    if (queryFilter) {
      winstonLogger.info(`if linea 90 MONGO`);
      const result = await this.dao.findAllUsers(
        queryFilter,
        paginationOptions
      );
      return result;
    } else {
      winstonLogger.info(`else Linea 31 UserRepo`);
      const result = await this.dao.findAllUsers({}, paginationOptions);
      return result;
    }
  }

  async updateOneById(criteria, newData, options) {
    return await this.dao.updateUser(criteria, newData);
  }

  async updateMany(criteria, newData, options) {
    return await this.dao.updateMany(criteria);
  }

  async deleteOne(criteria, options) {
    return await this.dao.deleteUserById(criteria);
  }

  async deleteMany(criteria, options) {
    return await this.dao.deleteAllUsers(criteria);
  }
}

export const usersRepository = new UserRepository(usersDaoMongodb);

// Or

// export const usersRepository = new UserRepository(usersDaoMemory)
