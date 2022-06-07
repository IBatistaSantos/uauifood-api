export class UserAlreadyExistsError extends Error {
  constructor (name: string) {
    super(`User with name ${name} already exists`)
    this.name = 'UserAlreadyExistsError'
  }
}
