import { DetailsRestaurant } from '@/domain/features'
import { Restaurant } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../helpers'
import { Controller } from './controller'
import { ValidationBuilder, Validator } from '../validation'

type HttpRequest = {
  restaurantId: string
}

type Model = Error | Restaurant

export class DetailsRestaurantController extends Controller {
  constructor (private readonly detailsRestaurant: DetailsRestaurant) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.detailsRestaurant.execute({
      restaurantId: httpRequest.restaurantId
    })

    return data instanceof Error ? badRequest(data) : ok(data)
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
