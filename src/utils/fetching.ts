import { ZodTypeAny } from 'zod'
import fetch from 'node-fetch'

export async function getAndParseJson (url: string, schema: ZodTypeAny) {
  const parseResult = await fetch(url)
    .then(async body => await body.json())
    .then(json => schema.safeParse(json))

  return parseResult
}
