export interface SendInviteEmployeeRepository {
  send: (params: SendInviteEmployee.Params) => Promise<void>
}

export namespace SendInviteEmployee {
  export type Params = {
    email: string
    name: string
    code: string
    restaurantId: string
  }

}
