import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const courses = await payload.find({
    collection: 'courses',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  return courses.docs.map(({ slug }) => ({ slug }))
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  const course = await queryCourseBySlug({ slug })

  if (!course) {
    notFound()
  }

  return (
    <article className="pb-24 pt-24">
      <div className="container">
        {/* Course Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              {course.level || 'All Levels'}
            </span>
            {course.categories && course.categories.length > 0 && (
              <div className="flex gap-2">
                {course.categories.map((cat: any) => (
                  <span
                    key={cat.id}
                    className="rounded-full bg-muted px-3 py-1 text-sm"
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{course.title}</h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-muted-foreground">
            {course.instructor && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Instructor: {course.instructor.name}</span>
              </div>
            )}
            {course.duration && (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{course.duration}</span>
              </div>
            )}
            {course.rating > 0 && (
              <div className="flex items-center gap-1">
                <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                <span>({course.enrollmentCount?.toLocaleString()} students)</span>
              </div>
            )}
          </div>

          {course.thumbnail && (
            <div className="mb-8 aspect-video overflow-hidden rounded-lg">
              <Media resource={course.thumbnail} imgClassName="h-full w-full object-cover" />
            </div>
          )}

          <div className="mb-8 flex items-center justify-between rounded-lg border border-border bg-card p-6">
            <div>
              <div className="text-3xl font-bold">
                {course.price === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>${course.price}</span>
                )}
              </div>
            </div>
            <button className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Enroll Now
            </button>
          </div>
        </div>

        {/* Course Content */}
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {course.description && (
              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">About This Course</h2>
                <div className="prose max-w-none dark:prose-invert">
                  <RichText data={course.description} enableGutter={false} />
                </div>
              </div>
            )}

            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">What You'll Learn</h2>
                <ul className="grid gap-3 md:grid-cols-2">
                  {course.learningOutcomes.map((outcome: any, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 flex-shrink-0 text-green-500"
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
                      <span>{outcome.outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.curriculum && course.curriculum.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-4 text-2xl font-bold">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.curriculum.map((module: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border bg-card p-6"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{module.module}</h3>
                        {module.duration && (
                          <span className="text-sm text-muted-foreground">
                            {module.duration}
                          </span>
                        )}
                      </div>
                      {module.lessons && module.lessons.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {module.lessons.map((lesson: any, lessonIndex: number) => (
                            <li
                              key={lessonIndex}
                              className="flex items-center gap-2 text-muted-foreground"
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
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{lesson.lesson}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {course.prerequisites && (
              <div className="mb-8 rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Prerequisites</h3>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <RichText data={course.prerequisites} enableGutter={false} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

const queryCourseBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
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
  const course = await queryCourseBySlug({ slug })

  return {
    title: course?.title || 'Course',
    description: course?.description
      ? JSON.stringify(course.description).slice(0, 160)
      : 'Course details',
  }
}
