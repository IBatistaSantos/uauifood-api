import { Employee } from '@/domain/entities'

export interface SendInviteEmployeeRepository {
  send: (params: SendInviteEmployee.Params) => Promise<void>
}
export interface LoadInviteByCodeRepository {
  loadByCode: (params: LoadInviteByCode.Params) => Promise<LoadInviteByCode.Result>
}

export interface UpdateInviteEmployeeRepository {
  updateInvite: (params: UpdateInviteEmployee.Params) => Promise<void>
}

export interface SaveEmployeeRepository {
  save: (params: SaveEmployee.Params) => Promise<SaveEmployee.Result>
}

export namespace SaveEmployee {
  export type Params = {
    userId: string
    restaurantId: string
  }
  export type Result = Employee | undefined
}

export namespace UpdateInviteEmployee {
  export type Params = {
    inviteId: string
    status: string
  }
}

export namespace LoadInviteByCode {
  export interface Params {
    code: string
  }
  export type Result = undefined | {
    id: string
    restaurantId: string
    status: string
  }
}

export namespace SendInviteEmployee {
  export type Params = {
    email: string
    name: string
    code: string
    restaurantId: string
  }

}
