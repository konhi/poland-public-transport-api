import { FETCH_HEADERS } from './constants'

export async function getJson(url: string): Promise<unknown> {
  try {
    const response = await fetch(url, {
      headers: FETCH_HEADERS,
    })

    return await response.json()
  } catch (error) {
    console.error(error)
    return
  }
}
