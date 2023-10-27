import 'dotenv-flow/config'
import path from 'path'
import next from 'next'
import build from 'next/dist/build'
import express from 'express'
import { getPayload } from './payload/client'

const PORT = process.env.PORT ?? 3000

const server = express()

async function start() {
  const payload = await getPayload({
    express: server,
    onInit: async payload => {
      payload.logger.info(`Payload API URL: ${payload.getAPIURL()}`)
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // If app is building we don't want to start the server
  if (process.env.NEXT_BUILD) {
    server.listen(PORT, async () => {
      payload.logger.info(`Next.js is now building...`)
      // Build the application and exit
      // @ts-expect-error
      await build(path.resolve())
      process.exit()
    })
    return
  }

  // Get next app and inject handler
  const app = next({
    dev: process.env.NODE_ENV !== 'production',
  })
  const handler = app.getRequestHandler()
  server.use((request, response) => handler(request, response))

  // Prepare next app and start server
  await app.prepare()
  payload.logger.info('Next.js App Started')
  server.listen(PORT, () => {
    payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL!}`)
  })
}

// Start the server
start()
