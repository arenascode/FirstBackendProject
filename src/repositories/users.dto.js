export default class UserDTO {
  constructor(userData) {
    this.fullName = `${userData.name} ${userData.lastName}`,
    this.email = userData.email, 
    this.role = userData.role
  }
}