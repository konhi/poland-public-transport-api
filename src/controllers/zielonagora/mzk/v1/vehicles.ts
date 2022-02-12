import { URLS } from "../../../../constants/urls";
import { getJson } from "../../../../utils/fetching";
import { Request, Response } from "express";
import * as realtimeVehiclesTypes from "../../../../types/zielonagora/mzk/v1/vehicles";
import { z } from "zod";

export async function getCurrentVehicles(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=planner&action=v`;
  const schema = z.array(realtimeVehiclesTypes.vehicleSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedVehicles = parsingResult.data.map(
      (vehicle: realtimeVehiclesTypes.Vehicle) => ({
        vehicle: {
        id: vehicle.id,
        label: vehicle.label,
        line: {
          label: vehicle.lineLabel
        },
        departure: {
          id: vehicle.depid,
        },
        group: vehicle.type,
        location: {
          longitude: vehicle.lon,
          latitude: vehicle.lat,
        },
        }

      })
    );

    res.json(transformedVehicles);
  } else {
    res.status(500).json(parsingResult);
  }
}
