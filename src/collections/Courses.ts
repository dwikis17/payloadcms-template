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

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'level', 'price', 'rating', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Course Title',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Course Details',
          fields: [
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Course Description',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'instructor',
                  type: 'relationship',
                  relationTo: 'users',
                  required: true,
                  label: 'Instructor',
                },
                {
                  name: 'level',
                  type: 'select',
                  required: true,
                  defaultValue: 'beginner',
                  options: [
                    { label: 'Beginner', value: 'beginner' },
                    { label: 'Intermediate', value: 'intermediate' },
                    { label: 'Advanced', value: 'advanced' },
                    { label: 'All Levels', value: 'all' },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  required: true,
                  label: 'Duration',
                  admin: {
                    description: 'e.g., "8 weeks", "40 hours", "Self-paced"',
                  },
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                  defaultValue: 0,
                  label: 'Course Price',
                },
              ],
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Course Thumbnail',
            },
            {
              name: 'curriculum',
              type: 'array',
              label: 'Course Curriculum',
              fields: [
                {
                  name: 'module',
                  type: 'text',
                  required: true,
                  label: 'Module Title',
                },
                {
                  name: 'lessons',
                  type: 'array',
                  label: 'Lessons',
                  fields: [
                    {
                      name: 'lesson',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Module Duration',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'enrollmentCount',
                  type: 'number',
                  defaultValue: 0,
                  label: 'Enrollment Count',
                  admin: {
                    description: 'Number of students enrolled',
                  },
                },
                {
                  name: 'rating',
                  type: 'number',
                  defaultValue: 0,
                  min: 0,
                  max: 5,
                  label: 'Course Rating (0-5)',
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
              name: 'prerequisites',
              type: 'richText',
              label: 'Prerequisites',
              admin: {
                description: 'What students should know before taking this course',
              },
            },
            {
              name: 'learningOutcomes',
              type: 'array',
              label: 'Learning Outcomes',
              fields: [
                {
                  name: 'outcome',
                  type: 'text',
                  required: true,
                  label: 'What students will learn',
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
