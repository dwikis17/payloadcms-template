import type { Block } from 'payload'

export const Stats: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      label: 'Statistics',
      minRows: 1,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Stat Value',
          admin: {
            description: 'e.g., "10,000+", "99%", "$5M"',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Stat Label',
          admin: {
            description: 'e.g., "Active Users", "Customer Satisfaction"',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          admin: {
            description: 'Optional icon for this stat',
          },
        },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'horizontal',
      options: [
        { label: 'Horizontal', value: 'horizontal' },
        { label: 'Grid', value: 'grid' },
      ],
      label: 'Layout Style',
    },
  ],
  labels: {
    plural: 'Stats Blocks',
    singular: 'Stats',
  },
}
