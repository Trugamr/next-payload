import path from 'path'
import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { Users } from './collections/users'
import { Greeting } from './globals/greeting'

const config = buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL!,
  collections: [Users],
  globals: [Greeting],
  admin: {
    bundler: webpackBundler(),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'types.ts'),
  },
})

export default config
