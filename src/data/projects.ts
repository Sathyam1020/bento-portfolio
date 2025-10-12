export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  gradient?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 'project-1',
    title: 'Spill-D-Muzic',
    description: 'A collaborative music streaming platform where users can create spaces, invite others to join, and contribute songs to a shared playlist. Designed a responsive, user-friendly interface with Next.js and Tailwind CSS, and used Prisma for efficient data management and secure access control.',
    image: '/images/spill-d-muzic.png',
    technologies: ['Next.js', 'Tailwind CSS', 'Prisma', 'React.js', 'Node.js', 'Express.js', 'postgreSQL'],
    githubUrl: 'https://github.com/Sathyam1020/spill-d-muzic',
    liveUrl: 'https://spill-d-muzic.vercel.app/',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'project-2',
    title: 'Paytm Clone',
    description: 'Developed a Paytm clone application using a monorepo setup with Turborepo. Implemented essential Paytm features, including user authentication, a wallet system, and payment functionality. Built with a modern, aesthetic interface using React and Tailwind CSS, ensuring a responsive, engaging user experience across devices.',
    image: '/images/paytm.png',
    technologies: ['Turborepo', 'React.js', 'Tailwind CSS', 'Authentication', 'Payment Systems','Node.js', 'Express.js', 'postgreSQL'],
    githubUrl: 'https://github.com/Sathyam1020/Paytm-final',
    liveUrl: 'https://github.com/Sathyam1020/Paytm-final',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'project-3',
    title: 'Pattern Play',
    description: 'Finding the right background pattern can be more annoying than writing the actual code. So I made Pattern Play, it\'s a free library of Tailwind patterns with live preview and one-click copy. No fluff, no extra CSS. Pick, preview, paste.',
    image: '/images/patternplay.png',
    technologies: ['React.js', 'Tailwind CSS', 'Nextjs', 'Vercel'],
    githubUrl: 'https://github.com/Sathyam1020/pattern-play',
    liveUrl: 'https://pattern-play-jmnz.vercel.app/',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'project-4',
    title: 'Studynotion',
    description: 'Built Studynotion, an online learning platform similar to Udemy, where users can browse and enroll in courses across various subjects. The app allows instructors to create and sell their courses, while students can track their learning progress and access course materials anytime. Focused on creating an easy-to-use, responsive platform with smooth course management for both learners and instructors.',
    image: '/images/studynotion.png',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Course Management', 'User Authentication', 'MongoDB', 'Node.js', 'Express.js' ],
    githubUrl: 'https://github.com/Sathyam1020/studynotion',
    liveUrl: 'https://github.com/Sathyam1020/studynotion',
    gradient: 'from-pink-500 to-violet-600'
  }
];