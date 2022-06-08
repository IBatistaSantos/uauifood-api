import { ListRestaurant } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../helpers'
import { Controller } from './controller'

type HttpRequest = {
  restaurantId: string
}

type Model = Error | Array<{
  id: string
  name: string
  typeCuisine: string
  owner: {
    id: string
    name: string
    email: string
  }
}>

export class ListRestaurantController extends Controller {
  constructor (private readonly listRestaurant: ListRestaurant) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.listRestaurant.execute()

    return data instanceof Error ? badRequest(data) : ok(data)
  }
}
