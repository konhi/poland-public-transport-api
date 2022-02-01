import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import * as mzkZgoraPlController from "./controllers/mzkzgorapl";

// Create Express server
const app = express();


// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(cors({origin: "*"}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
app.get("/", homeController.index);

/**
 * mzk.zgora.pl routes
 */
const PREFIX_MZKZGORAPL = "/mzkzgorapl/";

app.get(`${PREFIX_MZKZGORAPL}stops`, mzkZgoraPlController.getStops);
app.get(`${PREFIX_MZKZGORAPL}infos`, mzkZgoraPlController.getInfos);
app.get(`${PREFIX_MZKZGORAPL}current_vehicles`, mzkZgoraPlController.getCurrentVehicles);
app.get(`${PREFIX_MZKZGORAPL}stops/:id/departures`, mzkZgoraPlController.getStopDepartures);
app.get(`${PREFIX_MZKZGORAPL}stops/:id/info`, mzkZgoraPlController.getStopInfo);





export default app;
