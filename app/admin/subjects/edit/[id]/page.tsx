"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { subjects } from "@/lib/data"

export default function EditSubjectPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const subjectId = Number.parseInt(params.id)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("/images/placeholder-subject.png")
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)

  // Load subject data
  useEffect(() => {
    const subject = subjects.find((s) => s.id === subjectId)

    if (subject) {
      setName(subject.name)
      setDescription(subject.description)
      setImage(subject.image)
    } else {
      setNotFound(true)
    }
  }, [subjectId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!name) {
      setError("Please enter a subject name")
      return
    }

    if (!description) {
      setError("Please enter a subject description")
      return
    }

    // In a real app, you would save this to your database or state management
    console.log("Subject updated:", {
      id: subjectId,
      name,
      description,
      image,
    })

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
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Subject Not Found</h1>
          <p className="text-gray-600 text-center mb-6">The subject you are trying to edit does not exist.</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Subject</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter subject name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Subject Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter subject description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Subject Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="mt-2 relative h-40 w-full md:w-1/3 rounded-lg overflow-hidden">
                <Image
                  src={image || "/images/placeholder-subject.png"}
                  alt="Subject preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/images/placeholder-subject.png"
                  }}
                />
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
                Update Subject
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
