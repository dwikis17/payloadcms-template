import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default async function TestimonialsPage() {
  const payload = await getPayload({ config: configPromise })

  const testimonials = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 50,
  })

  const featuredTestimonials = testimonials.docs.filter((t: any) => t.featured)
  const regularTestimonials = testimonials.docs.filter((t: any) => !t.featured)

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Client Testimonials</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Don't just take our word for it. Here's what our clients have to say about working
          with us.
        </p>
      </div>

      <div className="container">
        {featuredTestimonials.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8 text-center text-2xl font-bold">Featured Testimonials</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-lg"
                >
                  {testimonial.rating && (
                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  )}

                  <blockquote className="mb-6 flex-1 text-lg italic text-muted-foreground">
                    "{testimonial.testimonial}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <div className="h-14 w-14 overflow-hidden rounded-full">
                        <Media
                          resource={testimonial.avatar}
                          imgClassName="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="font-semibold">{testimonial.clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.clientRole}
                      </div>
                      {testimonial.company && (
                        <div className="text-sm font-semibold text-primary">
                          {testimonial.company}
                        </div>
                      )}
                    </div>

                    {testimonial.companyLogo && (
                      <div className="h-10 w-auto opacity-60">
                        <Media
                          resource={testimonial.companyLogo}
                          imgClassName="h-full w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>

                  {testimonial.videoUrl && (
                    <a
                      href={testimonial.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Watch video testimonial
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {regularTestimonials.length > 0 && (
          <div>
            {featuredTestimonials.length > 0 && (
              <h2 className="mb-8 text-center text-2xl font-bold">More Testimonials</h2>
            )}
            <div className="columns-1 gap-8 md:columns-2 lg:columns-3">
              {regularTestimonials.map((testimonial: any) => (
                <div
                  key={testimonial.id}
                  className="mb-8 break-inside-avoid rounded-lg border border-border bg-card p-6"
                >
                  {testimonial.rating && (
                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  )}

                  <blockquote className="mb-6 italic text-muted-foreground">
                    "{testimonial.testimonial}"
                  </blockquote>

                  <div className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <div className="h-12 w-12 overflow-hidden rounded-full">
                        <Media
                          resource={testimonial.avatar}
                          imgClassName="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="font-semibold">{testimonial.clientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.clientRole}
                      </div>
                      {testimonial.company && (
                        <div className="text-sm font-semibold text-primary">
                          {testimonial.company}
                        </div>
                      )}
                    </div>

                    {testimonial.companyLogo && (
                      <div className="h-8 w-auto opacity-50">
                        <Media
                          resource={testimonial.companyLogo}
                          imgClassName="h-full w-auto object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {testimonials.docs.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No testimonials available yet.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Join Our Happy Clients?</h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Let's work together to achieve your goals
          </p>
          <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Client Testimonials',
    description: "See what our clients have to say about working with us",
  }
}
