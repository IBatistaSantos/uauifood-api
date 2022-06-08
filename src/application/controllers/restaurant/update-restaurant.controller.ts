import { UpdateRestaurant } from '@/domain/features'
import { Restaurant, TypeCuisine } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'

type HttpRequest = {
  name?: string
  typeCuisine?: string
  restaurantId: string
}

type Model = Error | Restaurant

export class UpdateRestaurantController extends Controller {
  constructor (private readonly updatedRestaurant: UpdateRestaurant) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.updatedRestaurant.execute({
      name: httpRequest.name,
      typeCuisine: httpRequest.typeCuisine as TypeCuisine,
      restaurantId: httpRequest.restaurantId
    })

    return data instanceof Error ? badRequest(data) : ok(data)
  }
}
