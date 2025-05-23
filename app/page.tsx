import Link from "next/link"
import { Book, Users, ChevronRight } from "lucide-react"
import { teachers, subjects, lessons } from "@/lib/data"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-emerald-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Islamic Education</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-medium hover:text-emerald-200 transition-colors border-b-2 border-emerald-600"
            >
              Home
            </Link>
            <Link href="/teachers" className="font-medium hover:text-emerald-200 transition-colors">
              Teachers
            </Link>
            <Link href="/subjects" className="font-medium hover:text-emerald-200 transition-colors">
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

      {/* Hero Section */}
      <section className="relative bg-emerald-900/80">
        <div className="container mx-auto px-4 py-24 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl mx-auto">
            Discover the Path of Knowledge in Islam
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-emerald-50">
            Access quality Islamic education materials from respected teachers and scholars. Expand your understanding
            of the Quran, Hadith, and Islamic principles.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/teachers"
              className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-md transition-colors flex items-center gap-2 font-medium"
            >
              <Users size={20} />
              Browse Teachers
            </Link>
            <Link
              href="/subjects"
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3 rounded-md transition-colors flex items-center gap-2 font-medium"
            >
              <Book size={20} />
              Explore Subjects
            </Link>
          </div>
        </div>
      </section>


      {/* Popular Subjects */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Popular Subjects</h2>
            <Link
              href="/subjects"
              className="text-emerald-700 hover:text-emerald-600 flex items-center gap-1 font-medium"
            >
              View All Subjects
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.slice(0, 3).map((subject) => (
              <div key={subject.id} className="relative rounded-xl overflow-hidden group h-64">
                <div className="absolute inset-0 bg-emerald-100 flex items-center justify-center">
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 to-emerald-800/40 flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white mb-2">{subject.name}</h3>
                    <p className="text-emerald-100 mb-3 line-clamp-2">{subject.description}</p>
                    <Link
                      href={`/subjects/${subject.id}`}
                      className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
                    >
                      Explore Lessons
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Featured Lessons</h2>
            <Link
              href="/lessons"
              className="text-emerald-700 hover:text-emerald-600 flex items-center gap-1 font-medium"
            >
              View All Lessons
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.slice(0, 3).map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-800 text-xl font-semibold">{lesson.title}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{lesson.title}</h3>
                  <p className="text-gray-600 mb-2">By {lesson.teacher}</p>
                  <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="text-emerald-700 hover:text-emerald-600 font-medium flex items-center gap-1"
                  >
                    View Lesson
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Journey of Islamic Knowledge</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-emerald-100">
            Join our community of learners and access quality Islamic education materials from respected teachers.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/teachers"
              className="bg-white text-emerald-800 hover:bg-emerald-100 px-6 py-3 rounded-md transition-colors font-medium"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Islamic Education</h3>
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