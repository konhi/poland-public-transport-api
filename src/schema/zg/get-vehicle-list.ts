import { z } from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

const zDirection = z.enum(["P", "T", "Z", ""]);
const zStatus = z.enum(["NE", "N"]);

const zVehicle = z.tuple([
	z.number(),
	z.number(),
	z.string(),
	z.string(),
	zDirection,
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.number(),
	z.string(),
	z.number(),
	z.string(),
	z.number(),
	z.string(),
	z.string(),
	z.string(),
	z.string(),
	z.number(),
	z.string(),
	zStatus,
	z.string(),
	z.string(),
	z.number(),
	z.number(),
]);

const zGetVehicleListResponse = z.object({
	VL: z.object({
		p: z.array(
			z
				.string()
				.transform((str) => JSON.parse(str))
				.pipe(zVehicle),
		),
	}),
});

const zVehicleResponse = z.object({
	vehicleList: z.array(
		z.object({
			vehicleId: z.number(),
			lineNumber: z.string(),
			routeVariant: z.string(),
			direction: zDirection,
			courseId: z.number(),
			stopSequence: z.number(),
			plannedRoute: z.number(),
			actualRoute: z.number(),
			location: z.object({
				x: z.number(),
				y: z.number(),
			}),
			previousLocation: z.object({
				x: z.number(),
				y: z.number(),
			}),
			deviation: z.number(),
			deviationDirection: z.string(),
			status: z.number(),
			plannedStartTime: z.string(),
			nextCourseId: z.number(),
			nextPlannedStartTime: z.string(),
			nextLineNumber: z.string(),
			nextRouteVariant: z.string(),
			nextDirection: z.string(),
			secondsToDeparture: z.number(),
			vehicleType: z.string(),
			vector: z.number(),
			isElectric: z.boolean(),
			finalStop: z.string(),
			initialStop: z.string(),
		}),
	),
});

export { zGetVehicleListResponse, zVehicleResponse };
