
export interface SendInviteEmployee {
  execute: (params: SendInviteEmployee.Params) => Promise<SendInviteEmployee.Result>
}

export namespace SendInviteEmployee {
  export type Params = {
    email: string
    name: string
    restaurantId: string
  }

  export type Result = Error | {
    message: string
  }

}
