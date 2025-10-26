"use client"

import { useEffect, useState } from "react"
import CourseCard from "@/components/course-card"
import Header from "@/components/header"

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  instructorName?: string
  instructorImage?: string
  shortUrl: string
}

const SAMPLE_COURSES: Course[] = [
  {
    id: "1",
    title: "Mastering Power BI Report Design - Beginner to Advanced",
    description:
      "A Full Guide to Creating Insightful Reports, Interactive Dashboards, and Effective Data Storytelling Using Power BI",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/6136169_1614.jpg",
    shortUrl: "https://sfl.gl/1upD0q4",
  },
  {
    id: "2",
    title: "Microsoft Power BI for Beginners & Excel Users",
    description:
      "Mastering Data Analysis and Dynamic Visualizations with Microsoft Power BI - Recorded Live with Executives in Training.",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/5949584_3887_4.jpg",
    shortUrl: "https://sfl.gl/74XMs64",
  },
  {
    id: "3",
    title: "Java: Complete Java Core for Beginners with Exercises - 2025",
    description:
      "Java, Java Core, Object Oriented Programming (OOP), Collections, Maps, Exceptions, Generics, IO, Concurrency Explained",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/2751532_8a0f_3.jpg",
    shortUrl: "https://sfl.gl/java2025",
  },
  {
    id: "4",
    title: "Architecting LLM Apps on Azure: RAG, Agents, and Real-World",
    description: "Master Generative AI & Enterprise Solutions with Azure OpenAI & AI Foundry",
    imageUrl: "https://img-c.udemycdn.com/course/480x270/5949584_3887_4.jpg",
    shortUrl: "https://sfl.gl/llmapps",
  },
]

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api-coursesqaqaarslan.up.railway.app/"),
      )
      const wrapped = await res.json()

      try {
        const data = JSON.parse(wrapped.contents)
        if (data.courses && Array.isArray(data.courses)) {
          // Add IDs to courses if they don't have them
          const coursesWithIds = data.courses.map((course: any, index: number) => ({
            id: course.id || `course-${index}`,
            ...course,
          }))
          setCourses(coursesWithIds)
        } else {
          throw new Error("Invalid API response format")
        }
      } catch (parseError) {
        console.error("[v0] Failed to parse API response:", parseError)
        // Use sample data as fallback
        setCourses(SAMPLE_COURSES)
        setError("Using sample data - API temporarily unavailable")
      }
    } catch (err) {
      console.error("[v0] API fetch error:", err)
      // Use sample data as fallback
      setCourses(SAMPLE_COURSES)
      setError("Using sample data - API temporarily unavailable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header onRefresh={loadCourses} />

      <div className="container mx-auto px-4 py-12">
        {error && <div className="mb-8 rounded-lg bg-yellow-500/10 p-4 text-yellow-600">{error}</div>}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
              <p className="text-muted-foreground">Loading courses...</p>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted-foreground">No courses available</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
