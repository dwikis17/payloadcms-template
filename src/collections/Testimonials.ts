import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['clientName', 'company', 'rating', 'industry', 'featured'],
    useAsTitle: 'clientName',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'clientName',
          type: 'text',
          required: true,
          label: 'Client Name',
        },
        {
          name: 'clientRole',
          type: 'text',
          required: true,
          label: 'Role/Title',
          admin: {
            description: 'e.g., CEO, Marketing Director, etc.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'company',
          type: 'text',
          required: true,
          label: 'Company Name',
        },
        {
          name: 'industry',
          type: 'select',
          required: true,
          options: [
            { label: 'Education', value: 'education' },
            { label: 'E-commerce', value: 'ecommerce' },
            { label: 'Agency', value: 'agency' },
            { label: 'Technology', value: 'technology' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Finance', value: 'finance' },
            { label: 'Other', value: 'other' },
          ],
          defaultValue: 'other',
        },
      ],
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo',
      admin: {
        description: 'Optional company logo',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Client Photo',
      admin: {
        description: 'Optional photo of the client',
      },
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      label: 'Testimonial Text',
      admin: {
        description: 'The testimonial quote',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'rating',
          type: 'number',
          required: true,
          defaultValue: 5,
          min: 1,
          max: 5,
          label: 'Rating (1-5 stars)',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          label: 'Featured Testimonial',
          admin: {
            description: 'Show this testimonial prominently',
          },
        },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video Testimonial URL',
      admin: {
        description: 'Optional YouTube or Vimeo URL for video testimonial',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  timestamps: true,
}
