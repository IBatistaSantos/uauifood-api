import { User } from '@/domain/entities'

export interface LoadUserAccountByEmailRepository {
  loadByEmail: (params: LoadUserAccountByEmailRepository.Params) => Promise<LoadUserAccountByEmailRepository.Result>
}

export interface SaveUserAccountRepository {
  save: (params: SaveUserAccountRepository.Params) => Promise<SaveUserAccountRepository.Result>
}

export interface LoadUserAccountByIdRepository {
  loadById: (params: LoadUserAccountByIdRepository.Params) => Promise<LoadUserAccountByIdRepository.Result>
}

export interface UpdateUserAccountRepository {
  update: (params: UpdateUserAccountRepository.Params) => Promise<UpdateUserAccountRepository.Result>
}

export namespace UpdateUserAccountRepository {
  export type Params = {
    userId: string
    name?: string
    email?: string
    password?: string
  }

  export type Result = Error | User
}

export namespace LoadUserAccountByIdRepository {
  export type Params = {
    userId: string
  }

  export type Result = undefined | User
}

export namespace LoadUserAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name: string
    email: string
    password: string
  }
}

export namespace SaveUserAccountRepository {
  export type Params = {
    email: string
    name: string
    password: string
  }

  export type Result = {
    id: string
    email: string
    name: string
    password: string
  }
}
