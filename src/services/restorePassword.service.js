import { CLIENT_URL } from "../config/env.config.js";
import { tokenDaoMongoDb } from "../dao/user/tokenDaoMongoDb.js";
import { usersRepository } from "../repositories/users.repository.js";
import { isValidPassword } from "../utils/cryptography.js";
import { createHash, generateAToken } from "../utils/cryptography.js";
import mailService from "./mail.service.js";

class RestorePasswordService {
  async initializeRecovery(mailToRecoverPass) {
    const searchedUser = await usersRepository.findOne(mailToRecoverPass);
    console.log(`RestorePassService IDUser: ${searchedUser.name}`);
    const tokenUser = generateAToken(searchedUser);

    const tokenSaved = await tokenDaoMongoDb.saveToken(
      searchedUser._id,
      tokenUser
    );
    console.log(tokenSaved);

    const link = `${CLIENT_URL}/api/sessions/passwordReset?token=${tokenUser}&id=${searchedUser._id}`;
    mailService.sendmailToRecoverPassword(
      searchedUser.email,
      link,
      searchedUser.name
    );
    return tokenSaved; // change object return when finish
  }

  async finalizeRecovery(tokenInfo) {
    const tokenExist = await tokenDaoMongoDb.readToken(tokenInfo.userId);
    if (!tokenExist) throw new Error("The time to restore your password expired. Please send us your email again");

    const searchUser = await usersRepository.findById(tokenInfo.userId);

    const oldPass = searchUser.password;
    const isTheSamePass = isValidPassword(tokenInfo.newUserPass, oldPass);

    if (isTheSamePass)
      throw new Error(`Please put a different password to the one you had`);

    const newPassHashed = createHash(tokenInfo.newUserPass);

    const updateUserPass = await usersRepository.updateOneById(
      tokenExist.userId,
      { password: newPassHashed }
    );
    return updateUserPass;
  }
}

export const restorePassService = new RestorePasswordService();
