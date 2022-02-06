import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";


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

router.get(`${PREFIX_ZIELONAGORA_MZK}stops`, zielonagoraMzkController.getStops);
router.get(`${PREFIX_ZIELONAGORA_MZK}infos`, zielonagoraMzkController.getInfos);
router.get(`${PREFIX_ZIELONAGORA_MZK}current_vehicles`, zielonagoraMzkController.getCurrentVehicles);
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/departures`, zielonagoraMzkController.getStopDepartures);
router.get(`${PREFIX_ZIELONAGORA_MZK}stops/:id/info`, zielonagoraMzkController.getStopInfo);


// API versioning
app.use('/v1', router)




export default app;
