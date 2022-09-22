import { OpenAPIConfig, Client } from '@tiny-mile/delivery-sdk'

const tinyMileConfig: Partial<OpenAPIConfig> = {
  BASE: import.meta.env.API_URL,
  HEADERS: {
    [import.meta.env.API_AUTH_HEADER]: import.meta.env.API_AUTH_TOKEN,
  },
}

const tinyMileClient = new Client(tinyMileConfig)
export default tinyMileClient
