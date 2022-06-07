export class RestaurantAlreadyExistsError extends Error {
  constructor (name: string) {
    super(`Restaurant with name ${name} already exists`)
    this.name = 'RestaurantAlreadyExistsError'
  }
}
