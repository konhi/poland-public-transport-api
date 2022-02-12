import { z } from "zod";

// ?command=infos and ?command=fs&action=info& return different objects, it's the reason for separate types
export const infoSchema = z.object({
  // 	"1083" (getInfos)
  id: z.string().min(1),
  // 	"UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI"
  text: z.string().min(1),
  // 	1642388400000
  validity_start: z.number(),
  // 	1646001300000
  validity_end: z.number(),
  // 0
  start_time: z.number(),
  // 0
  end_time: z.number(),
});

export type Info = z.infer<typeof infoSchema>;
