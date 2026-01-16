import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 50,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const featuredServices = services.docs.filter((s: any) => s.featured)
  const regularServices = services.docs.filter((s: any) => !s.featured)

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Our Services</h1>
          <p className="text-lg text-muted-foreground">
            Professional services tailored to your business needs
          </p>
        </div>
      </div>

      <div className="container">
        {featuredServices.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8 text-2xl font-bold">Featured Services</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group overflow-hidden rounded-lg border-2 border-primary bg-card p-6 transition-all hover:shadow-xl"
                >
                  {service.icon && (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Media
                        resource={service.icon}
                        imgClassName="h-10 w-10 object-contain"
                      />
                    </div>
                  )}

                  <h3 className="mb-3 text-xl font-bold group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="mb-4 text-muted-foreground">
                    {service.shortDescription}
                  </p>

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      {service.pricing?.type === 'custom' ? (
                        <span className="font-semibold">
                          {service.pricing.customText || 'Contact for quote'}
                        </span>
                      ) : (
                        <span className="text-xl font-bold">
                          ${service.pricing?.amount}
                          {service.pricing?.type === 'hourly' && (
                            <span className="text-sm font-normal text-muted-foreground">
                              /hour
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    {service.timeline && (
                      <span className="text-sm text-muted-foreground">
                        {service.timeline}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-2 font-semibold text-primary">
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {regularServices.length > 0 && (
          <div>
            {featuredServices.length > 0 && (
              <h2 className="mb-8 text-2xl font-bold">All Services</h2>
            )}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularServices.map((service: any) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
                >
                  {service.icon && (
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Media
                        resource={service.icon}
                        imgClassName="h-10 w-10 object-contain"
                      />
                    </div>
                  )}

                  <h3 className="mb-3 text-xl font-bold group-hover:text-primary">
                    {service.title}
                  </h3>

                  <p className="mb-4 text-muted-foreground">
                    {service.shortDescription}
                  </p>

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      {service.pricing?.type === 'custom' ? (
                        <span className="font-semibold">
                          {service.pricing.customText || 'Contact for quote'}
                        </span>
                      ) : (
                        <span className="text-xl font-bold">
                          ${service.pricing?.amount}
                          {service.pricing?.type === 'hourly' && (
                            <span className="text-sm font-normal text-muted-foreground">
                              /hour
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                    {service.timeline && (
                      <span className="text-sm text-muted-foreground">
                        {service.timeline}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-2 font-semibold text-primary">
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {services.docs.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No services available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Services',
    description: 'Professional services tailored to your business needs',
  }
}
