import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PricingTable: Block = {
  slug: 'pricingTable',
  interfaceName: 'PricingTableBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'Main heading for the pricing section',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Section Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'pricingPlans',
      type: 'relationship',
      relationTo: 'pricing',
      hasMany: true,
      required: true,
      label: 'Pricing Plans',
      admin: {
        description: 'Select pricing plans to display',
      },
    },
    {
      name: 'displayStyle',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'Table', value: 'table' },
        { label: 'Comparison', value: 'comparison' },
      ],
      label: 'Display Style',
    },
    {
      name: 'showAnnualToggle',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show Monthly/Annual Toggle',
      admin: {
        description: 'Display toggle between monthly and annual pricing',
      },
    },
  ],
  labels: {
    plural: 'Pricing Tables',
    singular: 'Pricing Table',
  },
}
