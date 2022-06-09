import { SendInviteEmployee } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  name: string
  email: string
  restaurantId: string
}

type Model = Error | {
  message: string
}

export class SendInviteController extends Controller {
  constructor (private readonly sendInviteService: SendInviteEmployee) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.sendInviteService.execute({
      name: httpRequest.name,
      email: httpRequest.email,
      restaurantId: httpRequest.restaurantId
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
        .of({ value: httpRequest.restaurantId, fieldName: 'restaurantId' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.email, fieldName: 'email' })
        .required()
        .build()

    ]
  }
}
