import React from 'react'
import type { StatsBlock as StatsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'

type Props = StatsBlockProps

export const StatsComponent: React.FC<Props> = (props) => {
  const { stats, layout = 'horizontal' } = props

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <div className="container my-16">
      <div
        className={`${
          layout === 'horizontal'
            ? 'flex flex-wrap justify-center gap-12 md:gap-16'
            : 'grid gap-8 md:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center ${
              layout === 'horizontal' ? '' : 'rounded-lg border border-border bg-card p-6'
            }`}
          >
            {stat.icon && (
              <div className="mb-3 flex h-12 w-12 items-center justify-center">
                <Media
                  resource={stat.icon}
                  imgClassName="h-full w-full object-contain opacity-60"
                />
              </div>
            )}

            <div className="text-4xl font-bold text-primary md:text-5xl">
              {stat.value}
            </div>

            <div className="mt-2 text-base text-muted-foreground md:text-lg">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
