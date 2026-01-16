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

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'price', 'billingPeriod', 'highlighted', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Plan Name',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Pricing Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  admin: {
                    description: 'Base price for this plan',
                  },
                },
                {
                  name: 'billingPeriod',
                  type: 'select',
                  required: true,
                  defaultValue: 'monthly',
                  options: [
                    { label: 'Monthly', value: 'monthly' },
                    { label: 'Yearly', value: 'yearly' },
                    { label: 'One-time', value: 'onetime' },
                    { label: 'Custom', value: 'custom' },
                  ],
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Plan Description',
              admin: {
                description: 'Short description of this pricing plan',
              },
            },
            {
              name: 'features',
              type: 'array',
              label: 'Features',
              required: true,
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'included',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Feature Included',
                },
                {
                  name: 'tooltip',
                  type: 'text',
                  label: 'Tooltip/Helper Text',
                  admin: {
                    description: 'Optional explanation for this feature',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'highlighted',
                  type: 'checkbox',
                  label: 'Highlight as Most Popular',
                  defaultValue: false,
                },
                {
                  name: 'ctaLabel',
                  type: 'text',
                  defaultValue: 'Get Started',
                  label: 'CTA Button Text',
                },
              ],
            },
            {
              name: 'ctaLink',
              type: 'text',
              label: 'CTA Button Link',
              admin: {
                description: 'URL for the call-to-action button',
              },
            },
            {
              name: 'metadata',
              type: 'group',
              label: 'Additional Metadata',
              fields: [
                {
                  name: 'stripePriceId',
                  type: 'text',
                  label: 'Stripe Price ID',
                  admin: {
                    description: 'Link to Stripe pricing ID for payment integration',
                  },
                },
                {
                  name: 'maxUsers',
                  type: 'number',
                  label: 'Maximum Users',
                },
                {
                  name: 'supportLevel',
                  type: 'select',
                  options: [
                    { label: 'Email Support', value: 'email' },
                    { label: 'Priority Support', value: 'priority' },
                    { label: 'Dedicated Support', value: 'dedicated' },
                  ],
                },
              ],
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
