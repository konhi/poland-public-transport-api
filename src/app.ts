import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import apicache from "apicache";


// Controllers (route handlers)
import * as zielonagoraMzkController from "./controllers/zielonagora/mzk";

// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Server-side cache
const cache = apicache.middleware; 


// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));


// Routes
const router = express.Router();

/**
 * Zielona Gora
*/
const PREFIX_ZIELONAGORA = "/zielonagora/";

// mzk.zgora.pl
const PREFIX_ZIELONAGORA_MZK = `${PREFIX_ZIELONAGORA}mzk/`;

// Stops and info aren't usually updated, but we want fresh data when it's needed
router.get(`${PREFIX_ZIELONAGORA_MZK}stops`, cache("5 minutes"), zielonagoraMzkController.getStops);
router.get(`${PREFIX_ZIELONAGORA_MZK}infos`, cache("5 minutes"), zielonagoraMzkController.getInfos);
// Vehicles are updated per 15 seconds
router.get(`${PREFIX_ZIELONAGORA_MZK}current_vehicles`, cache("15 seconds"), zielonagoraMzkController.getCurrentVehicles);
// Stops are updated per 1 minute
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/departures`, cache("1 minute"), zielonagoraMzkController.getStopDepartures);
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/info`, cache("1 minute"), zielonagoraMzkController.getStopInfo);


// API versioning
app.use("/v1", router);




export default app;
