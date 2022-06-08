import { CreateMenu } from '@/domain/features'
import { Menu } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  name: string
  description: string | null
  price: number
  restaurantId: string
}

type Model = Error | Menu

export class CreateMenuController extends Controller {
  constructor (private readonly createMenu: CreateMenu) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.createMenu.execute({
      name: httpRequest.name,
      description: httpRequest.description ?? null,
      price: httpRequest.price,
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
        .of({ value: httpRequest.price, fieldName: 'price' })
        .required()
        .build()

    ]
  }
}
