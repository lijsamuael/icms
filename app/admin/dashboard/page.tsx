"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Save, Plus, Trash, Edit, LogOut, Users, BookOpen, FileText, Eye } from "lucide-react"
import { teachers, subjects, lessons, type Teacher, type Subject, type Lesson } from "@/lib/data"

export default function AdminDashboard() {
  const [teachersList, setTeachersList] = useState<Teacher[]>([])
  const [subjectsList, setSubjectsList] = useState<Subject[]>([])
  const [lessonsList, setLessonsList] = useState<Lesson[]>([])
  const [activeTab, setActiveTab] = useState<"teachers" | "subjects" | "lessons">("teachers")
  const [saveStatus, setSaveStatus] = useState<string | null>(null)

  // Load data on component mount
  useEffect(() => {
    setTeachersList([...teachers])
    setSubjectsList([...subjects])
    setLessonsList([...lessons])
  }, [])

  // Mock function to simulate saving to GitHub
  const saveToGitHub = () => {
    setSaveStatus("Saving changes to GitHub...")

    // Simulate API call delay
    setTimeout(() => {
      setSaveStatus("Changes successfully saved and pushed to GitHub!")

      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null)
      }, 3000)
    }, 1500)
  }

  // Teachers management
  const deleteTeacher = (id: number) => {
    setTeachersList(teachersList.filter((teacher) => teacher.id !== id))
  }

  // Subjects management
  const deleteSubject = (id: number) => {
    setSubjectsList(subjectsList.filter((subject) => subject.id !== id))
  }

  // Lessons management
  const deleteLesson = (id: number) => {
    setLessonsList(lessonsList.filter((lesson) => lesson.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Islamic Education Logo" width={40} height={40} className="rounded-md" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Link href="/" className="flex items-center gap-2 hover:text-emerald-200 transition-colors">
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium ${
              saveStatus.includes("Saving") ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"
            }`}
          >
            {saveStatus}
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Content Management</h2>
          <button
            onClick={saveToGitHub}
            className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 font-medium"
          >
            <Save size={18} />
            Save Changes to GitHub
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all ${
              activeTab === "teachers" ? "ring-2 ring-emerald-500" : ""
            }`}
            onClick={() => setActiveTab("teachers")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Teachers</h3>
                  <p className="text-gray-600 text-sm">{teachersList.length} teachers</p>
                </div>
              </div>
              {activeTab === "teachers" && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
            </div>
          </div>

          <div
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all ${
              activeTab === "subjects" ? "ring-2 ring-emerald-500" : ""
            }`}
            onClick={() => setActiveTab("subjects")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <BookOpen className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Subjects</h3>
                  <p className="text-gray-600 text-sm">{subjectsList.length} subjects</p>
                </div>
              </div>
              {activeTab === "subjects" && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
            </div>
          </div>

          <div
            className={`bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-all ${
              activeTab === "lessons" ? "ring-2 ring-emerald-500" : ""
            }`}
            onClick={() => setActiveTab("lessons")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <FileText className="text-emerald-700" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Lessons</h3>
                  <p className="text-gray-600 text-sm">{lessonsList.length} lessons</p>
                </div>
              </div>
              {activeTab === "lessons" && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Teachers Tab */}
          {activeTab === "teachers" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Manage Teachers</h3>
                <Link
                  href="/admin/teachers/new"
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Teacher
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teachersList.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-all"
                  >
                    <div className="flex">
                      <div className="w-20 h-20 m-2 relative">
                        <Image
                          src={"/images/placeholder-teacher.png"}
                          alt={teacher.name}
                          fill
                          className="object-cover rounded-2xl"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/images/placeholder-teacher.png"
                          }}
                        />
                      </div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">{teacher.name}</h4>
                          <div className="flex gap-1">
                            <Link
                              href={`/admin/teachers/view/${teacher.id}`}
                              className="text-emerald-600 hover:text-emerald-700"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                              href={`/admin/teachers/edit/${teacher.id}`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => deleteTeacher(teacher.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2 mt-1">{teacher.bio.substring(0, 60)}...</p>
                      </div>
                    </div>
                  </div>
                ))}

                {teachersList.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No teachers added yet. Add your first teacher.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subjects Tab */}
          {activeTab === "subjects" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Manage Subjects</h3>
                <Link
                  href="/admin/subjects/new"
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Subject
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectsList.map((subject) => (
                  <div
                    key={subject.id}
                    className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-all"
                  >
                    <div className="h-32 relative">
                      <Image
                        src={"/images/placeholder-subject.png"}
                        alt={subject.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/images/placeholder-subject.png"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-3 w-full flex justify-between items-center">
                          <h4 className="font-medium text-white">{subject.name}</h4>
                          <div className="flex gap-1">
                            <Link
                              href={`/admin/subjects/edit/${subject.id}`}
                              className="text-white hover:text-gray-200"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => deleteSubject(subject.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {subjectsList.length === 0 && (
                  <div className="col-span-3 text-center py-8 text-gray-500">
                    No subjects added yet. Add your first subject.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Lessons Tab */}
          {activeTab === "lessons" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Manage Lessons</h3>
                <Link
                  href="/admin/lessons/new"
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Lesson
                </Link>
              </div>

              <div className="space-y-4">
                {lessonsList.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-all"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/4 h-48 md:h-auto relative">
                        <Image
                          src={"/images/placeholder-lesson.png"}
                          alt={lesson.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/images/placeholder-lesson.png"
                          }}
                        />
                      </div>
                      <div className="p-4 md:w-3/4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800">{lesson.title}</h4>
                            <p className="text-emerald-700 text-sm">By {lesson.teacher}</p>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              href={`/admin/lessons/edit/${lesson.id}`}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Edit size={18} />
                            </Link>
                            <button onClick={() => deleteLesson(lesson.id)} className="text-red-500 hover:text-red-700">
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
                        <p className="text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                        <div>
                          <p className="text-sm text-gray-700 mb-1">Telegram Links: {lesson.part.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {lessonsList.length === 0 && (
                  <div className="text-center py-8 text-gray-500">No lessons added yet. Add your first lesson.</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
