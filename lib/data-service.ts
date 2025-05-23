import { teachers, subjects, lessons, type Teacher, type Subject, type Lesson } from "@/lib/data"
import { commitAndPushChanges } from "@/lib/github"

// In-memory data store (initialized with data from data.ts)
let teachersData = [...teachers]
let subjectsData = [...subjects]
let lessonsData = [...lessons]

// Function to update the data.ts file
const updateDataFile = async () => {
  try {
    // In a real application, this would write to the data.ts file
    // For this demo, we'll simulate it and just log the data
    console.log("Updating data.ts file...")

    // Format the data as a TypeScript file content
    const dataFileContent = `
// Types for our data
export interface Teacher {
  id: number
  name: string
  image: string
  bio: string
  expertise: string[]
}

export interface Subject {
  id: number
  name: string
  image: string
  description: string
}

export interface Lesson {
  id: number
  teacher: string
  cover_image: string
  title: string
  description: string
  subject: string[]
  part: string[] // Telegram links
}

// Sample data
export const teachers: Teacher[] = ${JSON.stringify(teachersData, null, 2)}

export const subjects: Subject[] = ${JSON.stringify(subjectsData, null, 2)}

export const lessons: Lesson[] = ${JSON.stringify(lessonsData, null, 2)}
`

    // In a real application with server-side capabilities, you would write to the file:
    // fs.writeFileSync(path.join(process.cwd(), 'lib/data.ts'), dataFileContent)

    // For this demo, we'll just commit the changes to GitHub
    return await commitAndPushChanges(
      { teachers: teachersData, subjects: subjectsData, lessons: lessonsData },
      "Update content data",
    )
  } catch (error) {
    console.error("Error updating data file:", error)
    throw error
  }
}

// Teacher CRUD operations
export const getTeachers = () => {
  return teachersData
}

export const getTeacher = (id: number) => {
  return teachersData.find((teacher) => teacher.id === id)
}

export const createTeacher = async (teacher: Omit<Teacher, "id">) => {
  console.log({teachersData})
  const newId = teachersData.length > 0 ? Math.max(...teachersData.map((t) => t.id)) + 1 : 1
  const newTeacher = { ...teacher, id: newId }
  teachersData.push(newTeacher)
  await updateDataFile()
  return newTeacher
}

export const updateTeacher = async (id: number, teacher: Omit<Teacher, "id">) => {
  const index = teachersData.findIndex((t) => t.id === id)
  if (index === -1) return null

  const updatedTeacher = { ...teacher, id }
  teachersData[index] = updatedTeacher

  // Also update any lessons that reference this teacher
  lessonsData = lessonsData.map((lesson) => {
    if (lesson.teacher === teachersData[index].name && teacher.name !== teachersData[index].name) {
      return { ...lesson, teacher: teacher.name }
    }
    return lesson
  })

  await updateDataFile()
  return updatedTeacher
}

export const deleteTeacher = async (id: number) => {
  const teacher = teachersData.find((t) => t.id === id)
  if (!teacher) return false

  teachersData = teachersData.filter((t) => t.id !== id)

  // Check if any lessons reference this teacher
  const hasReferences = lessonsData.some((lesson) => lesson.teacher === teacher.name)
  if (hasReferences) {
    // In a real app, you might want to handle this differently
    console.warn(`Teacher ${teacher.name} has lessons. Consider reassigning them before deletion.`)
  }

  await updateDataFile()
  return true
}

// Subject CRUD operations
export const getSubjects = () => {
  return subjectsData
}

export const getSubject = (id: number) => {
  return subjectsData.find((subject) => subject.id === id)
}

export const createSubject = async (subject: Omit<Subject, "id">) => {
  const newId = subjectsData.length > 0 ? Math.max(...subjectsData.map((s) => s.id)) + 1 : 1
  const newSubject = { ...subject, id: newId }
  subjectsData.push(newSubject)
  await updateDataFile()
  return newSubject
}

export const updateSubject = async (id: number, subject: Omit<Subject, "id">) => {
  const index = subjectsData.findIndex((s) => s.id === id)
  if (index === -1) return null

  const oldName = subjectsData[index].name
  const updatedSubject = { ...subject, id }
  subjectsData[index] = updatedSubject

  // Update any lessons that reference this subject
  lessonsData = lessonsData.map((lesson) => {
    if (lesson.subject.includes(oldName)) {
      const updatedSubjects = lesson.subject.map((s) => (s === oldName ? subject.name : s))
      return { ...lesson, subject: updatedSubjects }
    }
    return lesson
  })

  await updateDataFile()
  return updatedSubject
}

export const deleteSubject = async (id: number) => {
  const subject = subjectsData.find((s) => s.id === id)
  if (!subject) return false

  subjectsData = subjectsData.filter((s) => s.id !== id)

  // Check if any lessons reference this subject
  const hasReferences = lessonsData.some((lesson) => lesson.subject.includes(subject.name))
  if (hasReferences) {
    // In a real app, you might want to handle this differently
    console.warn(`Subject ${subject.name} is used in lessons. Consider updating them before deletion.`)

    // Remove the subject from any lessons that reference it
    lessonsData = lessonsData.map((lesson) => {
      if (lesson.subject.includes(subject.name)) {
        return {
          ...lesson,
          subject: lesson.subject.filter((s) => s !== subject.name),
        }
      }
      return lesson
    })
  }

  await updateDataFile()
  return true
}

// Lesson CRUD operations
export const getLessons = () => {
  return lessonsData
}

export const getLesson = (id: number) => {
  return lessonsData.find((lesson) => lesson.id === id)
}

export const createLesson = async (lesson: Omit<Lesson, "id">) => {
  const newId = lessonsData.length > 0 ? Math.max(...lessonsData.map((l) => l.id)) + 1 : 1
  const newLesson = { ...lesson, id: newId }
  lessonsData.push(newLesson)
  await updateDataFile()
  return newLesson
}

export const updateLesson = async (id: number, lesson: Omit<Lesson, "id">) => {
  const index = lessonsData.findIndex((l) => l.id === id)
  if (index === -1) return null

  const updatedLesson = { ...lesson, id }
  lessonsData[index] = updatedLesson
  await updateDataFile()
  return updatedLesson
}

export const deleteLesson = async (id: number) => {
  lessonsData = lessonsData.filter((l) => l.id !== id)
  await updateDataFile()
  return true
}

// Get lessons by teacher
export const getLessonsByTeacher = (teacherName: string) => {
  return lessonsData.filter((lesson) => lesson.teacher === teacherName)
}

// Get lessons by subject
export const getLessonsBySubject = (subjectName: string) => {
  return lessonsData.filter((lesson) => lesson.subject.includes(subjectName))
}

// Save all changes to GitHub
export const saveAllChangesToGitHub = async () => {
  return await commitAndPushChanges(
    { teachers: teachersData, subjects: subjectsData, lessons: lessonsData },
    "Update all content data",
  )
}
