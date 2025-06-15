import { z } from "zod";

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

export const zGetVehicleListResponse = z.object({
	VL: z.object({
		p: z.array(
			z
				.string()
				.transform((str) => JSON.parse(str))
				.pipe(zVehicle),
		),
	}),
});
