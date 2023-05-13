import usersDaoMongodb from "../dao/usersDaoMongoDb.js";

class UserRepository {
  constructor(daoSelected) {
    this.dao = daoSelected;
  }

  async create(userToSave, options) {
    return await this.dao.createNewUser(userToSave);
  }

  async findById(userId, options) {
    return await this.dao.findUserById(userId)
  }
  
  async readOne(criteria, options) {
    return await this.dao.readOne(criteria);
  }

  async readMany(queryFilter, paginationOptions) {

    // make sure to receive an objet as paginate options
    if (queryFilter) {
      console.log(`if linea 90 MONGO`);
      const result = await this.dao.findAllUsers(
        queryFilter,
        paginationOptions
      );
      return result;
    } else {
      console.log(`else Linea 31 UserRepo`);
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

export const usersRepository = new UserRepository(usersDaoMongodb)

// Or 

// export const usersRepository = new UserRepository(usersDaoMemory)