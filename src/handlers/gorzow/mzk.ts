import { ThrowableRouter } from 'itty-router-extras'
import { URLS } from '../../utils/constants'
import { getWrapperRoute } from '../../utils/routeHelpers'
import * as gorzowMzkTypes from '../../types/gorzow/mzk'

const gorzowMzkRouter = ThrowableRouter({ base: '/v1/gorzow/mzk' })

gorzowMzkRouter.get('/stops', async (request) =>
  getWrapperRoute(request, {
    url: `${URLS.gorzow.mzk.baseUrl}?command=basicdata&action=mstops`,
    schema: gorzowMzkTypes.stopSchema,
  }),
)

gorzowMzkRouter.get('/infos', async (request) =>
  getWrapperRoute(request, {
    url: `${URLS.gorzow.mzk.baseUrl}?command=infos&format=json`,
    schema: gorzowMzkTypes.infosSchema,
  }),
)

gorzowMzkRouter.get('/stops/:id/departures', async (request) =>
  getWrapperRoute(request, {
    url: `${URLS.gorzow.mzk.baseUrl}?command=fs&action=departures&stop=${request.params?.id}`,
    schema: gorzowMzkTypes.stopDepartureSchema,
    fixEscapeCharacters: true,
  }),
)

gorzowMzkRouter.get('/stops/:id/info', async (request) =>
  getWrapperRoute(request, {
    url: `${URLS.gorzow.mzk.baseUrl}?command=fs&action=info&stop=${request.params?.id}`,
    schema: gorzowMzkTypes.stopInfoSchema,
  }),
)

gorzowMzkRouter.get('/vehicles', async (request) =>
  getWrapperRoute(request, {
    url: `${URLS.gorzow.mzk.baseUrl}?command=planner&action=v`,
    schema: gorzowMzkTypes.vehicleSchema,
  }),
)

export default gorzowMzkRouter
