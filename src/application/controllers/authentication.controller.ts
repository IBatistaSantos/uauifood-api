import { Authentication } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../helpers'
import { Controller } from './controller'
import { ValidationBuilder, Validator } from '../validation'

type HttpRequest = {
  email: string
  password: string
}

type Model = Error | any

export class AuthenticationController extends Controller {
  constructor (private readonly authentication: Authentication) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.authentication.execute({
      email: httpRequest.email,
      password: httpRequest.password
    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.email, fieldName: 'email' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.password, fieldName: 'password' })
        .required()
        .build()

    ]
  }
}
