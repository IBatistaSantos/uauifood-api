import { CreateEmployeeeController } from '@/application/controllers'
import { makeCreateEmployee } from '@/main/factories/features'

export const makeCreateEmployeeController = (): CreateEmployeeeController => {
  return new CreateEmployeeeController(makeCreateEmployee())
}
