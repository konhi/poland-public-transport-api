import { Request, Response } from "express";
import fetch from "node-fetch";
import { AnyZodObject } from "zod";
import * as mzkzgorapl from "../../models/zielonagora/mzkTypes";

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
 * @api {get} /v1/zielonagora/mzk/stops getStops
 * @apiGroup zielonagora/mzk
 * @apiVersion 1.0.0
 * 
 * @apiQuery {Boolean} original Whether should return an original object or transformed (which tries to be consistent and easier to use) false=defaltValue
 * @apiSuccessExample {json} Success-Response: [
   {
      "type":"stop",
      "id":"75",
      "name":"1 Maja",
      "location":{
         "type":"location",
         "longitude":15.4960388888889,
         "latitude":51.9358916666667
      }
   },
   {
      "type":"stop",
      "id":"219",
      "name":"1 Maja",
      "location":{
         "type":"location",
         "longitude":15.496792023807373,
         "latitude":51.93532294108886
      }
   }
]
 */
export async function getStops(req: Request, res: Response) {
    const stops: mzkzgorapl.Stop[] = await getJsonFromApiAndParse(`${BASE_URL}?command=basicdata&action=mstops`, mzkzgorapl.stopSchema);


    if (req.query.original) {
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
 * @api {get} /v1/zielonagora/mzk/stops/:id/departures getStopDepartures
 * 
 * @apiParam {Number} id Id of Stop, you can get it from getStops

 * @apiGroup zielonagora/mzk
 * @apiVersion 1.0.0
 * 
 * @apiSuccessExample {json} Success-Response: [
   {
      "time":"05:17",
      "line":"27",
      "destination":"Dworzec Główny",
      "stop":"1 Maja"
   },
   {
      "time":"05:26",
      "line":"44",
      "destination":"Dworzec Główny",
      "stop":"1 Maja"
   },
]
 */
export async function getStopDepartures(req: Request, res: Response) {
    const url = `${BASE_URL}?command=fs&action=departures&stop=${req.params.id}`;
    const stopDepartures: mzkzgorapl.StopDeparture[] = await getJsonFromApiAndParse(url, mzkzgorapl.stopDepartureSchema);

    res.json(stopDepartures);
}

/**
 * @api {get} /v1/zielonagora/mzk/stops/:id/info getStopInfo
 * @apiGroup zielonagora/mzk
 * 
 * @apiParam {Number} id Id of Stop, you can get it from getStops
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccessExample {json} Success-Response: {
   "id":-1162435876,
   "text":"&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;INFO: Od 17.01. do 27.02. autobusy kursują wg rozkładu jazdy oznaczonego na tabliczkach przystankowych jako \"Poniedziałek - piątek\r\nW FERIE I WAKACJE\" - niebieska kolumna w rozkładzie jazdy."
 }
 */
export async function getStopInfo(req: Request, res: Response) {
    const url = `${BASE_URL}?command=fs&action=info&stop=${req.params.id}`;
    const info: mzkzgorapl.Info = await getJsonFromApiAndParse(url, mzkzgorapl.stopInfoSchema);

    res.json(info);
}

/**
 * @api {get} /v1/zielonagora/mzk/infos getInfos
 * @apiGroup zielonagora/mzk
 * 
 * @apiVersion 1.0.0
 * 
 * @apiSuccessExample {json} Success-Response: [
   {
      "id":"1083",
      "text":"UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI",
      "validity_start":1642388400000,
      "validity_end":1646001300000,
      "start_time":0,
      "end_time":0
   },
   {
      "id":"1078",
      "text":"INFO: Od 17.01. do 27.02. autobusy kursują wg rozkładu jazdy oznaczonego na tabliczkach przystankowych jako \"Poniedziałek - piątek\r\nW FERIE I WAKACJE\" - niebieska kolumna w rozkładzie jazdy.",
      "validity_start":1642146600000,
      "validity_end":1646001300000,
      "start_time":0,
      "end_time":0
   }

]
 */
export async function getInfos(req: Request, res: Response) {
    const url = `${BASE_URL}?command=infos&format=json`;
    const infos: mzkzgorapl.Info[] = await getJsonFromApiAndParse(url, mzkzgorapl.infoListItemSchema);

    res.json(infos);
}


/**
 * @api {get} /v1/zielonagora/mzk/current_vehicles getCurrentVehicles
 * @apiGroup zielonagora/mzk
 * 
 * @apiQuery {Boolean} original Whether should return an original object or transformed (which tries to be consistent and easier to use)
 * @apiVersion 1.0.0
 * 
 * @apiSuccessExample {json} Success-Response:
 *  [
   {
      "type":"vehicle",
      "id":"470",
      "label":"0",
      "line_label":"0",
      "departure_id":285008367,
      "vehicle_group":"Autobusy-AED",
      "location":{
         "type":"location",
         "longitude":15.50274,
         "latitude":51.94012
      }
   },
   {
      "type":"vehicle",
      "id":"320",
      "label":"19",
      "line_label":"19",
      "departure_id":285027290,
      "vehicle_group":"Autobusy Elektryczne",
      "location":{
         "type":"location",
         "longitude":15.48371,
         "latitude":51.95058
      }
   }
]
 */
 export async function getCurrentVehicles(req: Request, res: Response) {
    const url = `${BASE_URL}?command=planner&action=v`;
    const currentVehicles: mzkzgorapl.Vehicle[] = await getJsonFromApiAndParse(url, mzkzgorapl.vehicleSchema);

    if (req.query.original) {
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