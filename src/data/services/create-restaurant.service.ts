import { UserAlreadyExistsError } from '@/domain/errors'
import { RestaurantAlreadyExistsError } from '@/domain/errors/restaurant-already-exists'
import { CreateRestaurant } from '@/domain/features'
import { Hasher } from '../contracts/crypto'
import { LoadRestaurantByNameRepository, LoadUserAccountRepository, SaveRestaurantRepository, SaveUserAccountRepository } from '../contracts/repos'

export class CreateRestaurantService implements CreateRestaurant {
  constructor (
    private readonly userAccountRepository: SaveUserAccountRepository & LoadUserAccountRepository,
    private readonly restaurantRepository: SaveRestaurantRepository & LoadRestaurantByNameRepository,
    private readonly hasher: Hasher
  ) {}

  async execute (params: CreateRestaurant.Params): Promise<CreateRestaurant.Result> {
    const { name, typeCuisine, owner } = params

    const user = await this.userAccountRepository.load({ email: owner.email })

    if (user !== undefined) {
      return new UserAlreadyExistsError(name)
    }

    const restaurant = await this.restaurantRepository.load({ name })

    if (restaurant !== undefined) {
      return new RestaurantAlreadyExistsError(restaurant.name)
    }

    const hashedPassword = await this.hasher.hash(owner.password)

    const newUser = await this.userAccountRepository.save({
      email: owner.email,
      name: owner.name,
      password: hashedPassword
    })

    const newRestaurant = await this.restaurantRepository.save({
      name,
      typeCuisine,
      ownerId: newUser.id
    })

    return {
      id: newRestaurant.id,
      name: newRestaurant.name,
      typeCuisine: newRestaurant.typeCuisine,
      owner: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }
  }
}
