// Based on https://github.com/public-transport/friendly-public-transport-format, but doesn't stricly folllow it

export interface Location {
  type: string
  longtitude: number
  latitude: number
  name?: string
  address?: string
}

export interface Stop {
  type: string
  id: string
  name: string
  location?: Location
  address?: string
}