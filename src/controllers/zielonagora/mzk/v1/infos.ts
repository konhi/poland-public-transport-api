import * as infosTypes from "../../../../types/zielonagora/mzk/v1/infos";
import { Request, Response } from "express";
import { URLS } from "../../../../constants/urls";
import { getJson } from "../../../../utils/fetching";
import { z } from "zod";

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
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=infos&format=json`;
  const schema = z.array(infosTypes.infoSchema).nonempty();

  const json = await getJson(url);
  const parsingResult = schema.safeParse(json);

  if (parsingResult.success) {
    res.json(parsingResult.data);
  } else {
    res.status(500).json(parsingResult);
  }
}
