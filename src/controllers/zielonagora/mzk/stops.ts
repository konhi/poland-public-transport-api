import { Request } from 'itty-router'
import { URLS } from '../../../utils/constants';
import { getJson } from '../../../utils/fetch'
import { json } from 'itty-router-extras';
import { stopSchema } from '../../../types/zielonagora/mzk/stops';

const Stops = async (request: Request) => {
  const url = `${URLS.zielonagora.mzk.baseUrl}?command=basicdata&action=mstops`;

  const data = await getJson(url)

  return json(data)

}

export default Stops
