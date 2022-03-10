import { json } from 'itty-router-extras'
import { ZodSchema } from 'zod'
import { DEFAULT_RESPONSE_HEADERS } from './constants'

// https://github.com/kwhitley/itty-router-extras/pull/7
function status(
  status: number,
  message: string | object,
  options = { headers: DEFAULT_RESPONSE_HEADERS },
): Response {
  return message
    ? json(
        {
          ...(typeof message === 'object'
            ? message
            : {
                status,
                message,
              }),
        },
        { status, ...options },
      )
    : new Response(null, { status, ...options })
}

/**
 * @returns either data or error message with appropriate status code
 */
export function getParsedResponse(
  schema: ZodSchema<any, any, any>,
  data: unknown,
): Response {
  const parsingResult = schema.safeParse(data)

  if (parsingResult.success) {
    return status(200, parsingResult.data)
  } else {
    return status(500, parsingResult.error)
  }
}
