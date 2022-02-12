import { Request, Response } from "express";
import { z } from "zod";
import * as stopTypes from "../../../types/zielonagora/mzk/stops";
import { getJson } from "../../../utils/fetching";
import { URLS } from "../../../utils/urls";

function getStopUrl(id: string): string {
  return `https://rozklad.mzk.zgora.pl/rozklad.php?co=trasa&linia=${id}`;
}

/**
 * @api {get} /v1/zielonagora/mzk/stops getStops
 * @apiGroup zielonagora/mzk
 * @apiVersion 1.0.0
 *

 * @apiSuccessExample {json} Success-Response: [
   {
      "stop_id":"75",
      "stop_name":"1 Maja",
      "stop_lat":51.9358916666667,
      "stop_lon":15.4960388888889,
      "stop_url": "https://rozklad.mzk.zgora.pl/rozklad.php?co=trasa&linia=75"
   },
   {
      "stop_id":"219",
      "stop_name":"1 Maja",
      "stop_lat":15.496792023807373,
      "stop_lon":51.93532294108886,
      "stop_url: "https://rozklad.mzk.zgora.pl/rozklad.php?co=trasa&linia=219",
   }
]
 */
export async function getStops(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=basicdata&action=mstops`;
  const schema = z.array(stopTypes.stopSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedStops = parsingResult.data.map((stop: stopTypes.Stop) => ({
      type: "stop",
      id: stop.id,
      name: stop.name,
      position: {
        type: "position",
        latitude: stop.lat,
        longitude: stop.lon,
      },
      url: getStopUrl(stop.id),
    }));

    res.json(transformedStops);
  } else {
    res.status(500).json(parsingResult);
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
    "type": "departure",
    "arrival_time": "13 min",
    "line_id": "14",
    "direction_name": "Zawadzkiego Zośki",
    "stop": {
      "type": "stop",
      "id": "75",
      "name": "1 Maja"
    }
  },
  {
    "type": "departure",
    "arrival_time": "14 min",
    "line_id": "27",
    "direction_name": "Dworzec Główny",
    "stop": {
      "type": "stop",
      "id": "75",
      "name": "1 Maja"
    }
  },
]
*/
export async function getStopDepartures(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=departures&stop=${req.params.id}`;
  const schema = z.array(stopTypes.stopDepartureSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedResult = parsingResult.data.map(
      (departure: stopTypes.StopDeparture) => ({
        type: "departure",
        arrival_time: departure.time,
        line_id: departure.line,
        direction_name: departure.destination,
        stop: {
          type: "stop",
          id: req.params.id,
          name: departure.stop,
        },
      })
    );

    res.json(transformedResult);
  } else {
    res.status(500).json(parsingResult);
  }
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
  "id": -90797766,
  "text": "&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;INFO: Od 17.01. do 18.02. autobusy kursują wg rozkładu jazdy oznaczonego na tabliczkach przystankowych jako \"Poniedziałek - piątek\r\nW FERIE I WAKACJE\" - niebieska kolumna w rozkładzie jazdy.",
  "type": "info"
}
*/
export async function getStopInfo(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=info&stop=${req.params.id}`;
  const schema = stopTypes.stopInfoSchema;

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedResult = { ...parsingResult.data, ...{ type: "info" } };

    res.json(transformedResult);
  } else {
    res.status(500).json(parsingResult);
  }
}
