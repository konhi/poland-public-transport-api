import { Request, Response } from "express";
import fetch from 'node-fetch';
import { MzkZgoraPlStop } from "../models/mzkzgoraplTypes";

/** mzk.zgora.pl's traveller provides few useful data without need for scraping */
const BASE_URL = 'https://traveller.mzk.zgora.pl/newvm/main'

/**
 * Bus stops list
 * Either friendly-format or what you get from site
 * @route GET mzkzgorapl/stops
 */
export const getStops = async (req: Request, res: Response) => {
    const stopsJson: MzkZgoraPlStop[] = await fetch(`${BASE_URL}?command=basicdata&action=mstops`)
        .then(fetchResponse => fetchResponse.text())
        .then(text => JSON.parse(text))

    const formattedStopsJson = stopsJson.map(stop => ({
        type: 'stop',
        id: stop.id,
        name: stop.name,
        location: {
            type: 'location',
            longitude: stop.lon,
            latitude: stop.lat
        }
    }))

    res.json(formattedStopsJson)
};

