import { DEFAULT_REQUEST_HEADERS } from './constants'

export async function getJson(url: string): Promise<unknown> {
  try {
    const response = await fetch(url, {
      headers: DEFAULT_REQUEST_HEADERS,
    })

    const json = await response.json()

    return json
  } catch (error) {
    console.error(error)
    return
  }
}
