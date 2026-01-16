import type { Block } from 'payload'

export const LogoCloud: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      admin: {
        description: 'e.g., "Trusted by leading companies"',
      },
    },
    {
      name: 'logos',
      type: 'array',
      required: true,
      label: 'Company Logos',
      minRows: 1,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },
        {
          name: 'companyName',
          type: 'text',
          required: true,
          label: 'Company Name',
          admin: {
            description: 'Used for alt text',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Company Website',
          admin: {
            description: 'Optional link to company website',
          },
        },
      ],
    },
    {
      name: 'grayscale',
      type: 'checkbox',
      defaultValue: true,
      label: 'Display Logos in Grayscale',
      admin: {
        description: 'Adds a grayscale filter and shows color on hover',
      },
    },
  ],
  labels: {
    plural: 'Logo Clouds',
    singular: 'Logo Cloud',
  },
}
