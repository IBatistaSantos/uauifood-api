import { UpdateMenu } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  restaurantId: string
  itemId: string
  name?: string
  description?: string | null
  price?: number
}

type Model = Error | {
  id: string
  name: string
  description: string | null
  price: number
  restaurantId: string
}

export class UpdateMenuController extends Controller {
  constructor (private readonly updateMenu: UpdateMenu) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.updateMenu.execute({
      itemId: httpRequest.itemId,
      name: httpRequest.name,
      description: httpRequest.description ?? undefined,
      price: httpRequest.price,
      restaurantId: httpRequest.restaurantId
    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.restaurantId, fieldName: 'restaurantId' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.itemId, fieldName: 'itemId' })
        .required()
        .build()

    ]
  }
}
