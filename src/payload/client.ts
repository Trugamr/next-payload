import type { Payload } from 'payload'
import type { InitOptions } from 'payload/config'
import payload from 'payload'

declare global {
  // eslint-disable-next-line no-unused-vars
  var __payload:
    | {
        client: Payload | null
        promise: Promise<Payload> | null
      }
    | undefined
}

// Persist payload client
if (!global.__payload) {
  global.__payload = {
    client: null,
    promise: null,
  }
}
const cache = global.__payload

type GetPayloadClientOptions = Partial<InitOptions>

/**
 * Gets the Payload client instance
 */
export async function getPayload(options: GetPayloadClientOptions = {}) {
  // Initialize client
  if (!cache.promise) {
    cache.promise = payload.init({
      secret: process.env.PAYLOAD_SECRET!,
      local: options.express ? false : true,
      ...options,
    })
  }

  // Return cached client if it exists
  if (cache.client) {
    return cache.client
  }

  // Wait for client to be initialized
  cache.client = await cache.promise

  return cache.client
}
