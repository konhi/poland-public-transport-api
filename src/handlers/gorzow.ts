import { ThrowableRouter } from 'itty-router-extras'
import gorzowMzkRouter from './gorzow/mzk'

const gorzowRouter = ThrowableRouter({ base: '/v1/gorzow' })
gorzowRouter.all('/mzk/*', gorzowMzkRouter.handle)

export default gorzowRouter