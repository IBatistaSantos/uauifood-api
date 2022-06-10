/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { RequestHandler } from 'express'

import { Middleware } from '@/application/middlewares'

export type ExpressMiddleware = (middleware: Middleware) => RequestHandler

export const adaptExpressMiddleware: ExpressMiddleware = (middleware) => async (req, res, next) => {
  const { headers, params, body, locals } = req

  const httpRequest = {
    headers,
    params,
    body,
    locals
  }
  const { statusCode, data } = await middleware.handle(httpRequest)

  if (statusCode >= 400) {
    return res.status(statusCode).send({ error: data.message })
  }

  req.locals = {
    ...req.locals,
    ...Object
      .entries(data)
      .reduce((acc, [key, value]) => (value ? { ...acc, [key]: value } : acc), {})
  }

  return next()
}
