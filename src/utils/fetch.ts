import { DEFAULT_REQUEST_HEADERS } from './constants'
export async function getJson(
  url: string,
  fixEscapeCharacters = false,
): Promise<unknown> {
  try {
    const response = await fetch(url, {
      headers: DEFAULT_REQUEST_HEADERS,
    })

    if (fixEscapeCharacters) {
      // some providers incorrectly use \ in text (example: "destination": "Zjazd\Zajezdnia Chemiczna"), use this option when it happens
      const text = (await response.text()).replaceAll(/\\/g, '/')
      const json = await JSON.parse(text)

      return json
    } else {
      const json = response.json()

      return json
    }
  } catch (error) {
    console.error(error)
    return
  }
}
