import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import routerV1 from "./routes/v1";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './public/v1/openapi.json';
import morgan from 'morgan';

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT ?? 3000);
app.use(compression());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'))

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/v1", routerV1)

// Docs
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
