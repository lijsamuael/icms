"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { getTeacher, updateTeacher } from "@/lib/data-service"

export default function EditTeacherPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const teacherId = Number.parseInt(params.id)

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState("/images/placeholder-teacher.png")
  const [expertise, setExpertise] = useState<string[]>([""])
  const [error, setError] = useState("")
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  // Load teacher data
  useEffect(() => {
    const teacher = getTeacher(teacherId)

    if (teacher) {
      setName(teacher.name)
      setBio(teacher.bio)
      setImage(teacher.image)
      setExpertise([...teacher.expertise])
      setIsInitialLoading(false)
    } else {
      setNotFound(true)
      setIsInitialLoading(false)
    }
  }, [teacherId])

  const updateExpertise = (index: number, value: string) => {
    const newExpertise = [...expertise]
    newExpertise[index] = value
    setExpertise(newExpertise)
  }

  const addExpertise = () => {
    setExpertise([...expertise, ""])
  }

  const removeExpertise = (index: number) => {
    if (expertise.length > 1) {
      const newExpertise = [...expertise]
      newExpertise.splice(index, 1)
      setExpertise(newExpertise)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!name) {
      setError("Please enter a teacher name")
      setIsLoading(false)
      return
    }

    if (!bio) {
      setError("Please enter a teacher bio")
      setIsLoading(false)
      return
    }

    if (expertise.some((exp) => !exp)) {
      setError("Please fill all expertise fields or remove empty ones")
      setIsLoading(false)
      return
    }

    try {
      // Update teacher
      await updateTeacher(teacherId, {
        name,
        bio,
        image: image || "/images/placeholder-teacher.png",
        expertise: expertise.filter((exp) => exp.trim() !== ""),
      })

      // Redirect back to dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error updating teacher:", error)
      setError("Failed to update teacher. Please try again.")
      setIsLoading(false)
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
          <p className="text-gray-600 text-center mb-6">The teacher you are trying to edit does not exist.</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Teacher</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Teacher Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter teacher name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isLoading}
              />
            </div>

            {/* Teacher Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Enter teacher biography"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isLoading}
              />
            </div>

            {/* Teacher Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Image URL</label>
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
                  src={image || "/images/placeholder-teacher.png"}
                  alt="Teacher preview"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/images/placeholder-teacher.png"
                  }}
                />
              </div>
            </div>

            {/* Teacher Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Expertise</label>
              <div className="space-y-3">
                {expertise.map((exp, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={exp}
                      onChange={(e) => updateExpertise(index, e.target.value)}
                      placeholder="e.g., Quran Tafsir, Arabic Language"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      disabled={isLoading}
                    />
                    {expertise.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExpertise(index)}
                        className="text-red-500 hover:text-red-700 px-3 py-3 border border-gray-300 rounded-lg"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addExpertise}
                  className="text-emerald-700 hover:text-emerald-600 flex items-center gap-1 text-sm font-medium"
                  disabled={isLoading}
                >
                  + Add another expertise
                </button>
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
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Update Teacher"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
