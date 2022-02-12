import fetch from "node-fetch";

export async function getJson(url: string): Promise<any> {
  const response = await fetch(url);
  const json = response.json();

  return json;
}
