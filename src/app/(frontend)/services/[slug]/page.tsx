import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return services.docs.map(({ slug }) => ({ slug }))
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  const service = await queryServiceBySlug({ slug })

  if (!service) {
    notFound()
  }

  return (
    <article className="pb-24 pt-24">
      <div className="container">
        {/* Service Header */}
        <div className="mb-12 text-center">
          {service.icon && (
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Media resource={service.icon} imgClassName="h-14 w-14 object-contain" />
            </div>
          )}

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{service.title}</h1>

          <p className="mx-auto mb-6 max-w-3xl text-xl text-muted-foreground">
            {service.shortDescription}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {service.pricing && (
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2">
                <svg
                  className="h-5 w-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {service.pricing.type === 'custom' ? (
                  <span className="font-semibold">
                    {service.pricing.customText || 'Contact for quote'}
                  </span>
                ) : (
                  <span className="font-semibold">
                    ${service.pricing.amount}
                    {service.pricing.type === 'hourly' && '/hour'}
                  </span>
                )}
              </div>
            )}
            {service.timeline && (
              <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{service.timeline}</span>
              </div>
            )}
          </div>
        </div>

        {/* Service Content */}
        <div className="mx-auto max-w-4xl">
          {service.fullDescription && (
            <div className="mb-12">
              <div className="prose max-w-none dark:prose-invert">
                <RichText data={service.fullDescription} enableGutter={false} />
              </div>
            </div>
          )}

          {service.deliverables && service.deliverables.length > 0 && (
            <div className="mb-12 rounded-lg border border-border bg-card p-8">
              <h2 className="mb-6 text-2xl font-bold">What's Included</h2>
              <ul className="grid gap-4 md:grid-cols-2">
                {service.deliverables.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="mt-1 h-6 w-6 flex-shrink-0 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg">{item.deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Section */}
          <div className="mb-12 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
            <p className="mb-6 text-muted-foreground">
              Let's discuss how we can help achieve your goals
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Get a Quote
              </button>
              <button className="rounded-lg border border-border bg-background px-8 py-3 font-semibold transition-colors hover:bg-muted">
                Schedule Consultation
              </button>
            </div>
          </div>

          {/* Case Studies */}
          {service.caseStudies && service.caseStudies.length > 0 && (
            <div>
              <h2 className="mb-8 text-2xl font-bold">Related Case Studies</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {service.caseStudies.map((caseStudy: any) => (
                  <Link
                    key={caseStudy.id}
                    href={`/posts/${caseStudy.slug}`}
                    className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                  >
                    {caseStudy.meta?.image && (
                      <div className="aspect-video overflow-hidden">
                        <Media
                          resource={caseStudy.meta.image}
                          imgClassName="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-semibold group-hover:text-primary">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.meta?.description && (
                        <p className="text-sm text-muted-foreground">
                          {caseStudy.meta.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await queryServiceBySlug({ slug })

  return {
    title: service?.title || 'Service',
    description: service?.shortDescription || 'Service details',
  }
}
