import { Request } from 'itty-router'
import { missing, ThrowableRouter } from 'itty-router-extras'
import zielonagoraRouter from './handlers/zielonagora'

const router = ThrowableRouter({ base: '/v1' })

router
  .all('/zielonagora/*', zielonagoraRouter.handle)
  .all('/*', () => missing())

function handleRequest(request: Request) {
  return router.handle(request)
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
