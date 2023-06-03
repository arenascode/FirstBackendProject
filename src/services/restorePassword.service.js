import { CLIENT_URL } from "../config/env.config.js";
import { tokenDaoMongoDb } from "../dao/user/tokenDaoMongoDb.js";
import { usersRepository } from "../repositories/users.repository.js";
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
    console.log(`finalizeRecovery ${JSON.stringify(tokenInfo)}`);
    const tokenExist = await tokenDaoMongoDb.readToken(tokenInfo.userId);
    const hashedPass = createHash(tokenInfo.newUserPass)
    console.log(hashedPass);
    console.log(tokenExist);
    if (!tokenExist) throw new Error("Expired Token");
    const updateUserPass = await usersRepository.updateOneById(
      tokenExist.userId,
      { password: hashedPass}
    );
    return updateUserPass
  }
}

export const restorePassService = new RestorePasswordService();
