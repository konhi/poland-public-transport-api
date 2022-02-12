import { Request, Response } from "express";
import { z } from "zod";
import * as stopTypes from "../../../../types/zielonagora/mzk/v1/stops";
import { getJson } from "../../../../utils/fetching";
import { URLS } from "../../../../constants/urls";

function getStopUrl(id: string): string {
  return `https://rozklad.mzk.zgora.pl/rozklad.php?co=trasa&linia=${id}`;
}

export async function getStops(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=basicdata&action=mstops`;
  const schema = z.array(stopTypes.stopSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedStops = parsingResult.data.map((stop: stopTypes.Stop) => ({stop: {
      id: stop.id,
      name: stop.name,
      location: {
        latitude: stop.lat,
        longitude: stop.lon,
      },
      url: getStopUrl(stop.id),
    }

    }));

    res.json(transformedStops);
  } else {
    res.status(500).json(parsingResult);
  }
}

export async function getStopDepartures(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=departures&stop=${req.params.id}`;
  const schema = z.array(stopTypes.stopDepartureSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedResult = parsingResult.data.map(
      (departure: stopTypes.StopDeparture) => ({
        departure: {
          arrival: {
            time: departure.time
          },
          line: {
            id: departure.line
          },
          direction: {
            name: departure.destination,
          },
          stop: {
            id: req.params.id,
            name: departure.stop,
          },
        }

      })
    );

    res.json(transformedResult);
  } else {
    res.status(500).json(parsingResult);
  }
}


export async function getStopInfo(req: Request, res: Response) {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=fs&action=info&stop=${req.params.id}`;
  const schema = stopTypes.stopInfoSchema;

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    const transformedResult = {
      info: {
        stop: {
          id: req.params.id
      },
      id: parsingResult.data.id.toString(),
      text: parsingResult.data.text
      }

    }


    res.json(transformedResult);
  } else {
    res.status(500).json(parsingResult);
  }
}
