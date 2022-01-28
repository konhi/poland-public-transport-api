import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";

// Controllers (route handlers)
import * as homeController from "./controllers/home";

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

export default app;
