"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Plus, Trash } from "lucide-react"
import { teachers, subjects, lessons, type Lesson } from "@/lib/data"

export default function EditLessonPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const lessonId = Number.parseInt(params.id)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [teacher, setTeacher] = useState("")
  const [coverImage, setCoverImage] = useState("/images/placeholder-lesson.png")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [telegramLinks, setTelegramLinks] = useState<string[]>([""])
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)

  // Load lesson data
  useEffect(() => {
    const lesson = lessons.find((l) => l.id === lessonId)

    if (lesson) {
      setTitle(lesson.title)
      setDescription(lesson.description)
      setTeacher(lesson.teacher)
      setCoverImage(lesson.cover_image)
      setSelectedSubjects([...lesson.subject])
      setTelegramLinks([...lesson.part])
    } else {
      setNotFound(true)
    }
  }, [lessonId])

  const handleSubjectToggle = (subjectName: string) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subjectName))
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName])
    }
  }

  const updateTelegramLink = (index: number, value: string) => {
    const newLinks = [...telegramLinks]
    newLinks[index] = value
    setTelegramLinks(newLinks)
  }

  const addTelegramLink = () => {
    setTelegramLinks([...telegramLinks, ""])
  }

  const removeTelegramLink = (index: number) => {
    if (telegramLinks.length > 1) {
      const newLinks = [...telegramLinks]
      newLinks.splice(index, 1)
      setTelegramLinks(newLinks)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!title) {
      setError("Please enter a lesson title")
      return
    }

    if (!teacher) {
      setError("Please select a teacher")
      return
    }

    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject")
      return
    }

    if (telegramLinks.some((link) => !link)) {
      setError("Please fill all Telegram links")
      return
    }

    // Update lesson
    const updatedLesson: Lesson = {
      id: lessonId,
      title,
      description,
      teacher,
      cover_image: coverImage,
      subject: selectedSubjects,
      part: telegramLinks,
    }

    // In a real app, you would save this to your database or state management
    console.log("Lesson updated:", updatedLesson)

    // Redirect back to dashboard
    router.push("/admin/dashboard")
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
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 text-center mb-6">The lesson you are trying to edit does not exist.</p>
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

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Lesson</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Lesson Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lesson title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Lesson Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter lesson description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Teacher selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Select a teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Image URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {coverImage && (
                <div className="mt-2 relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                  <Image
                    src={coverImage || "/images/placeholder-lesson.png"}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/placeholder-lesson.png"
                    }}
                  />
                </div>
              )}
            </div>

            {/* Subject selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (select multiple)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border border-gray-300 rounded-lg p-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subject-${subject.id}`}
                      checked={selectedSubjects.includes(subject.name)}
                      onChange={() => handleSubjectToggle(subject.name)}
                      className="mr-2"
                    />
                    <label htmlFor={`subject-${subject.id}`} className="text-sm">
                      {subject.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Telegram links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telegram Links</label>
              <div className="space-y-3">
                {telegramLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => updateTelegramLink(index, e.target.value)}
                      placeholder="https://t.me/channel_name"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTelegramLink(index)}
                      className="text-red-500 hover:text-red-700 px-3 py-3 border border-gray-300 rounded-lg"
                      disabled={telegramLinks.length <= 1}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTelegramLink}
                  className="text-emerald-700 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add another link
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Link
                href="/admin/dashboard"
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
              >
                Update Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
