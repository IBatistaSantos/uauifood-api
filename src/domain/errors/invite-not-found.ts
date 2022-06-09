export class InviteNotFoundError extends Error {
  constructor (inviteId: string) {
    super(`Invite not found: ${inviteId}`)
    this.name = 'InviteNotFoundError'
  }
}
