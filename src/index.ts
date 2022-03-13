import { Request } from 'itty-router'
import { missing, ThrowableRouter } from 'itty-router-extras'
import zielonagoraRouter from './handlers/zielonagora'

const router = ThrowableRouter({ base: '/v1' })

router
  .all('/zielonagora/*', zielonagoraRouter.handle)
  .all('/*', () => missing())


export default {
  fetch: router.handle
}