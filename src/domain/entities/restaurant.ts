export type Restaurant = {
  id: string
  name: string
  typeCuisine: TypeCuisine
  owner: {
    id: string
    name: string
    email: string
  }
}
export enum TypeCuisine {
  Arabe = 'Arabe',
  Brasileira = 'Brasileira',
  Chinesa = 'Chinesa',
  Pizza = 'Pizza'
}
