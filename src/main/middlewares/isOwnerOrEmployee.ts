import { adaptExpressMiddleware } from '../adapters'
import { makeIsOwnerOrEmployeeMiddleware } from '../factories/middlewares/isOwnerOrEmployee'

const isMiddleware = makeIsOwnerOrEmployeeMiddleware()

export const is = adaptExpressMiddleware(isMiddleware)
