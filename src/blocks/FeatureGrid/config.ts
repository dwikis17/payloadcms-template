import type { Block } from 'payload'
import { link } from '@/fields/link'

export const FeatureGrid: Block = {
  slug: 'featureGrid',
  interfaceName: 'FeatureGridBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      label: 'Features',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Feature Icon',
          admin: {
            description: 'Icon or image for this feature',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Feature Description',
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
      label: 'Number of Columns',
    },
  ],
  labels: {
    plural: 'Feature Grids',
    singular: 'Feature Grid',
  },
}
