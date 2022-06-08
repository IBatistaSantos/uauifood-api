export class UpdateFailedError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'UpdateFailedError'
  }
}
