import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'
import apicache from 'apicache'

// Controllers (route handlers)
import * as zielonagoraMzkStops from './routes/zielonagora/mzk/stops'
import * as zielonagoraMzkVehicles from './routes/zielonagora/mzk/vehicles'
import * as zielonagoraMzkInfos from './routes/zielonagora/mzk/infos'

// Create Express server
const app = express()

// Express configuration
app.set('port', process.env.PORT ?? 3000)
app.use(compression())
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Server-side cache
const cache = apicache.middleware

// // Static files
app.use(express.static(path.join(__dirname, 'public')))

// Routes
const router = express.Router()

// zielonagora
const PREFIX_ZIELONAGORA = '/zielonagora/'

// - mzk
const PREFIX_ZIELONAGORA_MZK = `${PREFIX_ZIELONAGORA}mzk/`

// -- stops
router.get(`${PREFIX_ZIELONAGORA_MZK}stops`, cache('1 minute'), zielonagoraMzkStops.getStops)
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/departures`, cache('1 minute'), zielonagoraMzkStops.getStopDepartures)
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/info`, cache('1 minute'), zielonagoraMzkStops.getStopInfo)

// -- infos
router.get(`${PREFIX_ZIELONAGORA_MZK}infos`, cache('5 minutes'), zielonagoraMzkInfos.getInfos)

// -- vehicles
router.get(`${PREFIX_ZIELONAGORA_MZK}current_vehicles`, cache('15 seconds'), zielonagoraMzkVehicles.getCurrentVehicles)

// API versioning
app.use('/v1', router)

export default app
