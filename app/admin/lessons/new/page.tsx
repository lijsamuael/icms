"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Plus, Trash } from "lucide-react"
import { teachers, subjects, lessons } from "@/lib/data"

export default function NewLessonPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [teacher, setTeacher] = useState("")
  const [coverImage, setCoverImage] = useState("/images/lesson1.png")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [telegramLinks, setTelegramLinks] = useState<string[]>([""])
  const [error, setError] = useState("")

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

    // Create new lesson
    const newId = lessons.length > 0 ? Math.max(...lessons.map((l) => l.id)) + 1 : 1
    const newLesson = {
      id: newId,
      title,
      description,
      teacher,
      cover_image: coverImage,
      subject: selectedSubjects,
      part: telegramLinks,
    }

    // In a real app, you would save this to your database or state management
    console.log("New lesson created:", newLesson)

    // Redirect back to dashboard
    router.push("/admin/dashboard")
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Lesson</h2>

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
                  <Image src={coverImage || "/placeholder.svg"} alt="Cover preview" fill className="object-cover" />
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
                Save Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
