import fetch from "node-fetch";
import logger from "./logger";

export async function getJson(url: string): Promise<any> {
  try {
    const userAgent = 'Non-commercial Poland Public Transport API; Contact at: https://github.com/konhi/poland-public-transport-api';

    const response = await fetch(url, {
      headers: {
        'User-agent': userAgent
      }
    });
  
    return await response.json();
  } catch (error) {
    logger.error(error)
    return
  }
}
