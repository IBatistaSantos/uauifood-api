import { Hasher } from '@/data/contracts/crypto'
import { LoadRestaurantByNameRepository, LoadUserAccountRepository, SaveRestaurantRepository, SaveUserAccountRepository } from '@/data/contracts/repos'
import { CreateRestaurantService } from '@/data/services'
import { TypeCuisine } from '@/domain/entities'
import { UserAlreadyExistsError } from '@/domain/errors'
import { RestaurantAlreadyExistsError } from '@/domain/errors/restaurant-already-exists'
import { mock, MockProxy } from 'jest-mock-extended'

describe('CreateRestaurantService', () => {
  let sut: CreateRestaurantService
  let userAccountRepository: MockProxy<SaveUserAccountRepository & LoadUserAccountRepository>
  let restaurantRepository: MockProxy<SaveRestaurantRepository & LoadRestaurantByNameRepository>
  let hasher: MockProxy<Hasher>

  beforeAll(() => {
    userAccountRepository = mock()
    restaurantRepository = mock()
    hasher = mock()

    userAccountRepository.load.mockResolvedValue(undefined)
    restaurantRepository.load.mockResolvedValue(undefined)
    hasher.hash.mockResolvedValue('hashed-password')

    userAccountRepository.save.mockResolvedValue({
      id: '1',
      email: 'any_email',
      name: 'any_name',
      password: 'any_password'
    })
    restaurantRepository.save.mockResolvedValue({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      ownerId: '1'
    })
  })

  beforeEach(() => {
    sut = new CreateRestaurantService(userAccountRepository, restaurantRepository, hasher)
  })

  it('should call userAccountRepository.load with correct params', async () => {
    await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(userAccountRepository.load).toHaveBeenCalledWith({ email: 'any_email' })
    expect(userAccountRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should return UserAlreadyExistsError when userAccountRepository.load retuns a user', async () => {
    userAccountRepository.load.mockResolvedValueOnce({
      id: '1',
      email: 'any_email',
      name: 'any_name'
    })

    const result = await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(result).toEqual(new UserAlreadyExistsError('any_name'))
  })

  it('should call restaurantRepository.load with correct params', async () => {
    await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(restaurantRepository.load).toHaveBeenCalledWith({ name: 'any_name_restaurant' })
    expect(restaurantRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should return RestaurantAlreadyExistsError when restaurantRepository.load retuns a restaurant', async () => {
    restaurantRepository.load.mockResolvedValueOnce({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: 'any_type_cuisine',
      ownerId: '1'
    })

    const result = await sut.execute({
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(result).toEqual(new RestaurantAlreadyExistsError('any_name_restaurant'))
  })

  it('should call userAccountRepository.save with correct params', async () => {
    await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(userAccountRepository.save).toHaveBeenCalledWith({
      email: 'any_email',
      name: 'any_name',
      password: 'hashed-password'
    })
    expect(userAccountRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call restaurantRepository.save with correct params', async () => {
    await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(restaurantRepository.save).toHaveBeenCalledWith({
      name: 'any_name',
      typeCuisine: 'Pizza',
      ownerId: '1'
    })
    expect(restaurantRepository.save).toHaveBeenCalledTimes(1)
  })

  it('should call hasher.hash with correct params', async () => {
    await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(hasher.hash).toHaveBeenCalledWith('any_password')
    expect(hasher.hash).toHaveBeenCalledTimes(1)
  })

  it('should returns Restaurant on success', async () => {
    const result = await sut.execute({
      name: 'any_name',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        email: 'any_email',
        name: 'any_name',
        password: 'any_password'
      }
    })

    expect(result).toEqual({
      id: '1',
      name: 'any_name_restaurant',
      typeCuisine: TypeCuisine.Pizza,
      owner: {
        id: '1',
        email: 'any_email',
        name: 'any_name'
      }
    })
  })
})
