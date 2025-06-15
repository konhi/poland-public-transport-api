import { Hono } from "hono";
import { fetcher } from "./utils/fetch";
import { describeRoute, openAPISpecs } from "hono-openapi";
import { zValidator } from "@hono/zod-validator";
import { zVehicleResponse } from "./schema/zg/get-vehicle-list";
import {
  resolver,
} from 'hono-openapi/zod'

const app = new Hono();

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Poland Public Transport API",
				version: "1.0.0",
				description: "API for public transport in Poland",
			},
			servers: [
				{
					url: "https://poland-public-transport-api.konhi.workers.dev",
					description: "Production Server",
				},
			],
		},
	}),
);

app.get(
  "/zg/vehicles",
	describeRoute({
		operationId: "getZgVehicles",
		description: "Get list of vehicles",
		responses: {
			200: {
				description: "List of vehicles with their current status and location",
        content: {
          'text/plain': { schema: resolver(zVehicleResponse) },
        }
			},
		},
	}),
	zValidator("json", zVehicleResponse),
	async (c) => {
		const response = await fetcher({
			endpoint: "ZG_GET_VEHICLES_LIST",
		});

		return c.json({
			vehicleList: response.VL.p.map((vehicle) => ({
				vehicleId: vehicle[0],
				lineNumber: vehicle[2].trim(),
				routeVariant: vehicle[3],
				direction: vehicle[4],
				courseId: vehicle[5],
				stopSequence: vehicle[6],
				plannedRoute: vehicle[7],
				actualRoute: vehicle[8],
				location: {
					x: vehicle[9],
					y: vehicle[10],
				},
				previousLocation: {
					x: vehicle[11],
					y: vehicle[12],
				},
				deviation: vehicle[13],
				deviationDirection: vehicle[14],
				status: vehicle[15],
				plannedStartTime: vehicle[16],
				nextCourseId: vehicle[17],
				nextPlannedStartTime: vehicle[18],
				nextLineNumber: vehicle[19],
				nextRouteVariant: vehicle[20],
				nextDirection: vehicle[21],
				secondsToDeparture: vehicle[22],
				vehicleType: vehicle[23],
				vector: vehicle.length > 27 ? vehicle[27] : -1,
				isElectric: vehicle.length > 28 ? vehicle[28] === 1 : false,
				finalStop: vehicle[25],
				initialStop: vehicle[26],
			})),
		});
	},
);

export default app;
