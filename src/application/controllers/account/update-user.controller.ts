import { UpdateUser } from '@/domain/features'
import { User } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  userId: string
  name?: string
  email?: string
  password?: string
}

type Model = Error | User

export class UpdateUserAccountController extends Controller {
  constructor (private readonly updateUserAccount: UpdateUser) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.updateUserAccount.execute({
      userId: httpRequest.userId,
      name: httpRequest.name,
      email: httpRequest.email,
      password: httpRequest.password

    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.userId, fieldName: 'userId' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.name, fieldName: 'name' })
        .optional()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.password, fieldName: 'password' })
        .optional()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.email, fieldName: 'email' })
        .optional()
        .build()

    ]
  }
}
