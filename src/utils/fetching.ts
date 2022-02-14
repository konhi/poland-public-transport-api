import fetch from "node-fetch";
import logger from "./logger";

export async function getJson(url: string): Promise<any> {
  try {
    const response = await fetch(url);
  
    return await response.json();
  } catch (error) {
    logger.error(error)
    return
  }
}
