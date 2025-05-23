"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Edit, Trash, Plus, ExternalLink } from "lucide-react"
import { getTeacher, getLessonsByTeacher, deleteLesson } from "@/lib/data-service"

export default function ViewTeacherPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const teacherId = Number.parseInt(params.id)

  const [teacher, setTeacher] = useState<any>(null)
  const [teacherLessons, setTeacherLessons] = useState<any[]>([])
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Load teacher data
  useEffect(() => {
    const foundTeacher = getTeacher(teacherId)

    if (foundTeacher) {
      setTeacher(foundTeacher)
      const foundLessons = getLessonsByTeacher(foundTeacher.name)
      setTeacherLessons(foundLessons)
      setIsInitialLoading(false)
    } else {
      setNotFound(true)
      setIsInitialLoading(false)
    }
  }, [teacherId])

  const handleDeleteLesson = async (lessonId: number) => {
    if (window.confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      setIsLoading(true)
      try {
        await deleteLesson(lessonId)
        // Refresh lessons list
        if (teacher) {
          const updatedLessons = getLessonsByTeacher(teacher.name)
          setTeacherLessons(updatedLessons)
        }
      } catch (error) {
        console.error("Error deleting lesson:", error)
        alert("Failed to delete lesson. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-16 h-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Teacher Not Found</h1>
          <p className="text-gray-600 text-center mb-6">The teacher you are looking for does not exist.</p>
          <Link
            href="/admin/dashboard"
            className="block w-full bg-emerald-700 text-white text-center py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Islamic Education Logo" width={40} height={40} className="rounded-md" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Link href="/" className="hover:text-emerald-200 transition-colors font-medium">
            Logout
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/admin/dashboard"
          className="text-emerald-700 hover:text-emerald-600 flex items-center gap-2 mb-6 font-medium"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 h-64 md:h-auto relative">
              <Image
                src={teacher.image || "/images/placeholder-teacher.png"}
                alt={teacher.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/images/placeholder-teacher.png"
                }}
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{teacher.name}</h2>
                <Link
                  href={`/admin/teachers/edit/${teacher.id}`}
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Edit size={16} />
                  Edit Teacher
                </Link>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {teacher.expertise.map((exp: string, idx: number) => (
                  <span key={idx} className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {exp}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mb-4">{teacher.bio}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lessons by {teacher.name}</h2>
          <Link
            href="/admin/lessons/new"
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Plus size={16} />
            Add New Lesson
          </Link>
        </div>

        {teacherLessons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-gray-400 mb-4 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-16 h-16"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M12 4v16" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Lessons Available</h3>
            <p className="text-gray-600 mb-6">
              There are currently no lessons available from this teacher. Add a new lesson to get started.
            </p>
            <Link
              href="/admin/lessons/new"
              className="inline-block bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Add First Lesson
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {teacherLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="md:flex">
                  <div className="md:w-1/4 h-48 md:h-auto relative">
                    <Image
                      src={lesson.cover_image || "/images/placeholder-lesson.png"}
                      alt={lesson.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/images/placeholder-lesson.png"
                      }}
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{lesson.title}</h3>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/lessons/edit/${lesson.id}`}
                          className="text-gray-600 hover:text-gray-900 bg-gray-100 p-2 rounded-lg"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          disabled={isLoading}
                          className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg disabled:opacity-50"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {lesson.subject.map((subj: string, idx: number) => (
                        <span key={idx} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                          {subj}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 mb-4">{lesson.description}</p>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Telegram Links:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lesson.part.map((link: string, idx: number) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors"
                          >
                            <span className="truncate">
                              Part {idx + 1}: {link}
                            </span>
                            <ExternalLink size={14} className="ml-2 flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
