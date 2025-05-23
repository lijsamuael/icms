import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { subjects } from "@/lib/data"

export default function SubjectsPage() {
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

      {/* Page Header */}
      <div className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-emerald-200 hover:text-white transition-colors flex items-center gap-1">
              <ChevronLeft size={16} />
              Home
            </Link>
            <span className="text-emerald-200">/</span>
            <span>Subjects</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Islamic Subjects</h1>
          <p className="text-lg text-emerald-100 max-w-2xl">
            Explore various Islamic subjects and disciplines taught by our qualified teachers. Select a subject to view
            related lessons.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="group relative h-72 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={subject.image || "/placeholder.svg"}
                alt={subject.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-800/60 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{subject.name}</h2>
                <p className="text-emerald-100 line-clamp-2 mb-4 text-sm">{subject.description}</p>
                <div className="bg-white/20 text-white text-center py-2 rounded-md hover:bg-white/30 transition-colors text-sm font-medium">
                  Explore Lessons
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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
