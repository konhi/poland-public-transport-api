import { BasicRouteOptions } from '../types/routeHelpers'
import { getJson } from './fetch'
import { getParsedResponse } from './parsing'
import { Request } from 'itty-router'

/** Create route that fetches data, converts into json and parses according to schema. */

export async function getWrapperRoute(
  request: Request,
  options: BasicRouteOptions,
): Promise<Response> {
  const data = await getJson(options.url, options.fixEscapeCharacters)

  return getParsedResponse(options.schema, data)
}
