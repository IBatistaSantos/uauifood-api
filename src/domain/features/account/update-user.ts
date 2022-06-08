import { User } from '@/domain/entities'

export interface UpdateUser {
  execute: (params: UpdateUser.Params) => Promise<UpdateUser.Result>
}

export namespace UpdateUser {
  export type Params = {
    userId: string
    name?: string
    email?: string
    password?: string
  }

  export type Result = Error | User
}
