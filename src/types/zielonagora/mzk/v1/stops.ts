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
export type Stop = z.infer<typeof stopSchema>;

export const stopInfoSchema = z.object({
  // -1162435876
  id: z.number(),
  // :"\u0026nbsp;\u0026nbsp;\u0026nbsp;***\u0026nbsp;\u0026nbsp;\u0026nbsp;UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI\u0026nbsp;\u0026nbsp;\u0026nbsp;***\u0026nbsp;\u0026nbsp;\u0026nbsp;INFO: Od 17.01. do 27.02. autobusy kursują wg rozkładu jazdy oznaczonego na tabliczkach przystankowych jako \"Poniedziałek - piątek\r\nW FERIE I WAKACJE\" - niebieska kolumna w rozkładzie jazdy.
  text: z.string().min(1),
});

export type Info = z.infer<typeof stopInfoSchema>;

export const stopDepartureSchema = z.object({
  // 00:00
  time: z.string().min(1),
  // 55
  line: z.string().min(1),
  // Tylko dla klientów Auchan
  destination: z.string().min(1),
  // Dekoracyjna
  stop: z.string().min(1),
});

export type StopDeparture = z.infer<typeof stopDepartureSchema>;
