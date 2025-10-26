"use client"

import { Button } from "@/components/ui/button"

interface Course {
  id: string
  title: string
  description: string
  imageUrl: string
  instructorName?: string
  instructorImage?: string
  shortUrl: string
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={course.imageUrl || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Title */}
        <h3 className="line-clamp-2 text-base font-semibold leading-tight text-foreground">{course.title}</h3>

        {/* Description */}
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{course.description}</p>

        <Button
          onClick={() => window.open(course.shortUrl, "_blank")}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
        >
          Lihat Kursus
        </Button>
      </div>
    </div>
  )
}
