export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
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

export interface SaveUserAccountRepository {
  save: (params: SaveUserAccountRepository.Params) => Promise<SaveUserAccountRepository.Result>
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
