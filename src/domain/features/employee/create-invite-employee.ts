import { Employee } from '@/domain/entities'

export interface CreateEmployee {
  execute: (params: CreateEmployee.Params) => Promise<CreateEmployee.Result>
}

export namespace CreateEmployee {
  export type Params = {
    email: string
    name: string
    password: string
    code: string
  }

  export type Result = Error | Employee

}
