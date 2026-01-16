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
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return products.docs.map(({ slug }) => ({ slug }))
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  const product = await queryProductBySlug({ slug })

  if (!product) {
    notFound()
  }

  return (
    <article className="pb-24 pt-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            {product.images && product.images.length > 0 && (
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg border border-border">
                  <Media
                    resource={product.images[0].image}
                    imgClassName="h-full w-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(1, 5).map((img: any, index: number) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg border border-border"
                      >
                        <Media
                          resource={img.image}
                          imgClassName="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.categories && product.categories.length > 0 && (
              <div className="mb-4 flex gap-2">
                {product.categories.map((cat: any) => (
                  <span
                    key={cat.id}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mb-4 text-4xl font-bold">{product.title}</h1>

            <div className="mb-6 flex items-center gap-4">
              {product.salePrice ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.salePrice}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price}
                  </span>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800 dark:bg-red-900 dark:text-red-200">
                    Save ${(product.price - product.salePrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold">${product.price}</span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-lg text-muted-foreground">{product.shortDescription}</p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">SKU:</span>
                <span className="text-sm text-muted-foreground">{product.sku}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Stock:</span>
                {product.inStock ? (
                  <span className="text-sm text-green-600">
                    In Stock ({product.inventory} available)
                  </span>
                ) : (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div className="mb-6 space-y-4">
                {product.variants.map((variant: any, index: number) => (
                  <div key={index}>
                    <label className="mb-2 block text-sm font-semibold">
                      {variant.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options?.map((option: any, optIndex: number) => (
                        <button
                          key={optIndex}
                          className="rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:bg-primary/10"
                        >
                          {option.option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mb-8 flex gap-4">
              <button
                disabled={!product.inStock}
                className="flex-1 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="rounded-lg border border-border px-6 py-4 transition-colors hover:bg-muted">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {product.description && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Description</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <RichText data={product.description} enableGutter={false} />
                </div>
              </div>
            )}

            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">Specifications</h2>
                <dl className="space-y-2">
                  {product.specifications.map((spec: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between border-b border-border py-2"
                    >
                      <dt className="font-semibold">{spec.label}</dt>
                      <dd className="text-muted-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold">Related Products</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {product.relatedProducts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
                >
                  {related.images && related.images.length > 0 && (
                    <div className="aspect-square overflow-hidden">
                      <Media
                        resource={related.images[0].image}
                        imgClassName="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="mb-2 line-clamp-2 font-semibold group-hover:text-primary">
                      {related.title}
                    </h3>
                    <span className="font-bold">${related.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
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
  const product = await queryProductBySlug({ slug })

  return {
    title: product?.title || 'Product',
    description: product?.shortDescription || 'Product details',
  }
}
