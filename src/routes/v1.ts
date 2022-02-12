import express from "express";
import * as zielonagoraMzkStops from "../controllers/zielonagora/mzk/v1/stops";
import * as zielonagoraMzkVehicles from "../controllers/zielonagora/mzk/v1/vehicles";
import * as zielonagoraMzkInfos from "../controllers/zielonagora/mzk/v1/infos";
import apicache from "apicache";

const routerV1 = express.Router();

// Server-side cache
const cache = apicache.middleware;

// zielonagora
const PREFIX_ZIELONAGORA = "/zielonagora/";

// - mzk
const PREFIX_ZIELONAGORA_MZK = `${PREFIX_ZIELONAGORA}mzk/`;

// -- stops
routerV1.get(
  `${PREFIX_ZIELONAGORA_MZK}stops`,
  cache("1 minute"),
  zielonagoraMzkStops.getStops
);
routerV1.get(
  `${PREFIX_ZIELONAGORA_MZK}stops/:id/departures`,
  cache("1 minute"),
  zielonagoraMzkStops.getStopDepartures
);
routerV1.get(
  `${PREFIX_ZIELONAGORA_MZK}stops/:id/infos`,
  cache("1 minute"),
  zielonagoraMzkStops.getStopInfo
);

// -- infos
routerV1.get(
  `${PREFIX_ZIELONAGORA_MZK}infos`,
  cache("5 minutes"),
  zielonagoraMzkInfos.getInfos
);

// -- vehicles
routerV1.get(
  `${PREFIX_ZIELONAGORA_MZK}current_vehicles`,
  cache("15 seconds"),
  zielonagoraMzkVehicles.getCurrentVehicles
);

export default routerV1