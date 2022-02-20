import { z } from "zod";

export const stopSchema = z.object({
  // 75
  id: z.string().min(1),
  // 75
  alt_id: z.string(),
  // 1 Maja
  name: z.string().min(1),
  // <empty>
  address: z.string(),
  // 51.9358916666667
  lat: z.number(),
  // on	15.4960388888889
  lon: z.number(),
});