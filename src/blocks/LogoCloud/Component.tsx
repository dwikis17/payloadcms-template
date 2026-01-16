import React from 'react'
import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = LogoCloudBlockProps

export const LogoCloudComponent: React.FC<Props> = (props) => {
  const { title, logos, grayscale = true } = props

  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-xl font-semibold text-muted-foreground">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {logos.map((item, index) => {
          const logoElement = (
            <div
              className={`flex h-16 items-center justify-center transition-all ${
                grayscale ? 'grayscale hover:grayscale-0' : ''
              } opacity-60 hover:opacity-100`}
            >
              <Media
                resource={item.logo}
                imgClassName="h-12 w-auto max-w-full object-contain"
              />
            </div>
          )

          if (item.url) {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.companyName}
                className="block"
              >
                {logoElement}
              </a>
            )
          }

          return (
            <div key={index} aria-label={item.companyName}>
              {logoElement}
            </div>
          )
        })}
      </div>
    </div>
  )
}
