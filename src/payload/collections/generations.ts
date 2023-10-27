import { CollectionConfig } from 'payload/types'

export const Generations = {
  slug: 'generations',
  fields: [
    {
      type: 'text',
      name: 'title',
      required: true,
    },
    {
      type: 'text',
      name: 'prompt',
      required: true,
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'media',
      required: true,
    },
  ],
} satisfies CollectionConfig
