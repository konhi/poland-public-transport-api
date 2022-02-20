import { ThrowableRouter } from 'itty-router-extras'
import zielonagoraMzkRouter from './zielonagora/mzk'

const zielonagoraRouter = ThrowableRouter({ base: '/api/zielonagora' })

zielonagoraRouter.all('/mzk/*', zielonagoraMzkRouter.handle)

export default zielonagoraRouter
