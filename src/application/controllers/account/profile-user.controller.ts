import { ProfileUser } from '@/domain/features'
import { User } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  userId: string
}

type Model = Error | User

export class ProfileController extends Controller {
  constructor (private readonly profileUser: ProfileUser) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.profileUser.execute({
      userId: httpRequest.userId

    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.userId, fieldName: 'userId' })
        .required()
        .build()

    ]
  }
}
