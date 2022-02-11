import { ZodTypeAny } from "zod";
import fetch from "node-fetch";

export async function getAndParseJson(url: string, schema: ZodTypeAny) {
  return fetch(url)
     .then(body => body.json())
     .then(json => schema.safeParse(json));
}