import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ProductsPage() {
  const payload = await getPayload({ config: configPromise })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    limit: 12,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <div className="pb-24 pt-24">
      <div className="container mb-16">
        <div className="prose max-w-none dark:prose-invert">
          <h1>Products</h1>
          <p className="text-lg text-muted-foreground">
            Browse our complete product catalog
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.docs.map((product: any) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
            >
              {product.images && product.images.length > 0 && (
                <div className="aspect-square overflow-hidden">
                  <Media
                    resource={product.images[0].image}
                    imgClassName="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold group-hover:text-primary">
                  {product.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                  {product.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    {product.salePrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-red-600">
                          ${product.salePrice}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold">${product.price}</span>
                    )}
                  </div>

                  {!product.inStock && (
                    <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800 dark:bg-red-900 dark:text-red-200">
                      Out of Stock
                    </span>
                  )}
                </div>

                {product.inStock && (
                  <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                    Add to Cart
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>

        {products.docs.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No products available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Products',
    description: 'Browse our complete product catalog',
  }
}
