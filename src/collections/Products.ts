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

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'sku', 'price', 'inStock', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'sku',
                  type: 'text',
                  required: true,
                  label: 'SKU',
                  admin: {
                    description: 'Stock Keeping Unit',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  label: 'Price',
                },
                {
                  name: 'salePrice',
                  type: 'number',
                  label: 'Sale Price',
                  admin: {
                    description: 'Optional discounted price',
                  },
                },
              ],
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
              label: 'Short Description',
              admin: {
                description: 'Brief product summary for listings',
              },
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Full Description',
            },
            {
              name: 'images',
              type: 'array',
              required: true,
              label: 'Product Images',
              minRows: 1,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Categories',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'inStock',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'In Stock',
                },
                {
                  name: 'inventory',
                  type: 'number',
                  defaultValue: 0,
                  label: 'Inventory Count',
                },
              ],
            },
            {
              name: 'specifications',
              type: 'array',
              label: 'Specifications',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Spec Name',
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  label: 'Spec Value',
                },
              ],
            },
            {
              name: 'variants',
              type: 'array',
              label: 'Product Variants',
              admin: {
                description: 'e.g., Size, Color',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Variant Name',
                },
                {
                  name: 'options',
                  type: 'array',
                  label: 'Options',
                  fields: [
                    {
                      name: 'option',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related Products',
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
