import { ThrowableRouter } from 'itty-router-extras'
import zielonagoraMzkRouter from './zielonagora/mzk'

const zielonagoraRouter = ThrowableRouter({ base: '/v1/zielonagora' })

zielonagoraRouter.all('/mzk/*', zielonagoraMzkRouter.handle)

export default zielonagoraRouter
