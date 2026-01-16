import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = {
  testimonials?: any[]
} & TestimonialsBlockProps

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

export const TestimonialsBlockComponent: React.FC<Props> = (props) => {
  const { title, testimonials, layout = 'grid', showRatings = true } = props

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
      )}

      <div
        className={`${
          layout === 'grid'
            ? 'grid gap-8 md:grid-cols-2 lg:grid-cols-3'
            : layout === 'carousel'
              ? 'flex gap-8 overflow-x-auto pb-4'
              : 'columns-1 gap-8 md:columns-2 lg:columns-3'
        }`}
      >
        {testimonials.map((testimonial: any, index: number) => (
          <div
            key={testimonial.id || index}
            className={`flex flex-col rounded-lg border border-border bg-card p-6 ${
              layout === 'carousel' ? 'min-w-[300px] flex-shrink-0' : ''
            } ${layout === 'masonry' ? 'mb-8 break-inside-avoid' : ''}`}
          >
            {showRatings && testimonial.rating && (
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
            )}

            <blockquote className="mb-6 flex-1 text-base italic text-muted-foreground">
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
                  {testimonial.company && ` at ${testimonial.company}`}
                </div>
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
  )
}
