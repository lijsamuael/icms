import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ExternalLink } from "lucide-react"
import { subjects, lessons } from "@/lib/data"

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  const subjectId = Number.parseInt(params.id)
  const subject = subjects.find((s) => s.id === subjectId)

  if (!subject) {
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
          <p className="text-gray-600 text-center mb-6">The subject you are looking for does not exist.</p>
          <Link
            href="/subjects"
            className="block w-full bg-emerald-700 text-white text-center py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Back to Subjects
          </Link>
        </div>
      </div>
    )
  }

  const subjectLessons = lessons.filter((lesson) => lesson.subject.includes(subject.name))

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Islamic Education Logo" width={40} height={40} className="rounded-md" />
            <h1 className="text-2xl font-bold">Islamic Education</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-medium hover:text-emerald-200 transition-colors">
              Home
            </Link>
            <Link href="/teachers" className="font-medium hover:text-emerald-200 transition-colors">
              Teachers
            </Link>
            <Link
              href="/subjects"
              className="font-medium hover:text-emerald-200 transition-colors border-b-2 border-emerald-600"
            >
              Subjects
            </Link>
            <Link
              href="/login"
              className="bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-md transition-colors font-medium"
            >
              Login
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
            <button className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Subject Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/70 z-10"></div>
        <div className="relative h-[300px]">
          <Image src={subject.image || "/placeholder.svg"} alt={subject.name} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 flex items-center z-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/subjects"
                className="text-emerald-200 hover:text-white transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} />
                Back to Subjects
              </Link>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{subject.name}</h1>
            <p className="text-lg text-emerald-100 max-w-2xl">{subject.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Lessons on {subject.name}</h2>

        {subjectLessons.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-xl text-center">
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
            <p className="text-gray-600">
              There are currently no lessons available for this subject. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjectLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 relative">
                  <Image
                    src={lesson.cover_image || "/placeholder.svg"}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-emerald-700 text-white px-3 py-1 text-sm font-medium">
                    {lesson.teacher}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {lesson.subject.map((subj, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          subj === subject.name
                            ? "bg-emerald-200 text-emerald-800 font-medium"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {subj}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Telegram Channels:</h4>
                    {lesson.part.map((link, idx) => (
                      <a
                        key={idx}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-emerald-700 text-white py-2 px-4 rounded-md hover:bg-emerald-600 transition-colors w-full"
                      >
                        <span>Part {idx + 1}</span>
                        <ExternalLink size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="Islamic Education Logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <h3 className="text-xl font-bold">Islamic Education</h3>
              </div>
              <p className="text-gray-400">Providing quality Islamic education resources to Muslims worldwide.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/teachers" className="text-gray-400 hover:text-white transition-colors">
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link href="/subjects" className="text-gray-400 hover:text-white transition-colors">
                    Subjects
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@islamiceducation.org</li>
                <li>Phone: +1 (123) 456-7890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Islamic Education Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
