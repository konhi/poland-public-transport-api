import { z } from 'zod'

// ?command=infos and ?command=fs&action=info& return different objects, it's the reason for separate types
export const infosSchema = z.array(
  z.object({
    // 	""
    id: z.string(),
    // 	"Od dnia 01.07.2022 r. w związku z uszkodzeniem nawierzchni ul. Mickiewicza zmiana trasy linii T2. Szczegóły www.mzk-gorzow.com.pl"
    text: z.string().min(1),
    // 	1657144800000
    validity_start: z.number().optional(),
    // 	1657403940000
    validity_end: z.number().optional(),
    // 0
    start_time: z.number().optional(),
    // 0
    end_time: z.number().optional(),
  }),
)

export const stopSchema = z.array(
  z.object({
    // 000000001224
    id: z.string().min(1),
    // 1298
    alt_id: z.string(),
    // Centrum Dystrybucyjne Biedronka
    name: z.string().min(1),
    // <empty>
    address: z.string(),
    // 52.7487040176656
    lat: z.number(),
    // 15.1379156112671
    lon: z.number(),
    // 3
    linetype: z.string(),
  }),
)

export const stopDepartureSchema = z.array(
  z.object({
    // 3 min
    time: z.string().min(1),
    // 124
    line: z.string().min(1),
    // Os. Staszica
    destination: z.string().min(1),
    // Matejki
    stop: z.string().min(1),
  }),
)

export const stopInfoSchema = z.object({
  // -1162435876
  id: z.number(),
  // "&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;Od dnia 01.07.2022 r. w związku z uszkodzeniem nawierzchni ul. Mickiewicza zmiana trasy linii T2. Szczegóły www.mzk-gorzow.com.pl"
  text: z.string().min(1),
})

export const vehicleSchema = z.array(
  z.object({
    // 655
    id: z.string().min(1),
    // 26
    label: z.string().min(1),
    // 126
    lineLabel: z.string().min(1),
    // 	52.741105
    lat: z.number(),
    //  15.244
    lon: z.number(),
    // 0
    time: z.number(),
    // 	49741830
    depid: z.number(),
    // "Autobus"
    type: z.string(),
  }),
)
