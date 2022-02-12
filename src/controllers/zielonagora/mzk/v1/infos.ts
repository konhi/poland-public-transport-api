import * as infosTypes from "../../../../types/zielonagora/mzk/v1/infos";
import { Request, Response } from "express";
import { URLS } from "../../../../constants/urls";
import { getJson } from "../../../../utils/fetching";
import { z } from "zod";
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
