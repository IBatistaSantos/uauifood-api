import { CreateRestaurant } from '@/domain/features'
import { Restaurant, TypeCuisine } from '@/domain/entities'

import { badRequest, HttpResponse, ok } from '../helpers'
import { Controller } from './controller'
import { ValidationBuilder, Validator } from '../validation'

type HttpRequest = {
  name: string
  typeCuisine: string
  owner: {
    name: string
    email: string
    password: string
  }
}

type Model = Error | Restaurant

export class CreateRestaurantController extends Controller {
  constructor (private readonly addresse: CreateRestaurant) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.addresse.execute({
      name: httpRequest.name,
      typeCuisine: httpRequest.typeCuisine as TypeCuisine,
      owner: {
        name: httpRequest.owner.name,
        email: httpRequest.owner.email,
        password: httpRequest.owner.password
      }

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
        .of({ value: httpRequest.typeCuisine, fieldName: 'typeCuisine' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.owner.name, fieldName: 'owner.name' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.owner.email, fieldName: 'owner.email' })
        .required()
        .build(),

      ...ValidationBuilder
        .of({ value: httpRequest.owner.password, fieldName: 'owner.password' })
        .required()
        .build()

    ]
  }
}
