export class User {
  constructor({ email, password, name, lastName, age, role= "user"}) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.age = age;
    this.role = role
  }
}
