import { ZodSchema } from 'zod'

export interface BasicRouteOptions {
  schema: ZodSchema<any, any, any>
  url: string
}
