import bcrypt from 'bcrypt'

// Here bcrypt create a encrypted password with two arguments. The original password bring from the user and a grain of. The password will be irreversible.
export function createHash(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}

//Here bcrypt will compare both of passwords. The password without hash in DB and hashed password given by the user

export function isValidPassword(receivedPass, savedPass) {
  return bcrypt.compareSync(receivedPass, savedPass)
}