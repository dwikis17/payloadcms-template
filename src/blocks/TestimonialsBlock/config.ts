import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      required: true,
      label: 'Testimonials',
      admin: {
        description: 'Select testimonials to display',
      },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Carousel', value: 'carousel' },
        { label: 'Masonry', value: 'masonry' },
      ],
      label: 'Layout Style',
    },
    {
      name: 'showRatings',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Star Ratings',
    },
  ],
  labels: {
    plural: 'Testimonials',
    singular: 'Testimonials Block',
  },
}
