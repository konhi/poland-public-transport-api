import { missing, ThrowableRouter } from 'itty-router-extras'
import gorzowRouter from './handlers/gorzow'
import zielonagoraRouter from './handlers/zielonagora'

const router = ThrowableRouter()

router
  .all('/v1/zielonagora/*', zielonagoraRouter.handle)
  .all('/v1/gorzow/*', gorzowRouter.handle)
  .all('/*', () => missing())


export default {
  fetch: router.handle
}