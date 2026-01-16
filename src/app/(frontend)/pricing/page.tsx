import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PricingPage() {
  const payload = await getPayload({ config: configPromise })

  const pricing = await payload.find({
    collection: 'pricing',
    depth: 1,
    limit: 50,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Pricing Plans</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Choose the perfect plan for your needs. All plans include our core features.
        </p>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {pricing.docs.map((plan: any) => {
            const isHighlighted = plan.highlighted

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-lg border p-8 ${
                  isHighlighted
                    ? 'border-primary shadow-xl ring-2 ring-primary'
                    : 'border-border'
                }`}
              >
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold">{plan.title}</h2>
                  {plan.description && (
                    <div className="text-sm text-muted-foreground">
                      <RichText data={plan.description} enableGutter={false} />
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="ml-2 text-muted-foreground">
                      /{plan.billingPeriod}
                    </span>
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features?.map((feature: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className={`mt-0.5 h-6 w-6 flex-shrink-0 ${
                          feature.included
                            ? 'text-green-500'
                            : 'text-muted-foreground'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {feature.included ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        )}
                      </svg>
                      <div>
                        <span
                          className={
                            feature.included
                              ? ''
                              : 'text-muted-foreground line-through'
                          }
                        >
                          {feature.feature}
                        </span>
                        {feature.tooltip && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {feature.tooltip}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {plan.metadata?.maxUsers && (
                  <div className="mb-4 rounded-lg bg-muted p-3 text-sm">
                    <span className="font-semibold">Up to {plan.metadata.maxUsers} users</span>
                  </div>
                )}

                {plan.metadata?.supportLevel && (
                  <div className="mb-4 text-sm text-muted-foreground">
                    <span className="font-semibold">Support:</span>{' '}
                    {plan.metadata.supportLevel.replace('_', ' ')}
                  </div>
                )}

                {plan.ctaLink && (
                  <a
                    href={plan.ctaLink}
                    className={`block rounded-lg px-6 py-4 text-center text-lg font-semibold transition-colors ${
                      isHighlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {plan.ctaLabel || 'Get Started'}
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {pricing.docs.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No pricing plans available yet.</p>
          </div>
        )}

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Need a custom plan?{' '}
            <a href="/contact" className="font-semibold text-primary hover:underline">
              Contact our sales team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Pricing Plans',
    description: 'Choose the perfect plan for your needs',
  }
}
