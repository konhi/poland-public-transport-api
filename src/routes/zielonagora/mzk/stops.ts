import { Request, Response } from "express";
import * as stopTypes from "../../../types/zielonagora/mzk/stops";
import { getAndParseJson } from "../../../utils/fetching";
import { URLS } from "../../../utils/urls";

/**
 * @api {get} /v1/zielonagora/mzk/stops getStops
 * @apiGroup zielonagora/mzk
 * @apiVersion 1.0.0
 * 

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
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=basicdata&action=mstops`;
  const schema = stopTypes.stopListSchema;

  const parsingResult = await getAndParseJson(url, schema);
     if (parsingResult.success) {
        const transformedStops = parsingResult.data.map((stop: stopTypes.Stop) => ({
              type: "stop",
              id: stop.id,
              name: stop.name,
              location: {
                    type: "location",
                    longitude: stop.lon,
                    latitude: stop.lat
              }
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
   const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=departures&stop=${req.params.id}`;
   const schema = stopTypes.stopDepartureListSchema;

   const parsingResult = await getAndParseJson(url, schema);

     if (parsingResult.success) {
        res.json(parsingResult.data);
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
  "id":-1162435876,
  "text":"&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;UWAGA! W DNI ROBOCZE OBOWIĄZUJE ROZKŁAD NIEBIESKI&nbsp;&nbsp;&nbsp;***&nbsp;&nbsp;&nbsp;INFO: Od 17.01. do 27.02. autobusy kursują wg rozkładu jazdy oznaczonego na tabliczkach przystankowych jako \"Poniedziałek - piątek\r\nW FERIE I WAKACJE\" - niebieska kolumna w rozkładzie jazdy."
}
*/
export async function getStopInfo(req: Request, res: Response) {
   const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=info&stop=${req.params.id}`;
   const schema = stopTypes.stopInfoSchema;

   const parsingResult = await getAndParseJson(url, schema);

  if (parsingResult.success) {
     res.json(parsingResult.data);
  } else {
     res.status(500).json(parsingResult);
  }
}