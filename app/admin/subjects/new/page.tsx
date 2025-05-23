"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { createSubject } from "@/lib/data-service"

export default function NewSubjectPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("/images/placeholder-subject.png")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!name) {
      setError("Please enter a subject name")
      setIsLoading(false)
      return
    }

    if (!description) {
      setError("Please enter a subject description")
      setIsLoading(false)
      return
    }

    try {
      // Create new subject
      await createSubject({
        name,
        description,
        image: image || "/images/placeholder-subject.png",
      })

      // Redirect back to dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error creating subject:", error)
      setError("Failed to create subject. Please try again.")
      setIsLoading(false)
    }
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Subject</h2>

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
                disabled={isLoading}
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
                disabled={isLoading}
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
                disabled={isLoading}
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
                className={`px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium ${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
              >
                Cancel
              </Link>
              <button
                type="submit"
                className={`bg-emerald-700 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save Subject"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
