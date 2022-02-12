import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import routerV1 from "./routes/v1";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(compression());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/v1", routerV1)

export default app;
