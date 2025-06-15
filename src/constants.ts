export const URLS = {
  zielonagora: {
    mzk: {
      baseUrl: 'https://rj.mzk.zgora.pl/Routes/',
    },
  },
}

export const DEFAULT_REQUEST_HEADERS = {
  'User-Agent':
    'Non-commercial Poland Public Transport API; Contact at: https://github.com/konhi/poland-public-transport-api',
}

export const DEFAULT_CLOUDFLARE_FETCH_HEADERS = {
  cf: {
    cacheEverything: true,
    cacheTtl: 60,
  }
}

export const DEFAULT_RESPONSE_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'access-control-expose-headers': '*',
  'Cache-Control': 'max-age=10',
}
