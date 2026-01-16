import React from 'react'
import type { PricingTableBlock as PricingTableBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = {
  pricingPlans?: any[]
} & PricingTableBlockProps

export const PricingTableBlock: React.FC<Props> = (props) => {
  const { title, description, pricingPlans, displayStyle = 'cards' } = props

  if (!pricingPlans || pricingPlans.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">{title}</h2>
      )}
      {description && (
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <RichText data={description} enableGutter={false} />
        </div>
      )}

      <div
        className={`grid gap-8 ${
          displayStyle === 'cards'
            ? 'md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1'
        }`}
      >
        {pricingPlans.map((plan: any, index: number) => {
          const isHighlighted = plan.highlighted

          return (
            <div
              key={plan.id || index}
              className={`relative flex flex-col rounded-lg border p-8 ${
                isHighlighted
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-500'
                  : 'border-border'
              }`}
            >
              {isHighlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-2xl font-bold">{plan.title}</h3>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="ml-2 text-muted-foreground">
                    /{plan.billingPeriod}
                  </span>
                </div>
              </div>

              {plan.description && (
                <div className="mb-6 text-sm text-muted-foreground">
                  <RichText data={plan.description} enableGutter={false} />
                </div>
              )}

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features?.map((feature: any, idx: number) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className={`mr-2 mt-1 h-5 w-5 flex-shrink-0 ${
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
                    <span
                      className={
                        feature.included ? '' : 'text-muted-foreground line-through'
                      }
                    >
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.ctaLink && (
                <a
                  href={plan.ctaLink}
                  className={`block rounded-lg px-6 py-3 text-center font-semibold transition-colors ${
                    isHighlighted
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
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
    </div>
  )
}
