export class AuthenticationError extends Error {
  constructor(message = 'Authentication Error') {
    super(message)
    this.tipe = 'AUTHENTICATION_ERROR'
  }
}