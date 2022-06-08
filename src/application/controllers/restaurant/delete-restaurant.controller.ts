import { DeleteRestaurant } from '@/domain/features'

import { HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  restaurantId: string
}

type Model = {
  message: string
}

export class DeleteRestaurantController extends Controller {
  constructor (private readonly deleteRestaurant: DeleteRestaurant) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    await this.deleteRestaurant.execute({
      restaurantId: httpRequest.restaurantId
    })

    return ok({
      message: 'Restaurant deleted successfully'
    })
  }

  buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder
        .of({ value: httpRequest.restaurantId, fieldName: 'restaurantId' })
        .required()
        .build()

    ]
  }
}
