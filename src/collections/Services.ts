import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../hooks/populatePublishedAt'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'featured', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Name',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Service Details',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              label: 'Service Icon',
              admin: {
                description: 'Icon or image representing this service',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              label: 'Short Description',
              admin: {
                description: 'Brief summary for service cards',
              },
            },
            {
              name: 'fullDescription',
              type: 'richText',
              required: true,
              label: 'Full Description',
            },
            {
              name: 'pricing',
              type: 'group',
              label: 'Pricing Information',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'fixed',
                  options: [
                    { label: 'Fixed Price', value: 'fixed' },
                    { label: 'Hourly Rate', value: 'hourly' },
                    { label: 'Custom Quote', value: 'custom' },
                  ],
                },
                {
                  name: 'amount',
                  type: 'number',
                  label: 'Price Amount',
                  admin: {
                    description: 'Leave empty for custom pricing',
                    condition: (data, siblingData) => siblingData?.type !== 'custom',
                  },
                },
                {
                  name: 'customText',
                  type: 'text',
                  label: 'Custom Pricing Text',
                  admin: {
                    description: 'e.g., "Contact for quote"',
                    condition: (data, siblingData) => siblingData?.type === 'custom',
                  },
                },
              ],
            },
            {
              name: 'deliverables',
              type: 'array',
              label: 'Deliverables',
              fields: [
                {
                  name: 'deliverable',
                  type: 'text',
                  required: true,
                  label: 'What\'s included',
                },
              ],
            },
            {
              name: 'timeline',
              type: 'text',
              label: 'Typical Timeline',
              admin: {
                description: 'e.g., "2-4 weeks", "30 days"',
              },
            },
            {
              name: 'caseStudies',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              label: 'Related Case Studies',
              admin: {
                description: 'Link to blog posts showcasing this service',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Featured Service',
              admin: {
                description: 'Highlight this service on the homepage',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
    maxPerDoc: 50,
  },
}
