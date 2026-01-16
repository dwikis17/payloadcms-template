'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'

type Props = FAQBlockProps

export const FAQComponent: React.FC<Props> = (props) => {
  const { title, faqs, displayStyle = 'accordion' } = props
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  if (displayStyle === 'grid') {
    return (
      <div className="container my-16">
        {title && (
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg border border-border bg-card p-6">
              <h3 className="mb-3 text-xl font-semibold">{faq.question}</h3>
              <div className="text-muted-foreground">
                <RichText data={faq.answer} enableGutter={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
      )}

      <div className="mx-auto max-w-3xl divide-y divide-border rounded-lg border border-border">
        {faqs.map((faq, index) => (
          <div key={index} className="group">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
              aria-expanded={openIndex === index}
            >
              <span className="pr-8 text-lg font-semibold">{faq.question}</span>
              <svg
                className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all ${
                openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6 text-muted-foreground">
                <RichText data={faq.answer} enableGutter={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
