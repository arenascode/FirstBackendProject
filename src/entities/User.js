import { createHash } from "../utils/cryptography.js";

function validateEmail(email) {
  // RegEx to validate email
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patron.test(email)) throw new Error('the email is invalid. Check it!')
  return email
};

function validatePassword(pass) {
  if (typeof pass !== 'string') throw new Error(`the password must be a string of characters`)
  if (!pass || pass === ' ') throw new Error(`The password cannot be empty`)
  return createHash(pass)
}

function validateName(name) {
   if (typeof name !== "string")
     throw new Error(`the name must be a string of characters`);
  if (!name || name === " ") throw new Error(`The name cannot be empty`);
  return name
}

function validateLastName(lastName) {
  if (typeof lastName !== "string")
    throw new Error(`the lastName must be a string of characters`);
  if (!lastName || lastName === " ") throw new Error(`The lastName cannot be empty`);
  return lastName;
}

function validateAge(age) {
  if (typeof age !== "string")
    throw new Error(`the age must be a string of characters`);
  if (!age || age === " ")
    throw new Error(`The age cannot be empty`);
  if (!Number.isInteger(Number(age)))
    throw new Error(`the age must be an integer number`);
  if (Number(age) <= 0) throw new Error(`Your age cannot be less than zero or zero`)
  return age
}

export class User {
  constructor({ email, password, name, lastName, age, role= "user"}) {
    this.email = validateEmail(email);
    this.password = validatePassword(password);
    this.name = validateName(name);
    this.lastName = validateLastName(lastName);
    this.age = validateAge(age);
    this.role = role,
    this.cart = {}
  }
}
