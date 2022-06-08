import { DeleteMenu } from '@/domain/features'

import { HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  restaurantId: string
  itemId: string
}

type Model = {
  message: string
}

export class DeleteMenuController extends Controller {
  constructor (private readonly deleteMenu: DeleteMenu) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteMenu.execute({
      itemId: httpRequest.itemId,
      restaurantId: httpRequest.restaurantId
    })

    return ok({
      message: 'Menu deleted successfully'
    })
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
