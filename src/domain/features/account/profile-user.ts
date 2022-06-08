import { User } from '@/domain/entities'

export interface ProfileUser {
  execute: (params: ProfileUser.Params) => Promise<ProfileUser.Result>
}

export namespace ProfileUser {
  export type Params = {
    userId: string
  }

  export type Result = Error | User
}
