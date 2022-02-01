import { Request, Response } from "express";
import fetch from "node-fetch";
import { AnyZodObject } from "zod";
import * as mzkzgorapl from "../models/mzkzgoraplTypes";

/** mzk.zgora.pl's traveller provides few useful data without need for scraping */
const BASE_URL = "https://traveller.mzk.zgora.pl/newvm/main";

async function getJsonFromApiAndParse(url: string, schema: AnyZodObject): Promise<any> {
   const json = await fetch(url)
        .then(res => res.json());

    if (Array.isArray(json)) {
        for (const obj of json) {
            schema.parse(obj);
        }
    }
    else {
        schema.parse(json);
    }

    return json;
}

/**
 * Bus stops list
 * Either friendly-format or what you get from site
 * @route GET mzkzgorapl/stops
 */
export async function getStops(req: Request, res: Response) {
    const stops: mzkzgorapl.Stop[] = await getJsonFromApiAndParse(`${BASE_URL}?command=basicdata&action=mstops`, mzkzgorapl.stopSchema);


    if (req.query.type == "original") {
        res.json(stops);
    } else {
        const formattedStops = stops.map(stop => ({
            type: "stop",
            id: stop.id,
            name: stop.name,
            location: {
                type: "location",
                longitude: stop.lon,
                latitude: stop.lat
            }
        }));

        res.json(formattedStops);
    }
}

/**
 * Stop departures
 * @route GET mzkzgorapl/stops/:id/departures
 */
export async function getStopDepartures(req: Request, res: Response) {
    const url = `${BASE_URL}?command=fs&action=departures&stop=${req.params.id}`;
    const stopDepartures: mzkzgorapl.StopDeparture[] = await getJsonFromApiAndParse(url, mzkzgorapl.stopDepartureSchema);

    res.json(stopDepartures);
}

/**
 * Get stop info
 * @route GET mzkzgorapl/stops/:id/info
 */
export async function getStopInfo(req: Request, res: Response) {
    const url = `${BASE_URL}?command=fs&action=info&stop=${req.params.id}`;
    const info: mzkzgorapl.Info = await getJsonFromApiAndParse(url, mzkzgorapl.stopInfoSchema);

    res.json(info);
}

/**
 * Bus infos
 * @route GET mzkzgorapl/infos
 */
export async function getInfos(req: Request, res: Response) {
    const url = `${BASE_URL}?command=infos&format=json`;
    const infos: mzkzgorapl.Info[] = await getJsonFromApiAndParse(url, mzkzgorapl.infoListItemSchema);

    res.json(infos);
}


/**
 * Current vehicles
 * @route GET mzkzgorapl/current_vehicles
 */
 export async function getCurrentVehicles(req: Request, res: Response) {
    const url = `${BASE_URL}?command=planner&action=v`;
    const currentVehicles: mzkzgorapl.Vehicle[] = await getJsonFromApiAndParse(url, mzkzgorapl.vehicleSchema);

    if (req.query.type == "original") {
        res.json(currentVehicles);
    } else {
        const formattedVehicles = currentVehicles.map(vehicle => ({
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

        res.json(formattedVehicles);
    }
}
