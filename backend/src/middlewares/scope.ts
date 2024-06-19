import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { APP_NAME, SECRET } from "../constants/env.js";
import { IToken } from "../interfaces/IToken.js";

type Scope =
  | string
  | ((request: Request) => string[] | string | undefined | null | true | false)

export function scope(...oneOf: [Scope, ...Scope[]]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next(new Error('Unauthorized'))

    const accessToken = req.headers.authorization.replace('Bearer ', '')

    jwt.verify(
      accessToken,
      SECRET,
      { audience: APP_NAME, issuer: APP_NAME },
      (err, payload) => {
        if (err) return next(new Error('Unauthorized'))

        if (typeof payload !== 'object') return next(new Error('Forbidden'))

        if (typeof payload.sub !== 'string') return next(new Error('Forbidden'))

        if (!Array.isArray(payload.scopes)) return next(new Error('Forbidden'))

        req.token = payload as IToken

        if (payload.scopes.includes('*')) return next()

        for (const pattern of oneOf) {
          if (typeof pattern === 'function') {
            const scope = pattern(req)

            if (scope === true) return next()

            if (!scope) continue

            if (!Array.isArray(scope)) {
              if (payload.scopes.includes(scope)) return next()
            }

            else for (const pattern of scope)
              if (payload.scopes.includes(pattern)) return next()
          }

          const scope = pattern

          if (!scope) continue

          if (payload.scopes.includes(scope)) return next()
        }

        return next(new Error('Forbidden'))
      })
  }
}
