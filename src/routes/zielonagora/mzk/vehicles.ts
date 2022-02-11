import { URLS } from "../../../utils/urls";
import { getAndParseJson } from "../../../utils/fetching";
import { Request, Response } from "express";
import * as realtimeVehiclesTypes from "../../../types/zielonagora/mzk/vehicles";

export async function getCurrentVehicles(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=planner&action=v`;
  const schema = realtimeVehiclesTypes.vehicleListSchema;

  const parsingResult = await getAndParseJson(url, schema);

       if (parsingResult.success) {
          const transformedVehicles = parsingResult.data.map((vehicle: realtimeVehiclesTypes.Vehicle) => ({
             type: "vehicle",
             id: vehicle.id,
             label: vehicle.label,
             line_label: vehicle.lineLabel,
             departure_id: vehicle.depid,
             vehicle_group: vehicle.type,
             location: {
                 type: "location",
                 longitude: vehicle.lon,
                 latitude: vehicle.lat
             }
          }));

          res.json(transformedVehicles);
       } else {
          res.status(500).json(parsingResult);
       }
    }