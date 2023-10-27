import path from 'path'
import { CollectionConfig } from 'payload/types'

export const Media = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve('public', 'media'),
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      type: 'text',
      name: 'alt',
      required: true,
    },
  ],
} satisfies CollectionConfig
