import { z } from "zod";

export const vehicleSchema = z.object({
  // 318
  id: z.string().min(1),
  // 44
  label: z.string().min(1),
  // 44
  lineLabel: z.string().min(1),
  // 	51.92799
  lat: z.number(),
  // 	15.50229
  lon: z.number(),
  // 0
  time: z.number(),
  // 	284724547
  depid: z.number(),
  // "Autobusy Elektryczne"
  type: z.string(),
});
export type Vehicle = z.infer<typeof vehicleSchema>