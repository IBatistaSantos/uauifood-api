export class RestaurantNotFoundError extends Error {
  constructor (id: string) {
    super(`Restaurant with id ${id} not found`)
    this.name = 'RestaurantNotFoundError'
  }
}
