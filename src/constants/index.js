import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  docker,
  chessArena,
  resq,
  FocusAi,
  carrier,
  Fulton,
  EduPoint,
  carnegie,
  Airbnb,
  liveit,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Backend & API Developer",
    icon: backend,
  },
  {
    title: "Machine Learning Developer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Engineering Intern",
    company_name: "Airbnb",
    icon: Airbnb,
    iconBg: "#383E56",
    date: "May 2025 - Present",
    points: [
      "Software Engineering Intern on the Observability team in the Infrastructure unit",
    ],
  },
  {
    title: "Software Engineering Intern",
    company_name: "Edupoint Educational Systems LLC",
    icon: EduPoint,
    iconBg: "#383E56",
    date: "Jan 2025 - April 2025",
    points: [
      "Attendance Tracking and Authorization Team",
    ],
  },
  {
    title: "Machine Learning Research Assistant",
    company_name: "Carnegie Mellon University",
    icon: carnegie,
    iconBg: "#E6DEDD",
    date: "Jun 2024 - Aug 2024",
    points: [
      "Research related to open source repositories containing Deep Learning Tensorflow / Pytorch models.",
    ],
  },
  {
    title: "Software Engineer Co-op",
    company_name: "Arizona State University",
    icon: Fulton,
    iconBg: "#383E56",
    date: "Mar 2023 - June 2024",
    points: [
      "CI / CD and monitoring using Spring Boot, JNA/ JNI, and Rest APIs.",]
  },
  {
    title: "Software Engineering Intern",
    company_name: "Carrier Air Conditioning India",
    icon: carrier,
    iconBg: "#E6DEDD",
    date: "May 2022 - August 2022",
    points: [
      "Guided and instructed students in MATLAB, SolidWorks, and JavaScript projects.",
    ],
  },
];

const projects = [
  {
    name: "FocusTime AI",
    description:
      "A full-stack, AI-driven web app developed with Python and JavaScript, using React, Flask, and PostgreSQL. The app integrates MediaPipe Holistic for extracting 471 key points(face, hand, body),and leverages TensorFlow for real-time gesture analysis to detect and address procrastination during study sessions.",
    tags: [
      {
        name: "MediaPipe ML",
        color: "blue-text-gradient",
      },
      {
        name: "TensorFlow",
        color: "green-text-gradient",
      },
      {
        name: "Flask",
        color: "pink-text-gradient",
      },
      {
        name: "Python",
        color: "orange-text-gradient",
      },
    ],
    image: FocusAi,
    source_code_link: "https://github.com/ekagra1602/FocusTime-AI",
  },
  {
    name: "Live-it",
    description:
    "Won at the UC Berkeley AI Hackathon 2025. Integrated Google Veo 3 API to generate cinematic videos from prompts, then trained it on VGGT neural network and Gaussian Splatting for AI-based camera inference and 3D scene construction, enabling real-time prompt-to-3D walkthroughs.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "VGGT",
        color: "green-text-gradient",
      },
      {
        name: "Gemini API",
        color: "pink-text-gradient",
      },
      {
        name: "Gaussian Splatting",
        color: "orange-text-gradient",
      },
    ],
    image: liveit,
    source_code_link: "https://github.com/ekagra1602/live-it",
  },
  {
    name: "ResQ",
    description:
      "Developed a disaster management app for efficient collaboration among rescue agencies, utilizing Python and Node.js for backend, Flutter for frontend, and Google Maps API for real-time location tracking.",
    tags: [
      {
        name: "Golang",
        color: "blue-text-gradient",
      },
      {
        name: "NodeJS",
        color: "green-text-gradient",
      },
      {
        name: "Flutter",
        color: "pink-text-gradient",
      },
      {
        name: "Google Maps API",
        color: "orange-text-gradient",
      },
    ],
    image: resq,
    source_code_link: "https://github.com/ekagra1602/ResQ",
  },
];

export { services, technologies, experiences, projects };
