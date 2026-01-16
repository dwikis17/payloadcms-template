import React from 'react'
import type { FeatureGridBlock as FeatureGridBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Props = FeatureGridBlockProps

export const FeatureGridComponent: React.FC<Props> = (props) => {
  const { title, features, columns = '3' } = props

  if (!features || features.length === 0) {
    return null
  }

  const gridColsClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-2 lg:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }[columns]

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">{title}</h2>
      )}

      <div className={`grid gap-8 ${gridColsClass}`}>
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center transition-all hover:scale-105"
          >
            {feature.icon && (
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Media
                  resource={feature.icon}
                  imgClassName="h-10 w-10 object-contain"
                />
              </div>
            )}

            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>

            <p className="mb-4 text-muted-foreground">{feature.description}</p>

            {feature.link && (
              <CMSLink
                {...feature.link}
                appearance="link"
                className="text-primary hover:underline"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
