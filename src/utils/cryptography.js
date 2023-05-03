import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config/auth.config.js'
// Here bcrypt create a encrypted password with two arguments. The original password bring from the user and a grain of. The password will be irreversible.
export function createHash(pass) {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
}

//Here bcrypt will compare both of passwords. The password without hash in DB and hashed password given by the user

export function isValidPassword(receivedPass, savedPass) {
  return bcrypt.compareSync(receivedPass, savedPass)
}

//Here we going to use JWT. This is a standard to define a compact and secure format for transmit information between two parts. Used in authentication and autorization methods

export function generateAToken(payload) {
  console.log(` Cryptography ${payload}`);
  const token = jwt.sign(JSON.parse(JSON.stringify(payload)), JWT_SECRET_KEY, { expiresIn: '1h' })
  return token
}

export function decodeToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_KEY, (err, decodedUser) => {
      if (err) {
      reject(err)
      } else {
        resolve(decodedUser)
    }
  })
})
}



