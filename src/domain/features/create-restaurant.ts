import { Restaurant } from '../entities'

export interface CreateRestaurant {
  execute: (params: CreateRestaurant.Params) => Promise<CreateRestaurant.Result>
}

export namespace CreateRestaurant {
  export type Params = {
    name: string
    typeCuisine: TypeCuisine
    owner: {
      name: string
      email: string
      password: string
    }
  }
  export type Result = Error | Restaurant
}

export enum TypeCuisine {
  Arabe = 'Arabe',
  Brasileira = 'Brasileira',
  Chinesa = 'Chinesa',
  Pizza = 'Pizza'
}
