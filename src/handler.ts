import { Request } from 'itty-router'
import { ThrowableRouter } from 'itty-router-extras'
import zielonagoraRouter from './handlers/zielonagora'
import { json } from 'itty-router-extras'

const router = ThrowableRouter({ base: '/api' })

router
  .all('/zielonagora/*', zielonagoraRouter.handle)
  .all('*', () => json({message: "Incorrect path name. Please check docs", status: 404 }))

export const handleRequest = (request: Request) => router.handle(request)
