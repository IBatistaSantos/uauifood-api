import { CreateEmployee } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'
import { Employee } from '@/domain/entities'

type HttpRequest = {
  name: string
  email: string
  password: string
  code: string
  restaurantId: string
}

type Model = Error | Employee

export class CreateEmployeeeController extends Controller {
  constructor (private readonly createEmployeeeService: CreateEmployee) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.createEmployeeeService.execute({
      name: httpRequest.name,
      email: httpRequest.email,
      password: httpRequest.password,
      code: httpRequest.code
    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.name, fieldName: 'name' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.email, fieldName: 'email' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.password, fieldName: 'password' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.restaurantId, fieldName: 'restaurantId' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.code, fieldName: 'code' })
        .required()
        .build()

    ]
  }
}
