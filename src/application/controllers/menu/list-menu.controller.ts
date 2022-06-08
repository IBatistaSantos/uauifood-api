import { GetMenu } from '@/domain/features'

import { badRequest, HttpResponse, ok } from '../../helpers'
import { Controller } from '../controller'
import { ValidationBuilder, Validator } from '../../validation'

type HttpRequest = {
  restaurantId: string
}

type Model = Error | Array<{
  id: string
  name: string
  description: string | null
  price: number
  restaurantId: string
  restaurant: {
    id: string
    name: string
  }
}>

export class GetMenuController extends Controller {
  constructor (private readonly getMenu: GetMenu) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.getMenu.execute({
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
