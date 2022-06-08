export class MenuAlreadyExistsError extends Error {
  constructor (menuName: string, restaurantId: string) {
    super(`Menu ${menuName} already exists from restaurant ${restaurantId}`)
  }
}
