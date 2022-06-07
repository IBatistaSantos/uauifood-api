export class AuthenticationError extends Error {
  constructor () {
    super('Authentication invalid')
    this.name = 'AuthenticationInvalid'
  }
}
