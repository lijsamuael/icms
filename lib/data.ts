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
export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Sheikh Abdullah",
    image: "/images/placeholder-teacher.png",
    bio: "Sheikh Abdullah is a renowned scholar with over 15 years of experience teaching Quran and Arabic. He has studied at Al-Azhar University and has authored several books on Quranic interpretation.",
    expertise: ["Quran Tafsir", "Arabic Language", "Islamic Studies"],
  },
  {
    id: 2,
    name: "Imam Muhammad",
    image: "/images/placeholder-teacher.png",
    bio: "Imam Muhammad specializes in Hadith studies and Islamic ethics. He has served as an imam in various mosques and has dedicated his life to spreading authentic knowledge of the Prophet's teachings.",
    expertise: ["Hadith Studies", "Islamic Ethics", "Seerah"],
  },
  {
    id: 3,
    name: "Dr. Aisha Ahmed",
    image: "/images/placeholder-teacher.png",
    bio: "Dr. Aisha Ahmed holds a PhD in Islamic Studies with a focus on jurisprudence. She has taught at several Islamic universities and is known for making complex fiqh concepts accessible to students.",
    expertise: ["Islamic Jurisprudence", "Islamic History", "Women in Islam"],
  },
  {
    id: 4,
    name: "Sheikh Ibrahim",
    image: "/images/placeholder-teacher.png",
    bio: "Sheikh Ibrahim is an expert in Islamic history and comparative religion. His engaging teaching style has made him popular among students seeking to understand Islam's historical context.",
    expertise: ["Islamic History", "Comparative Religion", "Islamic Civilization"],
  },
  {
    id: 5,
    name: "Ustadh Yusuf",
    image: "/images/placeholder-teacher.png",
    bio: "Ustadh Yusuf is a certified Arabic language instructor and Quran teacher. He has developed innovative methods for non-Arabic speakers to master Quranic Arabic.",
    expertise: ["Arabic Language", "Quran Recitation", "Tajweed"],
  },
]

export const subjects: Subject[] = [
  {
    id: 1,
    name: "Quran Tafsir",
    image: "/images/placeholder-subject.png",
    description:
      "Study the interpretation and explanation of the Holy Quran, understanding its meanings, context, and applications.",
  },
  {
    id: 2,
    name: "Hadith Studies",
    image: "/images/placeholder-subject.png",
    description:
      "Learn about the sayings, actions, and approvals of Prophet Muhammad (PBUH) and their authenticity and significance.",
  },
  {
    id: 3,
    name: "Islamic Jurisprudence",
    image: "/images/placeholder-subject.png",
    description:
      "Explore Islamic law and its applications in daily life, understanding the principles of fiqh and its various schools.",
  },
  {
    id: 4,
    name: "Islamic History",
    image: "/images/placeholder-subject.png",
    description: "Discover the rich history of Islamic civilization, from the time of the Prophet to the modern era.",
  },
  {
    id: 5,
    name: "Arabic Language",
    image: "/images/placeholder-subject.png",
    description: "Master the language of the Quran, including grammar, vocabulary, and conversation skills.",
  },
]

export const lessons: Lesson[] = [
  {
    id: 1,
    teacher: "Sheikh Abdullah",
    title: "Understanding Surah Al-Fatiha",
    description:
      "A comprehensive explanation of Surah Al-Fatiha, the opening chapter of the Quran, exploring its meanings and significance in daily prayers.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Quran Tafsir", "Arabic Language"],
    part: ["https://t.me/quran_tafsir_channel1", "https://t.me/quran_tafsir_channel2"],
  },
  {
    id: 2,
    teacher: "Imam Muhammad",
    title: "Authentic Hadiths on Prayer",
    description:
      "Collection and explanation of authentic hadiths related to prayer, covering its importance, methods, and spiritual dimensions.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Hadith Studies", "Islamic Ethics"],
    part: ["https://t.me/hadith_studies_channel1"],
  },
  {
    id: 3,
    teacher: "Dr. Aisha Ahmed",
    title: "Fundamentals of Islamic Jurisprudence",
    description:
      "Introduction to the principles of Islamic jurisprudence, covering the sources of Islamic law and methodologies of deriving rulings.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Islamic Jurisprudence"],
    part: ["https://t.me/fiqh_channel1", "https://t.me/fiqh_channel2"],
  },
  {
    id: 4,
    teacher: "Sheikh Ibrahim",
    title: "The Golden Age of Islamic Civilization",
    description:
      "Exploration of the contributions of Muslims to science, medicine, art, and architecture during the Islamic Golden Age.",
    cover_image: "/images/lesson4.png",
    subject: ["Islamic History"],
    part: ["https://t.me/islamic_history_channel1"],
  },
  {
    id: 5,
    teacher: "Ustadh Yusuf",
    title: "Mastering Quranic Arabic",
    description:
      "A structured course on Quranic Arabic, designed to help students understand the language of the Quran directly.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Arabic Language", "Quran Tafsir"],
    part: ["https://t.me/arabic_language_channel1", "https://t.me/arabic_language_channel2"],
  },
  {
    id: 6,
    teacher: "Sheikh Abdullah",
    title: "Tafsir of Juz Amma",
    description:
      "Detailed explanation of the 30th part of the Quran, which contains many short and frequently recited surahs.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Quran Tafsir"],
    part: ["https://t.me/quran_tafsir_channel3"],
  },
  {
    id: 7,
    teacher: "Imam Muhammad",
    title: "Ethics and Character in Islam",
    description:
      "Study of Islamic ethics and character development based on the Quran and Sunnah, with practical applications for modern life.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Islamic Ethics"],
    part: ["https://t.me/islamic_ethics_channel1"],
  },
  {
    id: 8,
    teacher: "Dr. Aisha Ahmed",
    title: "Women's Rights in Islam",
    description:
      "Comprehensive analysis of women's rights in Islam, addressing misconceptions and highlighting the elevated status of women in Islamic teachings.",
    cover_image: "/images/placeholder-lesson.png",
    subject: ["Islamic Jurisprudence", "Islamic History"],
    part: ["https://t.me/women_in_islam_channel1"],
  },
]
