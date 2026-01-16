import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Orders: CollectionConfig = {
  slug: 'orders',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['orderNumber', 'customerEmail', 'total', 'status', 'createdAt'],
    useAsTitle: 'orderNumber',
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      label: 'Order Number',
      admin: {
        description: 'Unique order identifier',
      },
    },
    {
      name: 'customer',
      type: 'group',
      label: 'Customer Information',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
          label: 'Registered User',
          admin: {
            description: 'Link to user account if registered',
          },
        },
        {
          name: 'customerEmail',
          type: 'email',
          required: true,
          label: 'Email',
        },
        {
          name: 'customerName',
          type: 'text',
          label: 'Customer Name',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Order Items',
      fields: [
        {
          name: 'itemType',
          type: 'select',
          required: true,
          options: [
            { label: 'Product', value: 'product' },
            { label: 'Course', value: 'course' },
            { label: 'Service', value: 'service' },
            { label: 'Pricing Plan', value: 'pricing' },
          ],
        },
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          admin: {
            condition: (data, siblingData) => siblingData?.itemType === 'product',
          },
        },
        {
          name: 'course',
          type: 'relationship',
          relationTo: 'courses',
          admin: {
            condition: (data, siblingData) => siblingData?.itemType === 'course',
          },
        },
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          admin: {
            condition: (data, siblingData) => siblingData?.itemType === 'service',
          },
        },
        {
          name: 'pricing',
          type: 'relationship',
          relationTo: 'pricing',
          admin: {
            condition: (data, siblingData) => siblingData?.itemType === 'pricing',
          },
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Unit Price',
        },
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          label: 'Subtotal',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'total',
          type: 'number',
          required: true,
          label: 'Order Total',
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Processing', value: 'processing' },
            { label: 'Completed', value: 'completed' },
            { label: 'Refunded', value: 'refunded' },
            { label: 'Failed', value: 'failed' },
          ],
        },
      ],
    },
    {
      name: 'payment',
      type: 'group',
      label: 'Payment Details',
      fields: [
        {
          name: 'stripePaymentId',
          type: 'text',
          label: 'Stripe Payment ID',
          admin: {
            description: 'Stripe payment intent or charge ID',
          },
        },
        {
          name: 'stripeCustomerId',
          type: 'text',
          label: 'Stripe Customer ID',
        },
        {
          name: 'paymentMethod',
          type: 'select',
          options: [
            { label: 'Credit Card', value: 'card' },
            { label: 'PayPal', value: 'paypal' },
            { label: 'Bank Transfer', value: 'bank_transfer' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Order Notes',
      admin: {
        description: 'Internal notes about this order',
      },
    },
  ],
  timestamps: true,
}
