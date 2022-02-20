import { ThrowableRouter } from 'itty-router-extras'
import Stops from '../../controllers/zielonagora/mzk/stops'

const zielonagoraMzkRouter = ThrowableRouter({ base: '/api/zielonagora/mzk' })

zielonagoraMzkRouter.get('/stops', Stops)

export default zielonagoraMzkRouter
