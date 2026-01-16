import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function CoursesPage() {
  const payload = await getPayload({ config: configPromise })

  const courses = await payload.find({
    collection: 'courses',
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
          <h1>Courses</h1>
          <p className="text-lg text-muted-foreground">
            Explore our comprehensive course catalog
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.docs.map((course: any) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
            >
              {course.thumbnail && (
                <div className="aspect-video overflow-hidden">
                  <Media
                    resource={course.thumbnail}
                    imgClassName="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {course.level || 'All Levels'}
                  </span>
                  {course.rating > 0 && (
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold">
                        {course.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="mb-2 text-xl font-bold group-hover:text-primary">
                  {course.title}
                </h3>

                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  {course.duration && (
                    <span className="flex items-center gap-1">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {course.duration}
                    </span>
                  )}
                  {course.enrollmentCount > 0 && (
                    <span className="flex items-center gap-1">
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      {course.enrollmentCount.toLocaleString()} students
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {course.price === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>${course.price}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {courses.docs.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <p>No courses available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Courses',
    description: 'Explore our comprehensive course catalog',
  }
}
