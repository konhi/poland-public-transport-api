import { ThrowableRouter } from 'itty-router-extras'
import { URLS } from '../../utils/constants'
import { getWrapperRoute } from '../../utils/routeHelpers'
import * as zielonagoraMzkTypes from '../../types/zielonagora/mzk'

const zielonagoraMzkRouter = ThrowableRouter({ base: '/v1/zielonagora/mzk' })

zielonagoraMzkRouter.get('/stops', async (request) =>
  getWrapperRoute(
      request, {
        url: `${ URLS.zielonagora.mzk.baseUrl }?command=basicdata&action=mstops`,
        schema: zielonagoraMzkTypes.stopSchema,
      }
    ),
)

zielonagoraMzkRouter.get('/infos', async (request) =>
  getWrapperRoute(
      request, {
        url: `${ URLS.zielonagora.mzk.baseUrl }?command=infos&format=json`,
        schema: zielonagoraMzkTypes.infosSchema,
      }
    ),
)

zielonagoraMzkRouter.get('/stops/:id/departures', async (request) =>
  getWrapperRoute(
      request, {
        url: `${ URLS.zielonagora.mzk.baseUrl }?command=fs&action=departures&stop=${ request.params?.id }`,
        schema: zielonagoraMzkTypes.stopDepartureSchema,
    }),
)

zielonagoraMzkRouter.get('/stops/:id/info', async (request) =>
  getWrapperRoute(
      request, {
        url: `${ URLS.zielonagora.mzk.baseUrl }?command=fs&action=info&stop=${ request.params?.id }`,
        schema: zielonagoraMzkTypes.stopInfoSchema,
    }),
)

zielonagoraMzkRouter.get('/vehicles', async (request) =>
  getWrapperRoute(
      request, {
        url: `${ URLS.zielonagora.mzk.baseUrl }?command=planner&action=v`,
        schema: zielonagoraMzkTypes.vehicleSchema,
    }),
)


export default zielonagoraMzkRouter
